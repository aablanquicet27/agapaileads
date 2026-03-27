import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';

const TOKENS_FILE = '/tmp/expo-tokens.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { title, body, data } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Faltan parámetros title o body' });
  }

  try {
    let tokens: string[] = [];
    try {
      const fileData = await fs.readFile(TOKENS_FILE, 'utf-8');
      tokens = JSON.parse(fileData);
    } catch (e) {
      console.log('No hay tokens registrados todavía o el archivo se borró (MVP /tmp behavior).');
    }

    if (tokens.length === 0) {
      return res.status(200).json({ success: true, message: 'No hay tokens registrados a los que notificar.' });
    }

    const messages = [];
    for (const pushToken of tokens) {
      // Validar si el token parece válido de Expo
      if (!String(pushToken).includes('ExponentPushToken') && !String(pushToken).includes('ExpoPushToken')) {
        console.warn(`El token ${pushToken} no parece ser válido para Expo.`);
        continue;
      }
      messages.push({
        to: pushToken,
        sound: 'default',
        title,
        body,
        data: data || {},
      });
    }

    // Llamar a la API de Expo
    const expoResponse = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    const expoData = await expoResponse.json();
    return res.status(200).json({ success: true, expoResponse: expoData, message: 'Notificación enviada con éxito.' });

  } catch (error) {
    console.error('Error al notificar tokens:', error);
    return res.status(500).json({ error: 'Error interno del servidor al enviar notificaciones push.' });
  }
}
