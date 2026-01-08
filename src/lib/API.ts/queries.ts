/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getChatMessage = /* GraphQL */ `query GetChatMessage($id: ID!) {
  getChatMessage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetChatMessageQueryVariables,
  APITypes.GetChatMessageQuery
>;
export const getGame = /* GraphQL */ `query GetGame($id: ID!) {
  getGame(id: $id) {
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
` as GeneratedQuery<APITypes.GetGameQueryVariables, APITypes.GetGameQuery>;
export const getSlot = /* GraphQL */ `query GetSlot($id: ID!) {
  getSlot(id: $id) {
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
` as GeneratedQuery<APITypes.GetSlotQueryVariables, APITypes.GetSlotQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listChatMessages = /* GraphQL */ `query ListChatMessages(
  $filter: ModelChatMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listChatMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createdAt
      id
      message
      roomId
      senderId
      senderName
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListChatMessagesQueryVariables,
  APITypes.ListChatMessagesQuery
>;
export const listGames = /* GraphQL */ `query ListGames(
  $filter: ModelGameFilterInput
  $limit: Int
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListGamesQueryVariables, APITypes.ListGamesQuery>;
export const listSlots = /* GraphQL */ `query ListSlots(
  $filter: ModelSlotFilterInput
  $limit: Int
  $nextToken: String
) {
  listSlots(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListSlotsQueryVariables, APITypes.ListSlotsQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
