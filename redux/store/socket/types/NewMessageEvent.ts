import {Message} from "../../messages/types/Message";
import {Messages} from "../../messages/types/Messages";

export type NewMessageEvent = {
  chatId: number;
  message: Message;
}

export type ReadMessagesPayload = {chatId: number, messages: Messages};
