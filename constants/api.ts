const ROOT = 'http://localhost:3000/api';

const LOGIN = `${ROOT}/login`;
const LOGIN_LOGIN = `${LOGIN}/login`;
const LOGIN_REFRESH = `${LOGIN}/refresh`;

const USERS = `${ROOT}/users`;
const PROFILE = `${USERS}/me`;
const CHATS = `${ROOT}/chats`;
const MESSAGES = `${ROOT}/messages/chatId=:chatId`;

const SOCKETS = `http://localhost:4000`;

const API = {
  PROFILE,
  CHATS,
  MESSAGES,
  LOGIN_LOGIN,
  LOGIN_REFRESH,
  SOCKETS
};

export default API;
