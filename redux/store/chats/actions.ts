import {
  ActionType,
  ClearSelectedChatAction,
  FetchChatsAction,
  FetchChatsPayload,
  IncrementUnreadCountAction,
  IncrementUnreadCountActionPayload,
  ResetUnreadCountAction,
  ResetUnreadCountActionPayload,
  SetChatsAction,
  SetChatsFetchErrorAction,
  SetSelectedChatAction,
  SetSelectedChatPayload,
  StartFetchingChatsAction,
  StopFetchingChatsAction,
} from "./types/actions";
import {HttpError} from "../../types/HttpError";
import {Chats} from "./types/Chats";

export const setData = (chats: Chats): SetChatsAction => ({
  type: ActionType.SET_DATA,
  payload: chats
});
export const setError = (error: HttpError): SetChatsFetchErrorAction => ({
  type: ActionType.SET_ERROR,
  error
});
export const startLoading = (): StartFetchingChatsAction => ({
  type: ActionType.START_LOADING
});
export const stopLoading = (meta: any): StopFetchingChatsAction => ({
  type: ActionType.STOP_LOADING,
  meta
});
export const fetchChats = ({searchQuery, ctx}: FetchChatsPayload = {}): FetchChatsAction => ({
  type: ActionType.FETCH,
  payload: {
    searchQuery
  },
  ctx,
  meta: {
    thunk: true
  }
});
export const setSelectedChat = (chat: SetSelectedChatPayload): SetSelectedChatAction => ({
  type: ActionType.SET_SELECTED,
  payload: chat
});

export const incrementUnreadCount = ({chatId}: IncrementUnreadCountActionPayload): IncrementUnreadCountAction => ({
  type: ActionType.INCREMENT_UNREAD_COUNT,
  payload: {
    chatId
  }
});

export const resetUnreadCount = ({chatId}: ResetUnreadCountActionPayload): ResetUnreadCountAction => ({
  type: ActionType.RESET_UNREAD_COUNT,
  payload: {
    chatId
  }
})
export const clearSelected = (): ClearSelectedChatAction => ({
  type: ActionType.CLEAR_SELECTED
});
