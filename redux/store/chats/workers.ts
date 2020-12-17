import {FetchChatsAction, SetSelectedChatAction} from "./types/actions";
import {RequestMethod, sendRequest} from "../../utils/request";
import API from "../../../constants/api";
import {startLoading, stopLoading, setData, setError} from './actions';

export function* getChats({payload: {searchQuery}, tokens}: FetchChatsAction) {
  yield sendRequest(
    {
      method: RequestMethod.POST,
      url: API.CHATS,
      tokens
    },
    {
      startFetchingAction: startLoading,
      stopFetchingAction: stopLoading,
      setDataAction: setData,
      setFetchingErrorAction: setError
  });
}
