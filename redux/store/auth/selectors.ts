import {RootState} from "../index";

export const isLoginedSelector = (state: RootState): boolean => state.auth.data.isLogined;
export const isLoginCheckedSelector = (state: RootState): boolean => state.auth.data.isChecked;
