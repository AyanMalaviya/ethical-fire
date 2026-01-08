import { useState, useEffect } from 'react';

interface NotificationSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<NotificationSubscription | null>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      setSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  async function requestPermission() {
    if (!supported) {
      return { success: false, error: 'Notifications not supported' };
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        await subscribeToPush();
        return { success: true };
      } else {
        return { success: false, error: 'Permission denied' };
      }
    } catch (error: any) {
      console.error('Error requesting permission:', error);
      return { success: false, error: error.message };
    }
  }

  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      
      const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error('VAPID public key not found');
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      const subscriptionJson = subscription.toJSON();
      
      if (subscriptionJson.endpoint && subscriptionJson.keys) {
        const notificationSub: NotificationSubscription = {
          endpoint: subscriptionJson.endpoint,
          keys: {
            p256dh: subscriptionJson.keys.p256dh,
            auth: subscriptionJson.keys.auth,
          },
        };

        setSubscription(notificationSub);

        // TODO: Save subscription to DynamoDB for the user
        console.log('Push subscription:', notificationSub);

        return { success: true, subscription: notificationSub };
      }

      throw new Error('Invalid subscription data');
    } catch (error: any) {
      console.error('Error subscribing to push:', error);
      return { success: false, error: error.message };
    }
  }

  async function unsubscribe() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        setSubscription(null);
        // TODO: Remove subscription from DynamoDB
        return { success: true };
      }

      return { success: false, error: 'No active subscription' };
    } catch (error: any) {
      console.error('Error unsubscribing:', error);
      return { success: false, error: error.message };
    }
  }

  async function sendTestNotification() {
    if (permission !== 'granted') {
      return { success: false, error: 'Permission not granted' };
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      await registration.showNotification('EthicalFire Test', {
        body: 'Notifications are working! 🎮',
        icon: '/EF.jpg',
        badge: '/pwa-192x192.png',
        tag: 'test-notification',
        requireInteraction: false,
      } as NotificationOptions);

      return { success: true };
    } catch (error: any) {
      console.error('Error sending test notification:', error);
      return { success: false, error: error.message };
    }
  }


  return {
    permission,
    subscription,
    supported,
    requestPermission,
    unsubscribe,
    sendTestNotification,
  };
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
