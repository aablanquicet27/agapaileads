export type LeadStage =
  | 'Contacto Inicial'
  | 'Calificado'
  | 'Propuesta'
  | 'Negociación'
  | 'Cerrado';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  stage: LeadStage;
  value: number;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  leadId: string;
  text: string;
  from: 'user' | 'lead';
  timestamp: string;
}
