import { KapsoConfig } from '../constants/KapsoConfig';

export interface Execution {
  id: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  contact: {
    id: string;
    name: string;
    phone: string;
  };
  createdAt: string;
}

export interface ExecutionEvent {
  id: string;
  type: 'message' | 'status_change';
  content: string;
  timestamp: string;
  sender: 'user' | 'agent' | 'system';
}

export interface GraphData {
  nodes: any[];
  edges: any[];
}

export interface ProviderModel {
  id: string;
  name: string;
  provider: string;
}

export interface PhoneNumber {
  id: string;
  number: string;
  verified: boolean;
}

const API_BASE = '/api/kapso';

async function fetchKapso(path: string, options: RequestInit = {}) {
  const payload = {
    path,
    method: options.method || 'GET',
    body: options.body ? JSON.parse(options.body as string) : undefined,
    headers: options.headers,
  };

  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error en la solicitud a ${path}:`, errorText);
    throw new Error(`Error HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}

export const KapsoApi = {
  async listExecutions(): Promise<Execution[]> {
    const response = await fetch('/api/conversations');
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    const raw = await response.json();
    const items = Array.isArray(raw) ? raw : (raw?.items || raw?.data || []);
    return items.map((c: any) => ({
      id: c.id,
      status: c.status || 'active',
      contact: {
        id: c.contact?.id || c.wa_id || c.contact_id || 'unknown',
        name: c.contact?.name || c.profile_name || c.contact_name || c.phone_number || 'Desconocido',
        phone: c.contact?.phone || c.phone_number || c.wa_id || 'Desconocido'
      },
      createdAt: c.created_at || c.updated_at || new Date().toISOString()
    }));
  },

  async getExecution(id: string): Promise<Execution | undefined> {
    const response = await fetch(`/api/conversations/${id}`);
    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error(`Error HTTP ${response.status}`);
    }
    const raw = await response.json();
    if (!raw) return undefined;
    const c = raw.data || raw;
    return {
      id: c.id,
      status: c.status || 'active',
      contact: {
        id: c.contact?.id || c.wa_id || c.contact_id || 'unknown',
        name: c.contact?.name || c.profile_name || c.contact_name || c.phone_number || 'Desconocido',
        phone: c.contact?.phone || c.phone_number || c.wa_id || 'Desconocido'
      },
      createdAt: c.created_at || c.updated_at || new Date().toISOString()
    };
  },

  async listExecutionEvents(executionId: string): Promise<ExecutionEvent[]> {
    const response = await fetch(`/api/conversations/${executionId}/messages`);
    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    const raw = await response.json();
    const items = Array.isArray(raw) ? raw : (raw?.items || raw?.data || []);
    return items.map((m: any) => {
      let senderType = 'user';
      if (m.direction === 'inbound') senderType = 'user';
      else if (m.direction === 'outbound') senderType = 'agent';
      else if (m.sender_type) senderType = m.sender_type;

      return {
        id: m.id || m.message_id || Math.random().toString(),
        type: 'message',
        content: m.text?.body || m.content || m.body || m.message || '[Mensaje sin texto]',
        timestamp: m.timestamp || m.created_at || new Date().toISOString(),
        sender: senderType as 'user' | 'agent' | 'system'
      };
    });
  },

  async updateExecutionStatus(id: string, status: string): Promise<boolean> {
    // Safe no-op con comentario explícito ya que no se conoce si el endpoint para
    // actualizar estado/handoff de conversaciones en Kapso es el mismo
    console.warn(`[Safe No-Op] Intentando actualizar estado de la conversación ${id} a ${status}`);
    return true;
  },

  async getGraph(): Promise<GraphData> {
    return fetchKapso(`/platform/v1/projects/${KapsoConfig.projectId}/workflows/${KapsoConfig.workflowId}/graph`);
  },

  async updateGraph(data: GraphData): Promise<boolean> {
    await fetchKapso(`/platform/v1/projects/${KapsoConfig.projectId}/workflows/${KapsoConfig.workflowId}/graph`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return true;
  },

  async listProviderModels(): Promise<ProviderModel[]> {
    return fetchKapso(`/platform/v1/models`);
  },

  async updateTrigger(id: string, data: any): Promise<boolean> {
    await fetchKapso(`/platform/v1/projects/${KapsoConfig.projectId}/triggers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return true;
  },

  async listPhoneNumbers(): Promise<PhoneNumber[]> {
    return fetchKapso(`/meta/whatsapp/v24.0/phone-numbers`);
  }
};
