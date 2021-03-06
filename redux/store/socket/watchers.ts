import {call, fork, put, select, take, takeEvery} from 'redux-saga/effects';
import {createSocketChannel, createWebSocketConnection} from "./utils";
import {outputEventsWorker, takeMessage} from "./workers";
import {ServerSocketEventTypes} from "./types/SocketEventTypes";
import {ServerSocketEvents} from "./types/SocketEvents";
import {ActionType} from "./types/actions";
import {ActionType as AuthActionType, SetAuthStatusAction, SetAuthStatusActionPayload} from '../auth/types/actions';
import {Socket} from "socket.io-client";
import {profileDataSelector} from "../profile/selectors";
import {markAsRead} from "../messages/actions";

function* watchInputSocketEvents(socket: Socket) {
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const event: ServerSocketEvents = yield take(socketChannel);
      switch (event.type) {
        case ServerSocketEventTypes.NEW_MESSAGE:
          yield takeMessage(event.payload);
          break;
        case ServerSocketEventTypes.READ_MESSAGES:
          yield put(markAsRead({messages: event.payload.messages}));
          break;
      }
    } catch(err) {
      console.error('socket error:', err);
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}

function* watchOutputSocketEvents(socket: Socket) {
  yield takeEvery(ActionType.EMIT, outputEventsWorker, socket);
}

export function* socketWatcher() {
  yield takeEvery(ActionType.CONNECT, function* () {
    const profileData = yield select(profileDataSelector);
    const socket = yield call(createWebSocketConnection, profileData);
    yield fork(watchInputSocketEvents, socket);
    yield fork(watchOutputSocketEvents, socket);
  })

}
