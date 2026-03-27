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
  const url = `${API_BASE}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Error en la solicitud a ${url}:`, errorText);
    throw new Error(`Error HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}

export const KapsoApi = {
  async listExecutions(): Promise<Execution[]> {
    return fetchKapso(`/platform/v1/projects/${KapsoConfig.projectId}/executions`);
  },

  async getExecution(id: string): Promise<Execution | undefined> {
    return fetchKapso(`/platform/v1/projects/${KapsoConfig.projectId}/executions/${id}`);
  },

  async listExecutionEvents(executionId: string): Promise<ExecutionEvent[]> {
    return fetchKapso(`/platform/v1/projects/${KapsoConfig.projectId}/executions/${executionId}/events`);
  },

  async updateExecutionStatus(id: string, status: string): Promise<boolean> {
    await fetchKapso(`/platform/v1/projects/${KapsoConfig.projectId}/executions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
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
