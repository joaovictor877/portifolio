import { list, put, head } from '@vercel/blob';

const PROJECTS_KEY = 'data/projects.json';
const LOG = process.env.LOG_API !== '0';

function log(...args) {
  if (LOG) console.log('[projects]', ...args);
}
function logError(...args) {
  if (LOG) console.error('[projects][error]', ...args);
}

async function readProjects() {
  try {
    const start = Date.now();
    // Primeiro tenta um head() direto na chave para evitar inconsistência do list()
    let meta;
    try {
      meta = await head(PROJECTS_KEY);
    } catch {}

    if (!meta) {
      const { blobs } = await list({ prefix: 'data/' });
      const file = blobs.find(b => b.pathname === PROJECTS_KEY);
      if (!file) {
        log('readProjects: arquivo inexistente, retornando lista vazia');
        return { projects: [] };
      }
      meta = file;
    }

    // Forçar leitura sem cache do JSON no Blob
    const resp = await fetch(`${meta.url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!resp.ok) return { projects: [] };
    const json = await resp.json();
    log('readProjects OK', { count: (json.projects || []).length, ms: Date.now() - start });
    return json;
  } catch (err) {
    logError('readProjects error, returning empty:', err);
    return { projects: [] };
  }
}

async function writeProjects(data) {
  await put(PROJECTS_KEY, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    cacheControlMaxAge: 0
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const start = Date.now();
      const data = await readProjects();
      // Evitar cache em CDN/navegador
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('CDN-Cache-Control', 'no-store');
      res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
      log('GET /api/projects', { count: (data.projects || []).length, ms: Date.now() - start });
      res.status(200).json(data);
      return;
    }

    if (req.method === 'POST') {
      let body = req.body || {};
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch {}
      }
      const { action, project } = body;
      let data = await readProjects();
      data.projects = data.projects || [];

      if (action === 'create') {
        const id = String(Date.now());
        const newProject = { id, ...project };
        data.projects.unshift(newProject);
        await writeProjects(data);
        log('POST create', { id, count: data.projects.length });
        res.status(200).json({ ok: true, id, projects: data.projects });
        return;
      }

      if (action === 'update') {
        const { id } = project || {};
        if (!id) return res.status(400).json({ error: 'Missing id' });
        data.projects = data.projects.map(p => (p.id === id ? { ...p, ...project } : p));
        await writeProjects(data);
        log('POST update', { id, count: data.projects.length });
        res.status(200).json({ ok: true, projects: data.projects });
        return;
      }

      if (action === 'delete') {
        const { id } = body;
        if (!id) return res.status(400).json({ error: 'Missing id' });
        data.projects = data.projects.filter(p => p.id !== id);
        await writeProjects(data);
        log('POST delete', { id, count: data.projects.length });
        res.status(200).json({ ok: true, projects: data.projects });
        return;
      }

      res.status(400).json({ error: 'Invalid action' });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    logError('projects API error:', err);
    res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
