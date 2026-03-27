import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs/promises';
import path from 'path';

// Para MVP: Guardaremos los tokens en /tmp que se preserva por ambiente de ejecución
const TOKENS_FILE = '/tmp/expo-tokens.json';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Falta el token' });
  }

  try {
    let tokens: string[] = [];
    try {
      const data = await fs.readFile(TOKENS_FILE, 'utf-8');
      tokens = JSON.parse(data);
    } catch (e) {
      // Archivo no existe o es inválido
    }

    if (!tokens.includes(token)) {
      tokens.push(token);
      await fs.writeFile(TOKENS_FILE, JSON.stringify(tokens));
      console.log('Nuevo token registrado:', token);
    } else {
      console.log('El token ya estaba registrado:', token);
    }

    return res.status(200).json({ success: true, message: 'Token registrado correctamente.' });
  } catch (error) {
    console.error('Error registrando token:', error);
    return res.status(500).json({ error: 'Error interno al registrar el token.' });
  }
}
