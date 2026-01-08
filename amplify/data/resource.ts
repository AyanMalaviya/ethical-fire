import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
      userId: a.id().required(),
      email: a.string(),
      displayName: a.string(),
      selectedGame: a.string(),
      hasCreatedSlot: a.boolean().default(false),
      role: a.enum(['USER', 'ADMIN']),
      slots: a.hasMany('Slot', 'creatorId'),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.authenticated().to(['read']),
      allow.group('ADMIN'),
    ]),

  Slot: a
    .model({
      gameId: a.string().required(),
      gameName: a.string().required(),
      creatorId: a.id().required(),
      creatorName: a.string(),
      startTime: a.datetime().required(),
      status: a.enum(['ACTIVE', 'CANCELLED', 'COMPLETED']),
      players: a.string().array(),
      playerNames: a.string().array(),
      waitingQueue: a.string().array(),
      maxPlayers: a.integer().default(4),
      description: a.string(),
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
