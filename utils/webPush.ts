const PUBLIC_VAPID_KEY = process.env.EXPO_PUBLIC_VAPID_PUBLIC_KEY || '';

export async function registerServiceWorker() {
  if (process.env.EXPO_OS === 'web' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrado con éxito:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Error al registrar Service Worker:', error);
    }
  }
  return null;
}

export async function subscribeToWebPush() {
  if (process.env.EXPO_OS !== 'web' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    throw new Error('Push no está soportado en este entorno.');
  }

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    if (!PUBLIC_VAPID_KEY) {
      throw new Error('Falta EXPO_PUBLIC_VAPID_PUBLIC_KEY en las variables de entorno.');
    }

    const convertedVapidKey = urlBase64ToUint8Array(PUBLIC_VAPID_KEY);
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });
  }

  // POST subscription to backend
  await fetch('/api/push/registerWeb', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription }),
  });

  return subscription;
}

export async function checkWebPushStatus() {
  if (process.env.EXPO_OS !== 'web' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return 'unsupported';
  }
  
  if (Notification.permission === 'denied') {
    return 'denied';
  }

  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return 'unregistered';

  const subscription = await registration.pushManager.getSubscription();
  return subscription ? 'subscribed' : 'unsubscribed';
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
