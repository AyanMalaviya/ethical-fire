import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Slot: a
    .model({
      gameName: a.string().required(),
      startTime: a.datetime().required(),
      status: a.enum(['ACTIVE', 'CANCELLED', 'COMPLETED']),
      creatorId: a.string().required(),
      creatorName: a.string(),
      players: a.string().array(),
      playerNames: a.string().array(),
      waitingQueue: a.string().array(),
      waitingQueueNames: a.string().array(),
      maxPlayers: a.integer(),
      description: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update', 'delete']),
      allow.group('ADMIN'),
    ]),

  ChatMessage: a
    .model({
      roomId: a.string().required(),
      senderId: a.string().required(),
      senderName: a.string().required(),
      message: a.string().required(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(['read', 'create']),
      allow.group('ADMIN').to(['delete']),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
