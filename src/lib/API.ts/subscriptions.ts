/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateChatMessage = /* GraphQL */ `subscription OnCreateChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
) {
  onCreateChatMessage(filter: $filter) {
    createdAt
    id
    message
    roomId
    senderId
    senderName
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateChatMessageSubscriptionVariables,
  APITypes.OnCreateChatMessageSubscription
>;
export const onCreateGame = /* GraphQL */ `subscription OnCreateGame($filter: ModelSubscriptionGameFilterInput) {
  onCreateGame(filter: $filter) {
    createdAt
    displayName
    icon
    id
    isActive
    maxPlayers
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateGameSubscriptionVariables,
  APITypes.OnCreateGameSubscription
>;
export const onCreateSlot = /* GraphQL */ `subscription OnCreateSlot($filter: ModelSubscriptionSlotFilterInput) {
  onCreateSlot(filter: $filter) {
    createdAt
    creatorId
    gameId
    id
    maxPlayers
    owner
    players
    startTime
    status
    updatedAt
    waitingQueue
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateSlotSubscriptionVariables,
  APITypes.OnCreateSlotSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
    createdAt
    displayName
    email
    hasCreatedSlot
    id
    owner
    phoneNumber
    role
    selectedGame
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onDeleteChatMessage = /* GraphQL */ `subscription OnDeleteChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
) {
  onDeleteChatMessage(filter: $filter) {
    createdAt
    id
    message
    roomId
    senderId
    senderName
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteChatMessageSubscriptionVariables,
  APITypes.OnDeleteChatMessageSubscription
>;
export const onDeleteGame = /* GraphQL */ `subscription OnDeleteGame($filter: ModelSubscriptionGameFilterInput) {
  onDeleteGame(filter: $filter) {
    createdAt
    displayName
    icon
    id
    isActive
    maxPlayers
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteGameSubscriptionVariables,
  APITypes.OnDeleteGameSubscription
>;
export const onDeleteSlot = /* GraphQL */ `subscription OnDeleteSlot($filter: ModelSubscriptionSlotFilterInput) {
  onDeleteSlot(filter: $filter) {
    createdAt
    creatorId
    gameId
    id
    maxPlayers
    owner
    players
    startTime
    status
    updatedAt
    waitingQueue
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteSlotSubscriptionVariables,
  APITypes.OnDeleteSlotSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
    createdAt
    displayName
    email
    hasCreatedSlot
    id
    owner
    phoneNumber
    role
    selectedGame
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onUpdateChatMessage = /* GraphQL */ `subscription OnUpdateChatMessage(
  $filter: ModelSubscriptionChatMessageFilterInput
) {
  onUpdateChatMessage(filter: $filter) {
    createdAt
    id
    message
    roomId
    senderId
    senderName
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateChatMessageSubscriptionVariables,
  APITypes.OnUpdateChatMessageSubscription
>;
export const onUpdateGame = /* GraphQL */ `subscription OnUpdateGame($filter: ModelSubscriptionGameFilterInput) {
  onUpdateGame(filter: $filter) {
    createdAt
    displayName
    icon
    id
    isActive
    maxPlayers
    name
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateGameSubscriptionVariables,
  APITypes.OnUpdateGameSubscription
>;
export const onUpdateSlot = /* GraphQL */ `subscription OnUpdateSlot($filter: ModelSubscriptionSlotFilterInput) {
  onUpdateSlot(filter: $filter) {
    createdAt
    creatorId
    gameId
    id
    maxPlayers
    owner
    players
    startTime
    status
    updatedAt
    waitingQueue
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateSlotSubscriptionVariables,
  APITypes.OnUpdateSlotSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
    createdAt
    displayName
    email
    hasCreatedSlot
    id
    owner
    phoneNumber
    role
    selectedGame
    updatedAt
    userId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
