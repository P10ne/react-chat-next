import {ActionType, EmitSocketAction, SetSocketAction} from "./types/actions";
import {SocketData} from "./reducer";
import {ClientSocketEventTypes} from "./types/SocketEventTypes";
import {NewMessageEvent, ReadMessagesPayload} from "./types/NewMessageEvent";

export const setSocket = (socket: SocketData): SetSocketAction => ({
  type: ActionType.SET_DATA,
  payload: socket
});

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
