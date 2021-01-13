import {generatePath} from 'react-router-dom';
import {cancelled} from 'redux-saga/effects';
import {FetchMessagesAction} from "./types/actions";
import {RequestMethod, sendRequest} from "../../utils/request";
import API from "../../../constants/api";
import {setData, setError, startLoading, stopLoading} from "./actions";

export function* getMessages({payload: {chatId}, meta}: FetchMessagesAction) {
  try {
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
  } finally {
    if (yield cancelled()) {
      // todo также отменять выполнение запроса
      stopLoading(meta);
    }
  }
}
