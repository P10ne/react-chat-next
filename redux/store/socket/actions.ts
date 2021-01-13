import {ActionType, EmitSocketAction} from "./types/actions";
import {ClientSocketEventTypes} from "./types/SocketEventTypes";
import {NewMessageEvent, ReadMessagesPayload} from "./types/NewMessageEvent";
import {Action} from "redux";

export const sendMessage = (message: NewMessageEvent): EmitSocketAction => ({
  type: ActionType.EMIT,
  payload: {
    type: ClientSocketEventTypes.NEW_MESSAGE,
    payload: message
  }
});

export const readMessages = (payload: ReadMessagesPayload): EmitSocketAction => ({
  type: ActionType.EMIT,
  payload: {
    type: ClientSocketEventTypes.READ_MESSAGES,
    payload
  }
});

export const connectSocket = (): Action => ({
  type: ActionType.CONNECT
});
