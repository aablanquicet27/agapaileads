# AGAPAI Leads

CRM móvil tipo Kommo, construido con Expo Router (universal: iOS, Android, Web).

## Stack

- **Frontend:** Expo Router (React Native)
- **Backend API:** Vercel Edge Functions
- **WhatsApp:** Kapso API
- **DB:** Supabase (opcional)

## Setup

```bash
npm install
npx expo start
```

Escanea el QR con Expo Go para probar en móvil.

## Estructura

```
app/
├── _layout.tsx          # Root layout
├── (tabs)/
│   ├── _layout.tsx      # Tab navigator (Chats, Leads, +, Ayuda, Más)
│   ├── index.tsx        # Pipeline / Kanban de leads
│   ├── chats.tsx        # Conversaciones WhatsApp
│   ├── help.tsx         # Ayuda
│   └── more.tsx         # Configuración
├── lead/
│   └── [id].tsx         # Detalle de lead
lib/
├── kapso.ts             # Cliente API Kapso
├── types.ts             # Tipos del CRM
└── store.ts             # Estado global (Zustand)
```

## Deploy

- **Web:** Push a main → Vercel detecta → deploy automático
- **Móvil:** `npx eas build` para builds nativos
- **Dev:** `npx expo start` + Expo Go
