import { create } from 'zustand';
import type { Lead, LeadStage } from './types';

interface LeadStore {
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateStage: (id: string, stage: LeadStage) => void;
  removeLead: (id: string) => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  addLead: (lead) =>
    set((state) => ({
      leads: [
        ...state.leads,
        {
          ...lead,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateStage: (id, stage) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, stage } : l)),
    })),
  removeLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((l) => l.id !== id),
    })),
}));
