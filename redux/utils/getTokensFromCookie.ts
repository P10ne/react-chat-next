import {Tokens} from "../types/Tokens";
import {LOCAL_STORAGE_KEYS} from "../../constants/localStorageKeys";

export const getTokensFromCookie = (cookie: string): Tokens => {
  const cookies = cookie.split('; ');
  const refreshToken = (() => {
    const refreshTokenRow = cookies.find(c => c.match(new RegExp(`${LOCAL_STORAGE_KEYS.refreshToken}`)));
    const refreshToken = refreshTokenRow?.replace(`${LOCAL_STORAGE_KEYS.refreshToken}=`, '');
    return refreshToken
  })();
  const accessToken = (() => {
    const accessTokenRow = cookies.find(c => c.match(new RegExp(`${LOCAL_STORAGE_KEYS.accessToken}`)));
    const a = accessTokenRow?.replace(`${LOCAL_STORAGE_KEYS.accessToken}=`, '');
    return JSON.parse(decodeURIComponent(a!))
  })();
  return {
    refreshToken: refreshToken!,
    accessToken
  }
};
