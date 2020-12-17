import {Messages} from "./Messages";
import {
  FetchAction,
  SetDataAction,
  SetFetchingErrorAction,
  StartFetchingAction,
  StopFetchingAction
} from "../../../types/Actions";
import {Message} from "./Message";

export enum ActionType {
  START_LOADING = `MESSAGES/START_LOADING`,
  STOP_LOADING = `MESSAGES/STOP_LOADING`,
  SET_DATA = `MESSAGES/SET_DATA`,
  SET_ERROR = `MESSAGES/SET_ERROR`,
  APPEND = 'MESSAGES/APPEND',
  MARK_AS_READ = 'MESSAGES/MARK_AS_READ',
  MARK_AS_SENT = 'MESSAGES/MARK_AS_SENT',
  FETCH = 'MESSAGES/FETCH'
}

export type StartFetchingMessagesAction =  StartFetchingAction<ActionType.START_LOADING>;
export type StopFetchingMessagesAction = StopFetchingAction<ActionType.STOP_LOADING>;
export type SetMessagesAction = SetDataAction<ActionType.SET_DATA, Messages>;
export type SetMessagesFetchErrorAction = SetFetchingErrorAction<ActionType.SET_ERROR>;
export type AppendMessageAction = {
  type: ActionType.APPEND,
  payload: Message
}
export type MarkAsReadAction = {
  type: ActionType.MARK_AS_READ,
  payload: Messages
}
export type MarkAsSentActionPayload = {
  editableId: number;
  message: Message;
}
export type MarkAsSentAction = {
  type: ActionType.MARK_AS_SENT,
  payload: MarkAsSentActionPayload;
}
export type FetchMessagesPayload = {
  chatId: number;
}
export type FetchMessagesAction = FetchAction<ActionType.FETCH, FetchMessagesPayload>;

export type MessagesActionTypes =
  | StartFetchingMessagesAction
  | StopFetchingMessagesAction
  | SetMessagesAction
  | SetMessagesFetchErrorAction
  | AppendMessageAction
  | MarkAsReadAction
  | MarkAsSentAction
