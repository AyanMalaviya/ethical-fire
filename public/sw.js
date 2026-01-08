/* eslint-disable no-undef */
self.addEventListener('push', (event) => {
  let data = { title: 'EthicalFire', body: 'New notification' };
  
  try {
    data = event.data.json();
  } catch (e) {
    console.error('Error parsing push data:', e);
  }
  
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/EF.jpg',
    badge: '/pwa-192x192.png',
    tag: data.tag || 'default',
    requireInteraction: true,
    data: {
      url: data.url || '/',
    },
    actions: data.actions || [],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'EthicalFire', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle push subscription changes
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Push subscription changed');
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: self.applicationServerKey
    })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  let data = { 
    title: 'EthicalFire', 
    body: 'New notification',
    type: 'general'
  };
  
  try {
    data = event.data.json();
  } catch (e) {
    console.error('Error parsing push data:', e);
  }
  
  let options = {
    icon: '/EF.jpg',
    badge: '/pwa-192x192.png',
    tag: data.tag || 'default',
    requireInteraction: false,
    data: {
      url: data.url || '/',
      type: data.type || 'general',
    },
  };

  // Customize notification based on type
  if (data.type === 'chat') {
    // Chat notification (like WhatsApp)
    options = {
      ...options,
      body: data.message || data.body,
      icon: '/EF.jpg',
      badge: '/pwa-192x192.png',
      tag: 'chat-' + (data.roomId || 'global'),
      requireInteraction: true,
      data: {
        url: '/chat',
        type: 'chat',
        senderId: data.senderId,
        senderName: data.senderName,
      },
      actions: [
        {
          action: 'reply',
          title: 'Reply',
        },
        {
          action: 'view',
          title: 'View Chat',
        },
      ],
    };
  } else if (data.type === 'slot') {
    // Slot notification
    options = {
      ...options,
      body: data.body || 'New slot created',
      requireInteraction: true,
      data: {
        url: '/home',
        type: 'slot',
        slotId: data.slotId,
      },
      actions: [
        {
          action: 'view',
          title: 'View Slots',
        },
      ],
    };
  } else {
    // General notification
    options.body = data.body || 'You have a new notification';
  }

  const title = data.type === 'chat' 
    ? `${data.senderName || 'New Message'}` 
    : data.title || 'EthicalFire';

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  // Handle action buttons
  if (event.action === 'reply') {
    // Open chat with focus on input
    event.waitUntil(
      clients.openWindow('/chat?focus=input')
    );
    return;
  }
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(urlToOpen)
    );
    return;
  }
  
  // Default click behavior - open or focus existing window
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Handle push subscription changes
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Push subscription changed');
});