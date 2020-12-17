import {ClientSocketEventTypes, ServerSocketEventTypes} from "./SocketEventTypes";
import {NewMessageEvent, ReadMessagesPayload} from "./NewMessageEvent";

/*
  Типы экшенов, которые будут в payload событий сокетов
*/

export type SocketEvent<T, U> = {
  type: T,
  payload: U;
}

export type ClientSocketNewMessageEvent = SocketEvent<ClientSocketEventTypes.NEW_MESSAGE, NewMessageEvent>;
export type ClientSocketReadMessagesEvent = SocketEvent<ClientSocketEventTypes.READ_MESSAGES, ReadMessagesPayload>;

export type ClientSocketEvents =
  | ClientSocketNewMessageEvent
  | ClientSocketReadMessagesEvent



export type ServerSocketNewMessageEvent = SocketEvent<ServerSocketEventTypes.NEW_MESSAGE, NewMessageEvent>;
export type ServerSocketReadMessageEvent = SocketEvent<ServerSocketEventTypes.READ_MESSAGES, ReadMessagesPayload>

export type ServerSocketEvents =
  | ServerSocketNewMessageEvent
  | ServerSocketReadMessageEvent
