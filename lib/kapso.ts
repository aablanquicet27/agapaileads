const KAPSO_BASE_URL = process.env.EXPO_PUBLIC_KAPSO_API_URL || 'https://api.kapso.ai';
const KAPSO_API_KEY = process.env.EXPO_PUBLIC_KAPSO_API_KEY || '';

type KapsoRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
};

export async function kapsoFetch<T = unknown>(
  path: string,
  options: KapsoRequestOptions = {}
): Promise<T> {
  const { method = 'GET', body } = options;

  const res = await fetch(`${KAPSO_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${KAPSO_API_KEY}`,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    throw new Error(`Kapso API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// WhatsApp messaging
export async function sendWhatsAppMessage(phone: string, message: string) {
  return kapsoFetch('/v1/messages', {
    method: 'POST',
    body: {
      to: phone,
      type: 'text',
      text: { body: message },
    },
  });
}

// List conversations
export async function listConversations() {
  return kapsoFetch('/v1/conversations');
}

// List workflows
export async function listWorkflows() {
  return kapsoFetch('/v1/workflows');
}
