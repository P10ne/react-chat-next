import {generatePath} from 'react-router-dom';
import {FetchMessagesAction} from "./types/actions";
import {RequestMethod, sendRequest} from "../../utils/request";
import API from "../../../constants/api";
import {setData, setError, startLoading, stopLoading} from "./actions";

export function* getMessages({payload: {chatId}}: FetchMessagesAction) {
  yield sendRequest(
    {
      method: RequestMethod.POST,
      // todo заглушка
      url: generatePath(API.MESSAGES, {chatId, 3000: ':3000'})
    },
    {
      startFetchingAction: startLoading,
      stopFetchingAction: stopLoading,
      setDataAction: setData,
      setFetchingErrorAction: setError
  });
}
