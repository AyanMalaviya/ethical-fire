/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createChatMessage = /* GraphQL */ `mutation CreateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: CreateChatMessageInput!
) {
  createChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateChatMessageMutationVariables,
  APITypes.CreateChatMessageMutation
>;
export const createGame = /* GraphQL */ `mutation CreateGame(
  $condition: ModelGameConditionInput
  $input: CreateGameInput!
) {
  createGame(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateGameMutationVariables,
  APITypes.CreateGameMutation
>;
export const createSlot = /* GraphQL */ `mutation CreateSlot(
  $condition: ModelSlotConditionInput
  $input: CreateSlotInput!
) {
  createSlot(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSlotMutationVariables,
  APITypes.CreateSlotMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const deleteChatMessage = /* GraphQL */ `mutation DeleteChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: DeleteChatMessageInput!
) {
  deleteChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteChatMessageMutationVariables,
  APITypes.DeleteChatMessageMutation
>;
export const deleteGame = /* GraphQL */ `mutation DeleteGame(
  $condition: ModelGameConditionInput
  $input: DeleteGameInput!
) {
  deleteGame(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteGameMutationVariables,
  APITypes.DeleteGameMutation
>;
export const deleteSlot = /* GraphQL */ `mutation DeleteSlot(
  $condition: ModelSlotConditionInput
  $input: DeleteSlotInput!
) {
  deleteSlot(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteSlotMutationVariables,
  APITypes.DeleteSlotMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const updateChatMessage = /* GraphQL */ `mutation UpdateChatMessage(
  $condition: ModelChatMessageConditionInput
  $input: UpdateChatMessageInput!
) {
  updateChatMessage(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateChatMessageMutationVariables,
  APITypes.UpdateChatMessageMutation
>;
export const updateGame = /* GraphQL */ `mutation UpdateGame(
  $condition: ModelGameConditionInput
  $input: UpdateGameInput!
) {
  updateGame(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateGameMutationVariables,
  APITypes.UpdateGameMutation
>;
export const updateSlot = /* GraphQL */ `mutation UpdateSlot(
  $condition: ModelSlotConditionInput
  $input: UpdateSlotInput!
) {
  updateSlot(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSlotMutationVariables,
  APITypes.UpdateSlotMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
