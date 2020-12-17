import {RootState} from "../index";
import {SocketData} from "./reducer";

export const socketSelector = (state: RootState): SocketData | null => state.socket.data;
