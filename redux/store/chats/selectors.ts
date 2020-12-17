import {RootState} from "../index";
import {Chat} from "./types/Chat";
import {Chats} from "./types/Chats";
import {ChatsState} from "./reducer";

export const chatsSelector = (state: RootState): ChatsState => state.chats;
export const activeChatSelector = (state: RootState): Chat | null => state.chats.active;
