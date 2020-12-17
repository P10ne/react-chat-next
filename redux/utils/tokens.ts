import {AccessToken} from "../types/AccessToken";
import {LOCAL_STORAGE_KEYS} from "../../constants/localStorageKeys";
import {RefreshToken} from "../types/RefreshToken";
import {Cookies} from 'react-cookie';

const cookies = new Cookies();

export function getAccessToken(): AccessToken {
  const stringTokenObject = cookies.get(LOCAL_STORAGE_KEYS.accessToken);
  try {
    if (stringTokenObject) {
      const token: AccessToken = stringTokenObject;
      return token;
    }
    return {
      expiresAt: 0,
      token: ''
    }
  } catch (e) {
    // todo Обработка ошибки получения токена
    console.error('Ошибка при получении токена из localStorage');
    return {
      expiresAt: 0,
      token: ''
    }
  }
}
export function setAccessToken(token: AccessToken): void {
  cookies.set(LOCAL_STORAGE_KEYS.accessToken, token);
}
export function getRefreshToken(): string {
  const token = cookies.get(LOCAL_STORAGE_KEYS.refreshToken);
  return token || '';
}
export function setRefreshToken(token: RefreshToken): void {
  cookies.set(LOCAL_STORAGE_KEYS.refreshToken, token);
}

export function clearTokens(): void {
  cookies.remove(LOCAL_STORAGE_KEYS.accessToken);
  cookies.remove(LOCAL_STORAGE_KEYS.refreshToken);
}
