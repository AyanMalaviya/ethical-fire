export type UserRole = 'USER' | 'ADMIN';
export type SlotStatus = 'ACTIVE' | 'CANCELLED' | 'COMPLETED';

export interface User {
  userId: string;
  phoneNumber?: string;
  email?: string;
  displayName?: string;
  selectedGame?: string;
  hasCreatedSlot: boolean;
  role: UserRole;
  createdAt: string;
}

export interface Game {
  id: string;
  name: string;
  displayName: string;
  icon?: string;
  isActive: boolean;
  maxPlayers: number;
}

export interface Slot {
  id: string;
  gameId: string;
  creatorId: string;
  startTime: string;
  status: SlotStatus;
  players: string[];
  waitingQueue: string[];
  maxPlayers: number;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
}
