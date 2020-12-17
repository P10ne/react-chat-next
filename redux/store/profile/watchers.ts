import {all, call, takeEvery} from 'redux-saga/effects';
import {ActionType} from "./types/actions";
import {getProfile} from "./workers";

function* watchFetch() {
  yield takeEvery(ActionType.FETCH, getProfile);
}

export function* watcher() {
  yield all([
    call(watchFetch)
  ])
}
