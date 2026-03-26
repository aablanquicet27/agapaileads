import { create } from 'zustand';

export type LeadStage =
  | 'contacto_inicial'
  | 'negociacion'
  | 'propuesta'
  | 'cierre_ganado'
  | 'cierre_perdido';

export const PIPELINE_STAGES: { id: LeadStage; label: string; color: string }[] = [
  { id: 'contacto_inicial', label: 'Contacto Inicial', color: '#0077B6' },
  { id: 'negociacion', label: 'Negociación', color: '#F4A300' },
  { id: 'propuesta', label: 'Propuesta', color: '#8B5CF6' },
  { id: 'cierre_ganado', label: 'Cierre Ganado', color: '#22C55E' },
  { id: 'cierre_perdido', label: 'Cierre Perdido', color: '#EF4444' },
];

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  stage: LeadStage;
  value: number;
  date: string;
};

type LeadStore = {
  leads: Lead[];
  currentStage: LeadStage;
  setCurrentStage: (stage: LeadStage) => void;
  addLead: (lead: Omit<Lead, 'id'>) => void;
  moveLead: (id: string, stage: LeadStage) => void;
  deleteLead: (id: string) => void;
};

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  currentStage: 'contacto_inicial',
  setCurrentStage: (stage) => set({ currentStage: stage }),
  addLead: (lead) =>
    set((state) => ({
      leads: [...state.leads, { ...lead, id: Date.now().toString() }],
    })),
  moveLead: (id, stage) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, stage } : l)),
    })),
  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((l) => l.id !== id),
    })),
}));
