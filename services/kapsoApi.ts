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

// Fallback/Mock data
const mockExecutions: Execution[] = [
  { id: 'exec_1', status: 'active', contact: { id: 'c_1', name: 'María Gómez', phone: '+34600112233' }, createdAt: new Date().toISOString() },
  { id: 'exec_2', status: 'completed', contact: { id: 'c_2', name: 'Carlos López', phone: '+34600445566' }, createdAt: new Date(Date.now() - 86400000).toISOString() },
];

const mockEvents: ExecutionEvent[] = [
  { id: 'ev_1', type: 'message', content: '¡Hola! ¿Me pueden ayudar con una reserva?', timestamp: new Date(Date.now() - 3600000).toISOString(), sender: 'user' },
  { id: 'ev_2', type: 'message', content: '¡Claro, María! Con mucho gusto. ¿Para qué fecha?', timestamp: new Date(Date.now() - 3500000).toISOString(), sender: 'agent' },
];

export const KapsoApi = {
  async listExecutions(): Promise<Execution[]> {
    console.log('Fetching executions with projectId:', KapsoConfig.projectId);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockExecutions;
  },

  async getExecution(id: string): Promise<Execution | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockExecutions.find(e => e.id === id);
  },

  async listExecutionEvents(executionId: string): Promise<ExecutionEvent[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents;
  },

  async updateExecutionStatus(id: string, status: string): Promise<boolean> {
    console.log(`Updated execution ${id} to status ${status}`);
    return true;
  },

  async getGraph(): Promise<GraphData> {
    return { nodes: [], edges: [] };
  },

  async updateGraph(data: GraphData): Promise<boolean> {
    console.log('Updated graph', data);
    return true;
  },

  async listProviderModels(): Promise<ProviderModel[]> {
    return [
      { id: KapsoConfig.modelId, name: 'GPT-4', provider: 'OpenAI' },
      { id: 'm_2', name: 'Claude 3 Opus', provider: 'Anthropic' }
    ];
  },

  async updateTrigger(id: string, data: any): Promise<boolean> {
    console.log(`Updated trigger ${id}`, data);
    return true;
  },

  async listPhoneNumbers(): Promise<PhoneNumber[]> {
    return [
      { id: KapsoConfig.phoneNumberId, number: '+1234567890', verified: true }
    ];
  }
};
