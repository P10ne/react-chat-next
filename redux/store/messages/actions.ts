import {Messages} from "./types/Messages";
import {
  ActionType,
  AppendMessageAction,
  FetchMessagesAction,
  FetchMessagesPayload,
  MarkAsReadAction,
  MarkAsSentAction, MarkAsSentActionPayload,
  SetMessagesAction,
  SetMessagesFetchErrorAction,
  StartFetchingMessagesAction,
  StopFetchingMessagesAction
} from "./types/actions";
import {HttpError} from "../../types/HttpError";
import {Message} from "./types/Message";

export const setData = (messages: Messages): SetMessagesAction => ({
  type: ActionType.SET_DATA,
  payload: messages
});
export const appendMessage = (message: Message): AppendMessageAction => ({
  type:ActionType.APPEND,
  payload: message
});
export const markAsRead = (data: {messages: Messages}): MarkAsReadAction => ({
  type: ActionType.MARK_AS_READ,
  payload: data.messages
});
export const markAsSent = (data: MarkAsSentActionPayload): MarkAsSentAction => ({
  type: ActionType.MARK_AS_SENT,
  payload: data
});
export const setError = (error: HttpError): SetMessagesFetchErrorAction => ({
  type: ActionType.SET_ERROR,
  error
});
export const startLoading = (): StartFetchingMessagesAction => ({
  type: ActionType.START_LOADING
});
export const stopLoading = (): StopFetchingMessagesAction => ({
  type: ActionType.STOP_LOADING
});
export const fetchMessages = ({chatId}: FetchMessagesPayload): FetchMessagesAction => ({
  type: ActionType.FETCH,
  payload: {
    chatId
  }
});
