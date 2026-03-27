import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se acepta POST para webhooks.' });
  }

  const payload = req.body || {};
  console.log('Webhook de Kapso recibido:', JSON.stringify(payload, null, 2));

  const senderName = payload.sender?.name || 'Nuevo Mensaje';
  const textBody = payload.message?.text || payload.text || 'Tienes un nuevo mensaje de Kapso.';

  const notifyBody = {
    title: "Kapso: " + senderName,
    body: textBody,
    data: { kapsoPayload: payload }
  };

  const proto = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host || 'localhost:3000';
  const notifyUrl = proto + '://' + host + '/api/push/notify';

  try {
    const notifyRes = await fetch(notifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notifyBody),
    });

    const notifyResult = await notifyRes.json();
    console.log('Respuesta de notify API:', notifyResult);

    return res.status(200).json({ success: true, message: 'Webhook procesado y notificación push disparada.' });
  } catch (error) {
    console.error('Error al llamar al endpoint de notify:', error);
    return res.status(500).json({ error: 'El webhook fue recibido, pero falló el envío de push notification.' });
  }
}
