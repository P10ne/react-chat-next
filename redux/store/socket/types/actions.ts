import {SetDataAction} from "../../../types/Actions";
import {Socket} from "socket.io-client";
import {ClientSocketEvents} from "./SocketEvents";

export enum ActionType {
  SET_DATA = 'SOCKET/SET_DATA',
  EMIT = 'SOCKET/EMIT'
}

export type SetSocketAction = SetDataAction<ActionType.SET_DATA, Socket>;
export type EmitSocketAction = {
  type: ActionType.EMIT,
  payload: ClientSocketEvents
}

export type SocketActionTypes =
  | SetSocketAction
