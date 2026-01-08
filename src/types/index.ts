export type UserRole = 'USER' | 'ADMIN';
export type SlotStatus = 'ACTIVE' | 'CANCELLED' | 'COMPLETED';

export interface User {
  userId: string;
  email?: string;
  displayName?: string;
  selectedGame?: string;
  hasCreatedSlot: boolean;
  role: UserRole;
}

export interface Game {
  id: string;
  name: string;
  displayName: string;
  icon?: string;
  imagePath?: string;
  isActive: boolean;
  maxPlayers: number;
}

export interface Slot {
  id: string;
  gameName: string;
  startTime: string;
  status: SlotStatus;
  creatorId: string;
  creatorName?: string;
  players?: string[];
  playerNames?: string[];
  waitingQueue?: string[];
  waitingQueueNames?: string[];
  maxPlayers: number;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt?: string;
}

export interface CreateSlotInput {
  gameName: string;
  startTime: string;
  description?: string;
  creatorId: string;
  creatorName: string;
}

// Notification types
export interface PushNotificationData {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  icon?: string;
  badge?: string;
  requireInteraction?: boolean;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}
