import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import webPush from 'web-push';

const TOKENS_FILE = '/tmp/expo-tokens.json';
const WEB_SUBSCRIPTIONS_FILE = '/tmp/web-subscriptions.json';

// Configurar Web Push
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || process.env.EXPO_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@agapai.com';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(
    VAPID_SUBJECT,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );
} else {
  console.warn('Faltan claves VAPID para Web Push en las variables de entorno.');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { title, body, data } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Faltan parámetros title o body' });
  }

  try {
    // 1. Notificaciones Expo
    let tokens: string[] = [];
    try {
      const fileData = await fs.readFile(TOKENS_FILE, 'utf-8');
      tokens = JSON.parse(fileData);
    } catch (e) {
      console.log('No hay tokens Expo registrados todavía o el archivo se borró (MVP /tmp behavior).');
    }

    let expoData = null;
    let expoSent = false;

    if (tokens.length > 0) {
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

      if (messages.length > 0) {
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

        expoData = await expoResponse.json();
        expoSent = true;
      }
    }

    // 2. Notificaciones Web Push
    let webSubscriptions: any[] = [];
    try {
      const webData = await fs.readFile(WEB_SUBSCRIPTIONS_FILE, 'utf-8');
      webSubscriptions = JSON.parse(webData);
    } catch (e) {
      console.log('No hay suscripciones web registradas.');
    }

    let webSentCount = 0;
    if (webSubscriptions.length > 0 && VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
      const payload = JSON.stringify({ title, body, data });
      
      const pushPromises = webSubscriptions.map(sub => 
        webPush.sendNotification(sub, payload).catch(err => {
          console.error('Fallo enviando Web Push a un cliente:', err);
        })
      );

      await Promise.all(pushPromises);
      webSentCount = webSubscriptions.length;
    }

    if (tokens.length === 0 && webSubscriptions.length === 0) {
      return res.status(200).json({ success: true, message: 'No hay tokens registrados a los que notificar.' });
    }

    return res.status(200).json({ success: true, expoResponse: expoData, expoSent, webSentCount, message: 'Notificación enviada con éxito.' });

  } catch (error) {
    console.error('Error al notificar tokens:', error);
    return res.status(500).json({ error: 'Error interno del servidor al enviar notificaciones push.' });
  }
}
