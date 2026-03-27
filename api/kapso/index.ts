import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Use POST.' });
  }

  const { path, method, body, headers } = req.body || {};

  if (!path) {
    return res.status(400).json({ error: 'El parámetro "path" es requerido.' });
  }

  const KAPSO_API_BASE_URL = process.env.KAPSO_API_BASE_URL || 'https://api.kapso.ai';
  const KAPSO_API_KEY = process.env.KAPSO_API_KEY;

  if (!KAPSO_API_KEY) {
    return res.status(500).json({ error: 'Falta la configuración de KAPSO_API_KEY en el servidor.' });
  }

  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  const url = `${KAPSO_API_BASE_URL}/${cleanPath}`;

  try {
    const fetchOptions: RequestInit = {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': KAPSO_API_KEY,
        ...(headers || {})
      },
    };

    if (body && method !== 'GET' && method !== 'HEAD') {
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);

    const data = await response.text();
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      jsonData = data;
    }

    res.status(response.status).send(jsonData);
  } catch (error) {
    console.error('Error al contactar la API de Kapso:', error);
    res.status(500).json({ error: 'Error interno del servidor al contactar la API de Kapso.' });
  }
}
