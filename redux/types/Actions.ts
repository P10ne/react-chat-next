import {HttpError} from "./HttpError";
import {AccessToken} from "./AccessToken";
import {RefreshToken} from "./RefreshToken";
import {Tokens} from "./Tokens";
import {NextApiRequest} from "next";
import {GetServerSidePropsContext} from "next-redux-wrapper";

export type StartFetchingAction<T> = {
  type: T;
};
export type StopFetchingAction<T> = {
  type: T;
  meta: any
};
export type SetDataAction<T, U> = {
  type: T;
  payload: U;
};
export type SetFetchingErrorAction<T, U = HttpError> = {
  type: T;
  error: U;
};
export type FetchAction<T, U = any> = {
  type: T;
  payload: U;
  ctx?: GetServerSidePropsContext,
  meta?: {thunk: boolean}
};
