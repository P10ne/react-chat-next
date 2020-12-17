import {combineReducers} from "redux";
import messages from "./messages/reducer";
import chats from './chats/reducer';
import profile from './profile/reducer';
import auth from './auth/reducer';
import socket from './socket/reducer';

export const rootReducer = combineReducers({
  messages,
  chats,
  profile,
  auth,
  socket
});

export type RootState = ReturnType<typeof rootReducer>;
