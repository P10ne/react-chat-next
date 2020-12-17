import {takeEvery, all, call} from 'redux-saga/effects';
import {ActionType} from "./types/actions";
import {getMessages} from "./workers";

function* watchFetch() {
  yield takeEvery(ActionType.FETCH, getMessages);
}

export function* watcher() {
  yield all([
    call(watchFetch)
  ])
}
