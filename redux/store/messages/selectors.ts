import {RootState} from "../index";
import {MessagesState} from "./reducer";

export const messagesSelector = (state: RootState): MessagesState => state.messages;
