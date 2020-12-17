import {User} from "../../types/User";
import {ActionType, ProfileActionTypes} from "./types/actions";
import {Status} from "../../types/Status";
import {HYDRATE} from "next-redux-wrapper";

export type ProfileData = User | null;
type ProfileState = Status & {
  data: ProfileData;
};

const initialState: ProfileState =  {
  loading: false,
  error: null,
  data: null
}

export default function(state: ProfileState = initialState, action: ProfileActionTypes): ProfileState {
  switch(action.type) {
    // @ts-ignore
    case HYDRATE:
      console.log('HYDRATE');
      return {
        ...state,
        // @ts-ignore
        ...action.payload.profile
      };
    case ActionType.START_LOADING:
      return {
        ...state,
        loading: true
      };
    case ActionType.STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    case ActionType.SET_DATA:
      return {
        ...state,
        data: action.payload
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.error
      };
    default: return state;
  }
}
