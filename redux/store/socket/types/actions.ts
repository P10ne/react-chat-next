import {ClientSocketEvents} from "./SocketEvents";

export enum ActionType {
  CONNECT = 'SOCKET/CONNECT',
  SET_DATA = 'SOCKET/SET_DATA',
  EMIT = 'SOCKET/EMIT'
}

export type EmitSocketAction = {
  type: ActionType.EMIT,
  payload: ClientSocketEvents
}
