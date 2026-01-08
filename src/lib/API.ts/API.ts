/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ChatMessage = {
  __typename: "ChatMessage",
  createdAt?: string | null,
  id: string,
  message: string,
  roomId: string,
  senderId: string,
  senderName: string,
  updatedAt: string,
};

export type Game = {
  __typename: "Game",
  createdAt: string,
  displayName: string,
  icon?: string | null,
  id: string,
  isActive?: boolean | null,
  maxPlayers?: number | null,
  name: string,
  updatedAt: string,
};

export type Slot = {
  __typename: "Slot",
  createdAt: string,
  creatorId: string,
  gameId: string,
  id: string,
  maxPlayers?: number | null,
  owner?: string | null,
  players?: Array< string | null > | null,
  startTime: string,
  status?: SlotStatus | null,
  updatedAt: string,
  waitingQueue?: Array< string | null > | null,
};

export enum SlotStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}


export type User = {
  __typename: "User",
  createdAt?: string | null,
  displayName?: string | null,
  email?: string | null,
  hasCreatedSlot?: boolean | null,
  id: string,
  owner?: string | null,
  phoneNumber?: string | null,
  role?: UserRole | null,
  selectedGame?: string | null,
  updatedAt: string,
  userId: string,
};

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}


export type ModelChatMessageFilterInput = {
  and?: Array< ModelChatMessageFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  message?: ModelStringInput | null,
  not?: ModelChatMessageFilterInput | null,
  or?: Array< ModelChatMessageFilterInput | null > | null,
  roomId?: ModelStringInput | null,
  senderId?: ModelIDInput | null,
  senderName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelChatMessageConnection = {
  __typename: "ModelChatMessageConnection",
  items:  Array<ChatMessage | null >,
  nextToken?: string | null,
};

export type ModelGameFilterInput = {
  and?: Array< ModelGameFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isActive?: ModelBooleanInput | null,
  maxPlayers?: ModelIntInput | null,
  name?: ModelStringInput | null,
  not?: ModelGameFilterInput | null,
  or?: Array< ModelGameFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelGameConnection = {
  __typename: "ModelGameConnection",
  items:  Array<Game | null >,
  nextToken?: string | null,
};

export type ModelSlotFilterInput = {
  and?: Array< ModelSlotFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  creatorId?: ModelIDInput | null,
  gameId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  maxPlayers?: ModelIntInput | null,
  not?: ModelSlotFilterInput | null,
  or?: Array< ModelSlotFilterInput | null > | null,
  owner?: ModelStringInput | null,
  players?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  status?: ModelSlotStatusInput | null,
  updatedAt?: ModelStringInput | null,
  waitingQueue?: ModelStringInput | null,
};

export type ModelSlotStatusInput = {
  eq?: SlotStatus | null,
  ne?: SlotStatus | null,
};

export type ModelSlotConnection = {
  __typename: "ModelSlotConnection",
  items:  Array<Slot | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  hasCreatedSlot?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  selectedGame?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type ModelUserRoleInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelChatMessageConditionInput = {
  and?: Array< ModelChatMessageConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  message?: ModelStringInput | null,
  not?: ModelChatMessageConditionInput | null,
  or?: Array< ModelChatMessageConditionInput | null > | null,
  roomId?: ModelStringInput | null,
  senderId?: ModelIDInput | null,
  senderName?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateChatMessageInput = {
  createdAt?: string | null,
  id?: string | null,
  message: string,
  roomId: string,
  senderId: string,
  senderName: string,
};

export type ModelGameConditionInput = {
  and?: Array< ModelGameConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  icon?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  maxPlayers?: ModelIntInput | null,
  name?: ModelStringInput | null,
  not?: ModelGameConditionInput | null,
  or?: Array< ModelGameConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateGameInput = {
  displayName: string,
  icon?: string | null,
  id?: string | null,
  isActive?: boolean | null,
  maxPlayers?: number | null,
  name: string,
};

export type ModelSlotConditionInput = {
  and?: Array< ModelSlotConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  creatorId?: ModelIDInput | null,
  gameId?: ModelIDInput | null,
  maxPlayers?: ModelIntInput | null,
  not?: ModelSlotConditionInput | null,
  or?: Array< ModelSlotConditionInput | null > | null,
  owner?: ModelStringInput | null,
  players?: ModelStringInput | null,
  startTime?: ModelStringInput | null,
  status?: ModelSlotStatusInput | null,
  updatedAt?: ModelStringInput | null,
  waitingQueue?: ModelStringInput | null,
};

export type CreateSlotInput = {
  creatorId: string,
  gameId: string,
  id?: string | null,
  maxPlayers?: number | null,
  players?: Array< string | null > | null,
  startTime: string,
  status?: SlotStatus | null,
  waitingQueue?: Array< string | null > | null,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  displayName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  hasCreatedSlot?: ModelBooleanInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  owner?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  role?: ModelUserRoleInput | null,
  selectedGame?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
};

export type CreateUserInput = {
  createdAt?: string | null,
  displayName?: string | null,
  email?: string | null,
  hasCreatedSlot?: boolean | null,
  id?: string | null,
  phoneNumber?: string | null,
  role?: UserRole | null,
  selectedGame?: string | null,
  userId: string,
};

export type DeleteChatMessageInput = {
  id: string,
};

export type DeleteGameInput = {
  id: string,
};

export type DeleteSlotInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type UpdateChatMessageInput = {
  createdAt?: string | null,
  id: string,
  message?: string | null,
  roomId?: string | null,
  senderId?: string | null,
  senderName?: string | null,
};

export type UpdateGameInput = {
  displayName?: string | null,
  icon?: string | null,
  id: string,
  isActive?: boolean | null,
  maxPlayers?: number | null,
  name?: string | null,
};

export type UpdateSlotInput = {
  creatorId?: string | null,
  gameId?: string | null,
  id: string,
  maxPlayers?: number | null,
  players?: Array< string | null > | null,
  startTime?: string | null,
  status?: SlotStatus | null,
  waitingQueue?: Array< string | null > | null,
};

export type UpdateUserInput = {
  createdAt?: string | null,
  displayName?: string | null,
  email?: string | null,
  hasCreatedSlot?: boolean | null,
  id: string,
  phoneNumber?: string | null,
  role?: UserRole | null,
  selectedGame?: string | null,
  userId?: string | null,
};

export type ModelSubscriptionChatMessageFilterInput = {
  and?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  message?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionChatMessageFilterInput | null > | null,
  roomId?: ModelSubscriptionStringInput | null,
  senderId?: ModelSubscriptionIDInput | null,
  senderName?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionGameFilterInput = {
  and?: Array< ModelSubscriptionGameFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  displayName?: ModelSubscriptionStringInput | null,
  icon?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  maxPlayers?: ModelSubscriptionIntInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionGameFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionSlotFilterInput = {
  and?: Array< ModelSubscriptionSlotFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  creatorId?: ModelSubscriptionIDInput | null,
  gameId?: ModelSubscriptionIDInput | null,
  id?: ModelSubscriptionIDInput | null,
  maxPlayers?: ModelSubscriptionIntInput | null,
  or?: Array< ModelSubscriptionSlotFilterInput | null > | null,
  owner?: ModelStringInput | null,
  players?: ModelSubscriptionStringInput | null,
  startTime?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  waitingQueue?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  displayName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  hasCreatedSlot?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  selectedGame?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
};

export type GetChatMessageQueryVariables = {
  id: string,
};

export type GetChatMessageQuery = {
  getChatMessage?:  {
    __typename: "ChatMessage",
    createdAt?: string | null,
    id: string,
    message: string,
    roomId: string,
    senderId: string,
    senderName: string,
    updatedAt: string,
  } | null,
};

export type GetGameQueryVariables = {
  id: string,
};

export type GetGameQuery = {
  getGame?:  {
    __typename: "Game",
    createdAt: string,
    displayName: string,
    icon?: string | null,
    id: string,
    isActive?: boolean | null,
    maxPlayers?: number | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type GetSlotQueryVariables = {
  id: string,
};

export type GetSlotQuery = {
  getSlot?:  {
    __typename: "Slot",
    createdAt: string,
    creatorId: string,
    gameId: string,
    id: string,
    maxPlayers?: number | null,
    owner?: string | null,
    players?: Array< string | null > | null,
    startTime: string,
    status?: SlotStatus | null,
    updatedAt: string,
    waitingQueue?: Array< string | null > | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    createdAt?: string | null,
    displayName?: string | null,
    email?: string | null,
    hasCreatedSlot?: boolean | null,
    id: string,
    owner?: string | null,
    phoneNumber?: string | null,
    role?: UserRole | null,
    selectedGame?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type ListChatMessagesQueryVariables = {
  filter?: ModelChatMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListChatMessagesQuery = {
  listChatMessages?:  {
    __typename: "ModelChatMessageConnection",
    items:  Array< {
      __typename: "ChatMessage",
      createdAt?: string | null,
      id: string,
      message: string,
      roomId: string,
      senderId: string,
      senderName: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGameFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames?:  {
    __typename: "ModelGameConnection",
    items:  Array< {
      __typename: "Game",
      createdAt: string,
      displayName: string,
      icon?: string | null,
      id: string,
      isActive?: boolean | null,
      maxPlayers?: number | null,
      name: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSlotsQueryVariables = {
  filter?: ModelSlotFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSlotsQuery = {
  listSlots?:  {
    __typename: "ModelSlotConnection",
    items:  Array< {
      __typename: "Slot",
      createdAt: string,
      creatorId: string,
      gameId: string,
      id: string,
      maxPlayers?: number | null,
      owner?: string | null,
      players?: Array< string | null > | null,
      startTime: string,
      status?: SlotStatus | null,
      updatedAt: string,
      waitingQueue?: Array< string | null > | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      createdAt?: string | null,
      displayName?: string | null,
      email?: string | null,
      hasCreatedSlot?: boolean | null,
      id: string,
      owner?: string | null,
      phoneNumber?: string | null,
      role?: UserRole | null,
      selectedGame?: string | null,
      updatedAt: string,
      userId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: CreateChatMessageInput,
};

export type CreateChatMessageMutation = {
  createChatMessage?:  {
    __typename: "ChatMessage",
    createdAt?: string | null,
    id: string,
    message: string,
    roomId: string,
    senderId: string,
    senderName: string,
    updatedAt: string,
  } | null,
};

export type CreateGameMutationVariables = {
  condition?: ModelGameConditionInput | null,
  input: CreateGameInput,
};

export type CreateGameMutation = {
  createGame?:  {
    __typename: "Game",
    createdAt: string,
    displayName: string,
    icon?: string | null,
    id: string,
    isActive?: boolean | null,
    maxPlayers?: number | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type CreateSlotMutationVariables = {
  condition?: ModelSlotConditionInput | null,
  input: CreateSlotInput,
};

export type CreateSlotMutation = {
  createSlot?:  {
    __typename: "Slot",
    createdAt: string,
    creatorId: string,
    gameId: string,
    id: string,
    maxPlayers?: number | null,
    owner?: string | null,
    players?: Array< string | null > | null,
    startTime: string,
    status?: SlotStatus | null,
    updatedAt: string,
    waitingQueue?: Array< string | null > | null,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    createdAt?: string | null,
    displayName?: string | null,
    email?: string | null,
    hasCreatedSlot?: boolean | null,
    id: string,
    owner?: string | null,
    phoneNumber?: string | null,
    role?: UserRole | null,
    selectedGame?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type DeleteChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: DeleteChatMessageInput,
};

export type DeleteChatMessageMutation = {
  deleteChatMessage?:  {
    __typename: "ChatMessage",
    createdAt?: string | null,
    id: string,
    message: string,
    roomId: string,
    senderId: string,
    senderName: string,
    updatedAt: string,
  } | null,
};

export type DeleteGameMutationVariables = {
  condition?: ModelGameConditionInput | null,
  input: DeleteGameInput,
};

export type DeleteGameMutation = {
  deleteGame?:  {
    __typename: "Game",
    createdAt: string,
    displayName: string,
    icon?: string | null,
    id: string,
    isActive?: boolean | null,
    maxPlayers?: number | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type DeleteSlotMutationVariables = {
  condition?: ModelSlotConditionInput | null,
  input: DeleteSlotInput,
};

export type DeleteSlotMutation = {
  deleteSlot?:  {
    __typename: "Slot",
    createdAt: string,
    creatorId: string,
    gameId: string,
    id: string,
    maxPlayers?: number | null,
    owner?: string | null,
    players?: Array< string | null > | null,
    startTime: string,
    status?: SlotStatus | null,
    updatedAt: string,
    waitingQueue?: Array< string | null > | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    createdAt?: string | null,
    displayName?: string | null,
    email?: string | null,
    hasCreatedSlot?: boolean | null,
    id: string,
    owner?: string | null,
    phoneNumber?: string | null,
    role?: UserRole | null,
    selectedGame?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type UpdateChatMessageMutationVariables = {
  condition?: ModelChatMessageConditionInput | null,
  input: UpdateChatMessageInput,
};

export type UpdateChatMessageMutation = {
  updateChatMessage?:  {
    __typename: "ChatMessage",
    createdAt?: string | null,
    id: string,
    message: string,
    roomId: string,
    senderId: string,
    senderName: string,
    updatedAt: string,
  } | null,
};

export type UpdateGameMutationVariables = {
  condition?: ModelGameConditionInput | null,
  input: UpdateGameInput,
};

export type UpdateGameMutation = {
  updateGame?:  {
    __typename: "Game",
    createdAt: string,
    displayName: string,
    icon?: string | null,
    id: string,
    isActive?: boolean | null,
    maxPlayers?: number | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type UpdateSlotMutationVariables = {
  condition?: ModelSlotConditionInput | null,
  input: UpdateSlotInput,
};

export type UpdateSlotMutation = {
  updateSlot?:  {
    __typename: "Slot",
    createdAt: string,
    creatorId: string,
    gameId: string,
    id: string,
    maxPlayers?: number | null,
    owner?: string | null,
    players?: Array< string | null > | null,
    startTime: string,
    status?: SlotStatus | null,
    updatedAt: string,
    waitingQueue?: Array< string | null > | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    createdAt?: string | null,
    displayName?: string | null,
    email?: string | null,
    hasCreatedSlot?: boolean | null,
    id: string,
    owner?: string | null,
    phoneNumber?: string | null,
    role?: UserRole | null,
    selectedGame?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnCreateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
};

export type OnCreateChatMessageSubscription = {
  onCreateChatMessage?:  {
    __typename: "ChatMessage",
    createdAt?: string | null,
    id: string,
    message: string,
    roomId: string,
    senderId: string,
    senderName: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null,
};

export type OnCreateGameSubscription = {
  onCreateGame?:  {
    __typename: "Game",
    createdAt: string,
    displayName: string,
    icon?: string | null,
    id: string,
    isActive?: boolean | null,
    maxPlayers?: number | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSlotSubscriptionVariables = {
  filter?: ModelSubscriptionSlotFilterInput | null,
};

export type OnCreateSlotSubscription = {
  onCreateSlot?:  {
    __typename: "Slot",
    createdAt: string,
    creatorId: string,
    gameId: string,
    id: string,
    maxPlayers?: number | null,
    owner?: string | null,
    players?: Array< string | null > | null,
    startTime: string,
    status?: SlotStatus | null,
    updatedAt: string,
    waitingQueue?: Array< string | null > | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    createdAt?: string | null,
    displayName?: string | null,
    email?: string | null,
    hasCreatedSlot?: boolean | null,
    id: string,
    owner?: string | null,
    phoneNumber?: string | null,
    role?: UserRole | null,
    selectedGame?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnDeleteChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
};

export type OnDeleteChatMessageSubscription = {
  onDeleteChatMessage?:  {
    __typename: "ChatMessage",
    createdAt?: string | null,
    id: string,
    message: string,
    roomId: string,
    senderId: string,
    senderName: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null,
};

export type OnDeleteGameSubscription = {
  onDeleteGame?:  {
    __typename: "Game",
    createdAt: string,
    displayName: string,
    icon?: string | null,
    id: string,
    isActive?: boolean | null,
    maxPlayers?: number | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSlotSubscriptionVariables = {
  filter?: ModelSubscriptionSlotFilterInput | null,
};

export type OnDeleteSlotSubscription = {
  onDeleteSlot?:  {
    __typename: "Slot",
    createdAt: string,
    creatorId: string,
    gameId: string,
    id: string,
    maxPlayers?: number | null,
    owner?: string | null,
    players?: Array< string | null > | null,
    startTime: string,
    status?: SlotStatus | null,
    updatedAt: string,
    waitingQueue?: Array< string | null > | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    createdAt?: string | null,
    displayName?: string | null,
    email?: string | null,
    hasCreatedSlot?: boolean | null,
    id: string,
    owner?: string | null,
    phoneNumber?: string | null,
    role?: UserRole | null,
    selectedGame?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};

export type OnUpdateChatMessageSubscriptionVariables = {
  filter?: ModelSubscriptionChatMessageFilterInput | null,
};

export type OnUpdateChatMessageSubscription = {
  onUpdateChatMessage?:  {
    __typename: "ChatMessage",
    createdAt?: string | null,
    id: string,
    message: string,
    roomId: string,
    senderId: string,
    senderName: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGameSubscriptionVariables = {
  filter?: ModelSubscriptionGameFilterInput | null,
};

export type OnUpdateGameSubscription = {
  onUpdateGame?:  {
    __typename: "Game",
    createdAt: string,
    displayName: string,
    icon?: string | null,
    id: string,
    isActive?: boolean | null,
    maxPlayers?: number | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSlotSubscriptionVariables = {
  filter?: ModelSubscriptionSlotFilterInput | null,
};

export type OnUpdateSlotSubscription = {
  onUpdateSlot?:  {
    __typename: "Slot",
    createdAt: string,
    creatorId: string,
    gameId: string,
    id: string,
    maxPlayers?: number | null,
    owner?: string | null,
    players?: Array< string | null > | null,
    startTime: string,
    status?: SlotStatus | null,
    updatedAt: string,
    waitingQueue?: Array< string | null > | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    createdAt?: string | null,
    displayName?: string | null,
    email?: string | null,
    hasCreatedSlot?: boolean | null,
    id: string,
    owner?: string | null,
    phoneNumber?: string | null,
    role?: UserRole | null,
    selectedGame?: string | null,
    updatedAt: string,
    userId: string,
  } | null,
};
