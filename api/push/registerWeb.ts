import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';

// MVP: Guardamos la suscripción en /tmp, que dura el tiempo de ejecución de la función
const SUBSCRIPTIONS_FILE = '/tmp/web-subscriptions.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  const { subscription } = req.body;

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: 'Falta la suscripción o su endpoint.' });
  }

  try {
    let subscriptions: any[] = [];
    try {
      const data = await fs.readFile(SUBSCRIPTIONS_FILE, 'utf-8');
      subscriptions = JSON.parse(data);
    } catch (e) {
      // Si el archivo no existe, comenzamos con un arreglo vacío
    }

    const exists = subscriptions.find(sub => sub.endpoint === subscription.endpoint);

    if (!exists) {
      subscriptions.push(subscription);
      await fs.writeFile(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions));
      console.log('Nueva suscripción web guardada exitosamente.');
    } else {
      console.log('La suscripción ya estaba registrada anteriormente.');
    }

    return res.status(200).json({ success: true, message: 'Suscripción Web Push registrada con éxito.' });
  } catch (error) {
    console.error('Error al guardar la suscripción web:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno al registrar la suscripción.' });
  }
}
