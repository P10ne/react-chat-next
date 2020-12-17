import {Messages} from "./types/Messages";
import {ActionType, MessagesActionTypes} from './types/actions';
import {Status} from "../../types/Status";

export type MessagesState = Status & {
  data: Messages;
}

const initialState: MessagesState = {
  data: [],
  loading: false,
  error: null
};

export default function(state: MessagesState = initialState, action: MessagesActionTypes): MessagesState {
  switch (action.type) {
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
      return {
        ...state,
        data: action.payload
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    case ActionType.APPEND:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case ActionType.MARK_AS_READ:
      const messages = [...state.data];
      const newMessages = messages.map(message => {
        const messageToUpdate = action.payload.find(readMessage => readMessage.id === message.id);
        if (messageToUpdate) {
          return messageToUpdate;
        } else {
          return message;
        }
      });

      return {
        ...state,
        // @ts-ignore
        data: newMessages
      };
    case ActionType.MARK_AS_SENT:
      const oldMessages = [...state.data];
      const messageToUpdateIndex = oldMessages.findIndex(message => message.id === action.payload.editableId);
      if (messageToUpdateIndex > -1) {
        oldMessages.splice(messageToUpdateIndex, 1, action.payload.message);
      }
      // todo название переменной
      const messages1 = [...oldMessages];
      return {
        ...state,
        data: messages1
      };
    default: return state;
  }
}
