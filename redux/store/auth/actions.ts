import {
  ActionType,
  LoginFetchAction,
  LoginFetchActionPayload,
  LogoutAction,
  SetAuthStatusAction,
  SetAuthStatusActionPayload,
  StartFetchingLoginAction,
  StopFetchingLoginAction,
} from "./types/actions";

export const setAuthStatus = (authData: SetAuthStatusActionPayload): SetAuthStatusAction => ({
  type: ActionType.SET_AUTH_STATUS,
  payload: authData
});
export const startLoading = (): StartFetchingLoginAction => ({
  type: ActionType.START_LOADING
});
export const stopLoading = (): StopFetchingLoginAction => ({
  type: ActionType.STOP_LOADING
});
export const fetchLogin = (data: LoginFetchActionPayload): LoginFetchAction => ({
  type: ActionType.FETCH,
  payload: data
});
export const logout = (): LogoutAction => ({
  type: ActionType.LOGOUT
});
