import {Status} from "../../types/Status";
import {Chats} from "./types/Chats";
import {ActionType, ChatsActionTypes} from "./types/actions";
import {Chat} from './types/Chat';
import { HYDRATE } from 'next-redux-wrapper'

export type ChatsState = Status & {
  data: Chats,
  active: Chat | null
}

const initialState: ChatsState = {
  loading: false,
  error: null,
  data: [],
  active: null
};

export default function(state: ChatsState = initialState, action: ChatsActionTypes): ChatsState {
  switch (action.type) {
    // @ts-ignore
    case HYDRATE:
      console.log('HYDRATE');
      return {
        ...state,
        // @ts-ignore
        ...action.payload.chats
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        loading: true
      };
    case ActionType.STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    case ActionType.SET_DATA:
      console.log('set chats data');
      return {
        ...state,
        data: action.payload
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case ActionType.SET_SELECTED:
      return {
        ...state,
        active: action.payload
      };
    case ActionType.CLEAR_SELECTED:
      return {
        ...state,
        active: null
      };
    case ActionType.INCREMENT_UNREAD_COUNT:
      const newChats = [...state.data];
      const newChat = newChats.find(chat => chat.id === action.payload.chatId);
      if (newChat) newChat.unreadMessagesCount++;
      return {
        ...state,
        data: newChats
      };
    case ActionType.RESET_UNREAD_COUNT:
      const newChats1 = [...state.data];
      const newChat1 = newChats1.find(chat => chat.id === action.payload.chatId);
      if (newChat1) newChat1.unreadMessagesCount = 0;
      return {
        ...state,
        data: newChats1
      };
    default: return state;
  }
}
