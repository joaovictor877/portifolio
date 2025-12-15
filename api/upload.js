import { put } from '@vercel/blob';

const LOG = process.env.LOG_API !== '0';
function log(...args) { if (LOG) console.log('[upload]', ...args); }
function logError(...args) { if (LOG) console.error('[upload][error]', ...args); }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, type, data } = req.body || {};
    if (!name || !type || !data) {
      res.status(400).json({ error: 'Missing name, type or data' });
      return;
    }

    const buffer = Buffer.from(data, 'base64');
    const key = `projects/${Date.now()}_${name}`;

    const blob = await put(key, buffer, {
      access: 'public',
      contentType: type,
      cacheControlMaxAge: 0
    });
    log('upload OK', { key, size: buffer.length, type });
    res.status(200).json({ url: blob.url, pathname: blob.pathname });
  } catch (err) {
    logError('Upload error:', err);
    res.status(500).json({ error: 'Upload failed', details: String(err) });
  }
}
