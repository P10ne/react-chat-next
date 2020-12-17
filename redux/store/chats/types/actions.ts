import {
  FetchAction,
  SetDataAction,
  SetFetchingErrorAction,
  StartFetchingAction,
  StopFetchingAction
} from "../../../types/Actions";
import {Chats} from "./Chats";
import {Chat} from "./Chat";
import {Tokens} from "../../../types/Tokens";

export enum ActionType {
  START_LOADING = `CHATS/START_LOADING`,
  STOP_LOADING = `CHATS/STOP_LOADING`,
  SET_DATA = `CHATS/SET_DATA`,
  SET_ERROR = `CHATS/SET_ERROR`,
  FETCH = 'CHATS/FETCH',
  SET_SELECTED = 'CHATS/SET_SELECTED',
  CLEAR_SELECTED = 'CHATS/CLEAR_SELECTED',
  INCREMENT_UNREAD_COUNT = 'CHATS/INCREMENT_UNREAD_COUNT',
  RESET_UNREAD_COUNT = 'RESET_UNREAD_COUNT'
}

export type StartFetchingChatsAction = StartFetchingAction<ActionType.START_LOADING>;
export type StopFetchingChatsAction = StopFetchingAction<ActionType.STOP_LOADING>;
export type SetChatsAction = SetDataAction<ActionType.SET_DATA, Chats>;
export type SetChatsFetchErrorAction = SetFetchingErrorAction<ActionType.SET_ERROR>;
export type FetchChatsPayload = {
  searchQuery?: string;
  tokens?: Tokens
}
export type FetchChatsAction = FetchAction<ActionType.FETCH, FetchChatsPayload>;

export type SetSelectedChatPayload = Chat;
export type SetSelectedChatAction = {
  type: ActionType.SET_SELECTED,
  payload: SetSelectedChatPayload
}
export type ClearSelectedChatAction = {
  type: ActionType.CLEAR_SELECTED
}
export type IncrementUnreadCountActionPayload = {
  chatId: number;
}
export type IncrementUnreadCountAction = {
  type: ActionType.INCREMENT_UNREAD_COUNT,
  payload: IncrementUnreadCountActionPayload
}
export type ResetUnreadCountActionPayload = {
  chatId: number;
}
export type ResetUnreadCountAction = {
  type: ActionType.RESET_UNREAD_COUNT,
  payload: ResetUnreadCountActionPayload
}

export type ChatsActionTypes =
  | StartFetchingChatsAction
  | StopFetchingChatsAction
  | SetChatsAction
  | SetChatsFetchErrorAction
  | SetSelectedChatAction
  | ClearSelectedChatAction
  | IncrementUnreadCountAction
  | ResetUnreadCountAction
