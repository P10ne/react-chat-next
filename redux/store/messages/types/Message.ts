import {MessageStatus} from "./MessageStatus";
import {User} from "../../../types/User";

export type TextMessageContent = {text: string}
export type MessageContent = TextMessageContent;
export type MessageType = 'message'; // ...

export interface Message {
  id?: number;
  type: MessageType;
  content: MessageContent;
  createdAt: string;
  status: MessageStatus;
  user: User;
}
