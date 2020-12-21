import {RequestMethod, sendAuthorizedRequest} from "../../utils/request";
import {put} from 'redux-saga/effects';
import {setData, startLoading, stopLoading} from "./actions";
import {FetchProfileAction} from "./types/actions";
import {API_ROUTE} from "next/dist/lib/constants";
import API from "../../../constants/api";
import {setAuthStatus} from "../auth/actions";

export function* getProfile({ctx, meta}: FetchProfileAction) {
  // return yield sendRequest(
  //   {
  //     method: RequestMethod.GET,
  //     url: API.PROFILE
  //   },
  //   {
  //     startFetchingAction: startLoading,
  //     stopFetchingAction: stopLoading,
  //     setDataAction: setData,
  //     setFetchingErrorAction: setError
  //   })
  console.log('fetch profile');
  yield put(startLoading());
  try {
    const response = yield sendAuthorizedRequest({
      method: RequestMethod.GET,
      url: API.PROFILE,
      ctx
    });
    yield put(setData(response.data));
    yield put(setAuthStatus({isLogined: true}));
  } catch (e) {
    console.error('get profile request error', e);
  } finally {
    yield put(stopLoading(meta));
    console.log('end fetch profile');
  }
}
