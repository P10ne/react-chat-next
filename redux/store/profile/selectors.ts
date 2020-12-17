import {RootState} from "../index";
import {ProfileData} from "./reducer";

export const profileDataSelector = (state: RootState): ProfileData => state.profile.data;
