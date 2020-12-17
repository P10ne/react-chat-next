import {
  SetDataAction, SetFetchingErrorAction, StartFetchingAction, StopFetchingAction
} from "../../../types/Actions";

export enum ActionType {
  SET_AUTH_STATUS = 'AUTH/SET_STATUS',
  FETCH = 'AUTH/FETCH',
  START_LOADING = `AUTH/START_LOADING`,
  STOP_LOADING = `AUTH/STOP_LOADING`,
  SET_ERROR = `AUTH/SET_ERROR`,
  LOGOUT = `AUTH/LOGOUT`
}

export type StartFetchingLoginAction = StartFetchingAction<ActionType.START_LOADING>;
export type StopFetchingLoginAction = StopFetchingAction<ActionType.STOP_LOADING>;
export type SetLoginFetchErrorAction = SetFetchingErrorAction<ActionType.SET_ERROR>;

export type SetAuthStatusActionPayload = {
  isLogined: boolean;
}
export type SetAuthStatusAction = SetDataAction<ActionType.SET_AUTH_STATUS, SetAuthStatusActionPayload>;

export type LoginFetchActionPayload = {
  login: string;
  password: string;
}
export type LoginFetchAction = {
  type: ActionType.FETCH,
  payload: LoginFetchActionPayload;
}
export type LogoutAction = {
  type: ActionType.LOGOUT
}

export type AuthActionTypes =
  | SetAuthStatusAction
  | StartFetchingLoginAction
  | StopFetchingLoginAction
  | SetLoginFetchErrorAction;
