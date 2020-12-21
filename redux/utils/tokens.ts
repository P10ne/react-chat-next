import {AccessToken} from "../types/AccessToken";
import {LOCAL_STORAGE_KEYS} from "../../constants/localStorageKeys";
import {RefreshToken} from "../types/RefreshToken";
import {Cookies as ReactCookies} from 'react-cookie';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import {GetServerSidePropsContext} from "next-redux-wrapper";

const reactCookies = new ReactCookies();

export function getAccessToken(ctx: GetServerSidePropsContext | undefined): AccessToken {
  if (ctx) {
    const cookies = parseCookies(ctx);
    const tokenObj = cookies?.accessToken && JSON.parse(cookies.accessToken);
    return tokenObj;
  } else {
    const stringTokenObject = reactCookies.get(LOCAL_STORAGE_KEYS.accessToken);
    return stringTokenObject;
  }
}
export function setAccessToken(ctx: GetServerSidePropsContext | undefined, token: AccessToken): void {
  setCookie(ctx, LOCAL_STORAGE_KEYS.accessToken, JSON.stringify(token), {
    maxAge: 15 * 60,
    path: '/'
  });
}
export function getRefreshToken(ctx: GetServerSidePropsContext | undefined): string {
  if (ctx) {
    const cookies = parseCookies(ctx);
    const refreshToken = cookies?.refreshToken;
    return refreshToken;
  } else {
    const token = reactCookies.get(LOCAL_STORAGE_KEYS.refreshToken);
    return token || '';
  }
}
export function setRefreshToken(ctx: GetServerSidePropsContext | undefined, token: RefreshToken): void {
  setCookie(ctx, LOCAL_STORAGE_KEYS.refreshToken, token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/'
  });
}

export function clearTokens(): void {
  reactCookies.remove(LOCAL_STORAGE_KEYS.accessToken);
  reactCookies.remove(LOCAL_STORAGE_KEYS.refreshToken);
}
