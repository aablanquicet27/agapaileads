const KAPSO_BASE_URL = process.env.EXPO_PUBLIC_KAPSO_API_URL || 'https://api.kapso.ai';
const KAPSO_API_KEY = process.env.EXPO_PUBLIC_KAPSO_API_KEY || '';

type KapsoRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
};

async function kapsoFetch<T>(path: string, options: KapsoRequestOptions = {}): Promise<T> {
  const { method = 'GET', body } = options;

  const res = await fetch(`${KAPSO_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${KAPSO_API_KEY}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    throw new Error(`Kapso API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export const kapso = {
  sendMessage: (phoneNumber: string, message: string) =>
    kapsoFetch('/messages/send', {
      method: 'POST',
      body: { phone_number: phoneNumber, message },
    }),

  getConversations: () => kapsoFetch('/conversations'),

  getConversation: (id: string) => kapsoFetch(`/conversations/${id}`),
};
