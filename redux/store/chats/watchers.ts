import {takeEvery, all, call, takeLatest} from 'redux-saga/effects';
import {ActionType} from "./types/actions";
import {getChats} from "./workers";

function* watchFetch() {
  yield takeLatest(ActionType.FETCH, getChats)
}

export function* watcher() {
  yield all([
    call(watchFetch)
  ])
}
