import {AccessToken} from "./AccessToken";
import {RefreshToken} from "./RefreshToken";

export type Tokens = {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
