import { useState, useCallback } from 'react';
import { kapsoFetch } from '@/lib/kapso';

type Message = {
  id: string;
  text: string;
  from: 'user' | 'agent';
  timestamp: string;
};

export function useChat(conversationId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(
    async (text: string, phone: string) => {
      setLoading(true);
      try {
        const userMsg: Message = {
          id: Date.now().toString(),
          text,
          from: 'user',
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMsg]);

        await kapsoFetch('/v1/messages', {
          method: 'POST',
          body: {
            to: phone,
            type: 'text',
            text: { body: text },
          },
        });
      } catch (error) {
        console.error('Send message failed:', error);
      } finally {
        setLoading(false);
      }
    },
    [conversationId]
  );

  return { messages, loading, sendMessage };
}
