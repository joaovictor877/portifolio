import { list, put } from '@vercel/blob';

const PROJECTS_KEY = 'data/projects.json';

async function readProjects() {
  try {
    const { blobs } = await list({ prefix: 'data/' });
    const file = blobs.find(b => b.pathname === PROJECTS_KEY);
    if (!file) {
      // Arquivo não existe, retorna vazio
      return { projects: [] };
    }
    // Forçar leitura sem cache do JSON no Blob
    const resp = await fetch(`${file.url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!resp.ok) return { projects: [] };
    const json = await resp.json();
    return json;
  } catch (err) {
    console.warn('readProjects error, returning empty:', err);
    return { projects: [] };
  }
}

async function writeProjects(data) {
  await put(PROJECTS_KEY, JSON.stringify(data, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false
  });
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await readProjects();
      // Evitar cache em CDN/navegador
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('CDN-Cache-Control', 'no-store');
      res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
      res.status(200).json(data);
      return;
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const { action, project } = body;
      let data = await readProjects();
      data.projects = data.projects || [];

      if (action === 'create') {
        const id = String(Date.now());
        const newProject = { id, ...project };
        data.projects.unshift(newProject);
        await writeProjects(data);
        res.status(200).json({ ok: true, id });
        return;
      }

      if (action === 'update') {
        const { id } = project || {};
        if (!id) return res.status(400).json({ error: 'Missing id' });
        data.projects = data.projects.map(p => (p.id === id ? { ...p, ...project } : p));
        await writeProjects(data);
        res.status(200).json({ ok: true });
        return;
      }

      if (action === 'delete') {
        const { id } = body;
        if (!id) return res.status(400).json({ error: 'Missing id' });
        data.projects = data.projects.filter(p => p.id !== id);
        await writeProjects(data);
        res.status(200).json({ ok: true });
        return;
      }

      res.status(400).json({ error: 'Invalid action' });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('projects API error:', err);
    res.status(500).json({ error: 'Server error', details: String(err) });
  }
}
