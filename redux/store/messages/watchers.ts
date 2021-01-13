import {takeEvery, all, call, fork, cancel} from 'redux-saga/effects';
import {ActionType, FetchMessagesAction} from "./types/actions";
import {getMessages} from "./workers";

function* watchFetch() {
  // todo any type
  let fetchingMessagesSaga: any = null;
  yield takeEvery(ActionType.FETCH, function* (action: FetchMessagesAction) {
    if (fetchingMessagesSaga) {
      yield cancel(fetchingMessagesSaga);
      fetchingMessagesSaga = null;
    }
    fetchingMessagesSaga = yield fork(getMessages, action);
  });
}

export function* watcher() {
  yield all([
    call(watchFetch)
  ])
}
