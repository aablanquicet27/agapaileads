# AGAPAI CRM — Chatwoot Clone con Kapso

Este proyecto es la base de un CRM móvil construido con Expo Router, diseñado para gestionar leads y automatizaciones usando la API de Kapso.

## Características

- **Chats**: Lista y detalles de conversaciones activas con usuarios.
- **Leads**: Gestión de contactos e información de clientes potenciales.
- **Agente**: Configuración del bot de inteligencia artificial, modelos de IA y estado del trigger.
- **Perfil**: Configuración de usuario.
- **Diseño Premium**: Tema oscuro/claro integrado basado en los colores de AGAPAI.

## Configuración y Variables de Entorno

Puedes configurar las siguientes variables de entorno (por defecto se usa la API de Kapso, configurable en `constants/KapsoConfig.ts`):

- `EXPO_PUBLIC_KAPSO_API_URL`: URL base de la API de Kapso (por defecto: `https://api.kapso.com/v1`).

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
