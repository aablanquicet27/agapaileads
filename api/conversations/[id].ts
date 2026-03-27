import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido. Use GET.' });
  }

  const { id } = req.query;
  const KAPSO_API_BASE_URL = process.env.KAPSO_API_BASE_URL || 'https://api.kapso.ai';
  const KAPSO_API_KEY = process.env.KAPSO_API_KEY;
  const projectId = '80697017-91d1-41c5-a37f-d502dd9f6d84';

  if (!KAPSO_API_KEY) {
    return res.status(500).json({ error: 'Falta la configuración de KAPSO_API_KEY en el servidor.' });
  }

  const url = `${KAPSO_API_BASE_URL}/platform/v1/projects/${projectId}/conversations/${id}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': KAPSO_API_KEY,
      },
    });

    const data = await response.text();
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      jsonData = data;
    }

    res.status(response.status).send(jsonData);
  } catch (error) {
    console.error(`Error al contactar la API de Kapso para la conversación ${id}:`, error);
    res.status(500).json({ error: 'Error interno del servidor al contactar la API de Kapso.' });
  }
}
