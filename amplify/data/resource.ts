import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
      userId: a.id().required(),
      phoneNumber: a.string(),
      email: a.string(),
      displayName: a.string(),
      selectedGame: a.string(),
      hasCreatedSlot: a.boolean().default(false),
      role: a.enum(['USER', 'ADMIN']),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
      allow.group('ADMIN'),
    ]),

  Game: a
    .model({
      name: a.string().required(),
      displayName: a.string().required(),
      icon: a.string(),
      isActive: a.boolean().default(true),
      maxPlayers: a.integer().default(4),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('ADMIN'),
    ]),

  Slot: a
    .model({
      gameId: a.id().required(),
      creatorId: a.id().required(),
      startTime: a.datetime().required(),
      status: a.enum(['ACTIVE', 'CANCELLED', 'COMPLETED']),
      players: a.string().array(),
      waitingQueue: a.string().array(),
      maxPlayers: a.integer().default(4),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.owner().to(['create', 'update', 'delete']),
      allow.group('ADMIN'),
    ]),

  ChatMessage: a
    .model({
      roomId: a.string().required(),
      senderId: a.id().required(),
      senderName: a.string().required(),
      message: a.string().required(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create']),
      allow.group('ADMIN'),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
