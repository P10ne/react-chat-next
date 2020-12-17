import {Socket} from "socket.io-client";
import {ActionType, SocketActionTypes} from "./types/actions";

export type SocketData = Socket;
type SocketState = {
  data: SocketData | null;
}
const initialState: SocketState = {
  data: null
};

export default function(state: SocketState = initialState, action: SocketActionTypes): SocketState {
  switch(action.type) {
    case ActionType.SET_DATA:
      return {
        data: action.payload
      }
    default: return state;
  }
}
