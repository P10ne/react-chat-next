import {takeEvery, all, call} from 'redux-saga/effects';
import {ActionType} from "./types/actions";
import {login, logout} from "./workers";

function* watchLogin() {
  yield takeEvery(ActionType.FETCH, login);
}
function* watchLogout() {
  yield takeEvery(ActionType.LOGOUT, logout);
}

export function* watcher() {
  yield all([
    call(watchLogin),
    call(watchLogout)
  ])
}
