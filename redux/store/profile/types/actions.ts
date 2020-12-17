import {
  FetchAction,
  SetDataAction,
  SetFetchingErrorAction,
  StartFetchingAction,
  StopFetchingAction
} from "../../../types/Actions";
import {User} from "../../../types/User";

export enum ActionType {
  START_LOADING = `PROFILE/START_LOADING`,
  STOP_LOADING = `PROFILE/STOP_LOADING`,
  SET_DATA = `PROFILE/SET_DATA`,
  SET_ERROR = `PROFILE/SET_ERROR`,
  FETCH = 'PROFILE/FETCH'
}

export type StartFetchingProfileAction = StartFetchingAction<ActionType.START_LOADING>;
export type StopFetchingProfileAction = StopFetchingAction<ActionType.STOP_LOADING>;
export type SetProfileAction = SetDataAction<ActionType.SET_DATA, User>;
export type SetProfileFetchErrorAction = SetFetchingErrorAction<ActionType.SET_ERROR>;
export type FetchProfileAction = FetchAction<ActionType.FETCH>;

export type ProfileActionTypes =
  | StartFetchingProfileAction
  | StopFetchingProfileAction
  | SetProfileAction
  | SetProfileFetchErrorAction
  | FetchProfileAction;
