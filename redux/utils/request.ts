import axios, {AxiosResponse} from 'axios';
import {put, putResolve, select} from 'redux-saga/effects';
import {AccessToken} from "../types/AccessToken";
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from "./tokens";
import API from "../../constants/api";
import {getFingerPrint} from "./fingerPrint";
import {RefreshToken} from "../types/RefreshToken";
import {logout} from "../store/auth/actions";
import {Tokens} from "../types/Tokens";
import {isLoginedSelector} from "../store/auth/selectors";
import {fetchProfile} from "../store/profile/actions";
import {NextApiRequest} from "next";
import {GetServerSidePropsContext} from "next-redux-wrapper";

// todo типизация методов, обработка ошибок

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

type RequestArgs = {
  method: RequestMethod,
  url: string;
  body?: Object;
  headers?: Object;
  ctx?: GetServerSidePropsContext,
  meta?: any
}
type ActionArgs = {
  startFetchingAction?: any,
  stopFetchingAction?: any,
  setDataAction: any,
  setFetchingErrorAction?: any
}

export function* sendRequest(requestArgs: RequestArgs, actionArgs: ActionArgs) {
  const isLogined = yield select(isLoginedSelector);
  console.log('isLogined: ', isLogined);
  const {method, url, body, headers, ctx, meta} = requestArgs;
  if (!isLogined) {
    yield putResolve(fetchProfile({ctx}));
  }
  const {startFetchingAction, stopFetchingAction, setDataAction} = actionArgs;
  if (startFetchingAction) {yield put(startFetchingAction())}
  try {
    const response = yield sendAuthorizedRequest({
      method,
      url,
      body,
      headers,
      ctx
    });
    yield put(setDataAction(response.data));
  } catch (e) {
    console.error('Request error');
  } finally {
    if (stopFetchingAction) {yield put(stopFetchingAction(meta))}
  }
}


/*
 tokens - передается при вызове метода из refresh - содержит новые токены
 */
export function* sendAuthorizedRequest(args: RequestArgs, tokens?: Tokens): any {

  function* refreshAndSend(refreshToken: RefreshToken, ctx?: GetServerSidePropsContext) {
    const tokens = yield refresh(ctx, refreshToken);
    if (tokens) {
      return yield sendAuthorizedRequest(args, tokens);
    }
  }

  const TIME_BEFORE_TOKEN_EXPIRED = 10000;
  const {method, url, body, headers, ctx} = args;
  const accessToken = tokens?.accessToken || getAccessToken(ctx);
  const refreshToken = tokens?.refreshToken || getRefreshToken(ctx);

  if (refreshToken) {
    if (!accessToken) {
      return yield refreshAndSend(refreshToken, ctx);
    } else {
      console.log('tokens: ', accessToken, refreshToken);
      const tokenExpiresAt = accessToken.expiresAt;
      const isTokenExpired = Date.now() > tokenExpiresAt - TIME_BEFORE_TOKEN_EXPIRED;
      console.log('expired', isTokenExpired);
      if (!isTokenExpired) {
        return yield makeRequest({
          method,
          url,
          body,
          // @ts-ignore
          headers: {
            ...headers,
            'Authorization': `Bearer ${accessToken.token}`
          }
        })
      } else {
        return yield refreshAndSend(refreshToken, ctx);
      }
    }
  } else {
    return yield refreshAndSend(refreshToken, ctx);
  }
}

export async function sendUnauthorizedRequest(args: RequestArgs) {
  return await makeRequest(args);
}

async function makeRequest(args: RequestArgs) {
  const {method, url, body, headers} = args;
  console.log('some', args);
  const result = await axios.request({
    method,
    url,
    data: body,
    headers: {
      ...headers,
      'charset': 'utf-8',
    }
  }).catch(error => error.response);
  return result;
}

type RefreshResponse = {
  accessToken: AccessToken,
  refreshToken: RefreshToken
}

export function* refresh(ctx: GetServerSidePropsContext | undefined, refreshToken: RefreshToken) {
  const fingerPrint = yield getFingerPrint();
  const requestBody: {refreshToken: string, fingerPrint: string} = {
    refreshToken: refreshToken,
    fingerPrint
  };
  let response: AxiosResponse<RefreshResponse> | null = null;
  try {
    response = yield sendUnauthorizedRequest({
      method: RequestMethod.POST,
      url: API.LOGIN_REFRESH,
      body: requestBody
    });
  } catch (e) {console.error('refresh error: ', response);}

  const refreshResponse = response as AxiosResponse<RefreshResponse>;
  console.log('1');
  if (refreshResponse.status === 401) {
    console.log('2');
    yield put(logout());
    return null;
  } else {
    console.log('3');
    const {accessToken, refreshToken} = refreshResponse.data;
    setAccessToken(ctx, accessToken);
    setRefreshToken(ctx, refreshToken);
    return {
      accessToken,
      refreshToken
    };
  }
}

export const isRequestSuccess = (response: AxiosResponse): boolean => {
  return response.status === 200;
};
