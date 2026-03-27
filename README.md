# AGAPAI CRM — Chatwoot Clone con Kapso

Este proyecto es la base de un CRM móvil construido con Expo Router, diseñado para gestionar leads y automatizaciones usando la API de Kapso.

## Características

- **Chats**: Lista y detalles de conversaciones activas con usuarios.
- **Leads**: Gestión de contactos e información de clientes potenciales.
- **Agente**: Configuración del bot de inteligencia artificial, modelos de IA y estado del trigger.
- **Perfil**: Configuración de usuario.
- **Diseño Premium**: Tema oscuro/claro integrado basado en los colores de AGAPAI.

## Configuración y Variables de Entorno

Para que la integración con Kapso funcione correctamente en producción (Vercel) y en desarrollo, es necesario configurar las siguientes variables de entorno:

**Variables del Servidor (Vercel):**
- `KAPSO_API_KEY`: Tu clave de API de Kapso para autenticar las peticiones reales. **(Obligatorio)**
- `KAPSO_API_BASE_URL`: URL base de la API de Kapso (por defecto: `https://api.kapso.com`).

**Variables del Cliente (Expo/React Native):**
Puedes sobreescribir los IDs predeterminados usando estas variables:
- `EXPO_PUBLIC_KAPSO_API_URL`: URL del proxy o API (por defecto: `/api/kapso` en web).
- `EXPO_PUBLIC_KAPSO_WORKFLOW_ID`: ID del flujo de trabajo.
- `EXPO_PUBLIC_KAPSO_AGENT_NODE`: Nodo del agente.
- `EXPO_PUBLIC_KAPSO_PHONE_NUMBER_ID`: ID del número de teléfono.
- `EXPO_PUBLIC_KAPSO_WHATSAPP_CONFIG_ID`: ID de configuración de WhatsApp.
- `EXPO_PUBLIC_KAPSO_TRIGGER_ID`: ID del disparador.
- `EXPO_PUBLIC_KAPSO_MODEL_ID`: ID del modelo de IA.
- `EXPO_PUBLIC_KAPSO_PROJECT_ID`: ID del proyecto en Kapso.

Los IDs de proyecto, workflow y modelos están preconfigurados en `constants/KapsoConfig.ts` basados en los requisitos iniciales.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Para iniciar la aplicación, ejecuta uno de los siguientes comandos:

```bash
npm run android
npm run ios # requiere macOS
npm run web
```
