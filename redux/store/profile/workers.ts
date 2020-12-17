import {RequestMethod, sendRequest} from "../../utils/request";
import API from "../../../constants/api";
import {setData, setError, startLoading, stopLoading} from "./actions";

export function* getProfile() {
  return yield sendRequest(
    {
      method: RequestMethod.GET,
      url: API.PROFILE
    },
    {
      startFetchingAction: startLoading,
      stopFetchingAction: stopLoading,
      setDataAction: setData,
      setFetchingErrorAction: setError
    })
}
