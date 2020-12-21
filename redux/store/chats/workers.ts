import {FetchChatsAction, SetSelectedChatAction} from "./types/actions";
import {RequestMethod, sendRequest} from "../../utils/request";
import API from "../../../constants/api";
import {startLoading, stopLoading, setData, setError} from './actions';

export function* getChats({payload: {searchQuery}, ctx, meta}: FetchChatsAction) {
  console.log('fetch chats');
  yield sendRequest(
    {
      method: RequestMethod.POST,
      url: API.CHATS,
      ctx,
      meta
    },
    {
      startFetchingAction: startLoading,
      stopFetchingAction: stopLoading,
      setDataAction: setData,
      setFetchingErrorAction: setError
  });
  console.log('end fetch chats');
}
