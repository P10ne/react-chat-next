import {User} from "../../types/User";
import {
  ActionType,
  FetchProfileAction,
  SetProfileAction,
  SetProfileFetchErrorAction,
  StartFetchingProfileAction,
  StopFetchingProfileAction
} from "./types/actions";
import {HttpError} from "../../types/HttpError";

export const setData = (userData: User): SetProfileAction => ({
  type: ActionType.SET_DATA,
  payload: userData
});
export const setError = (error: HttpError): SetProfileFetchErrorAction => ({
  type: ActionType.SET_ERROR,
  error
});
export const startLoading = (): StartFetchingProfileAction => ({
  type: ActionType.START_LOADING
});
export const stopLoading = (): StopFetchingProfileAction => ({
  type: ActionType.STOP_LOADING
});
export const fetchProfile = (): Omit<FetchProfileAction, 'payload'>  => ({
  type: ActionType.FETCH
});

