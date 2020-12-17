import {put, select} from 'redux-saga/effects';
import {appendMessage, markAsSent} from "../messages/actions";
import {NewMessageEvent, ReadMessagesPayload} from "./types/NewMessageEvent";
import {activeChatSelector} from "../chats/selectors";
import {ClientSocketEventTypes} from "./types/SocketEventTypes";
import {EmitSocketAction} from "./types/actions";
import {Socket} from "socket.io-client";
import {incrementUnreadCount} from "../chats/actions";
import {ClientSocketNewMessageEvent} from "./types/SocketEvents";
import {MarkAsSentActionPayload} from "../messages/types/actions";
import {Message} from "../messages/types/Message";

export function* outputEventsWorker(socket: Socket, event: EmitSocketAction) {
  switch(event.payload.type) {
    case ClientSocketEventTypes.NEW_MESSAGE:
      yield put(appendMessage(event.payload.payload.message));

      const payloadToSend = ((): ClientSocketNewMessageEvent => {
        const message = {...event.payload.payload.message};
        delete message.id;
        return {
          ...event.payload,
          payload: {
            ...event.payload.payload,
            message
          }
        };
      })();

      const m = yield new Promise((resolve, reject) => {
        socket.emit('event', payloadToSend, function successCallback(savedMessage: Message) {
          console.log(`Сообщение ${JSON.stringify(event.payload.payload)} доставлено`);
          resolve(savedMessage);
        });
      });

      // @ts-ignore
      yield put(markAsSent({editableId: event.payload.payload.message.id, message: m}));
      break;
    case ClientSocketEventTypes.READ_MESSAGES:
      socket.emit('event', event.payload);
      break;
  }
}

// Пришло новое сообщение
export function* takeMessage(message: NewMessageEvent) {
  const activeChat: ReturnType<typeof activeChatSelector> = yield select(activeChatSelector);
  yield put(incrementUnreadCount({chatId: message.chatId}));
  if (activeChat && activeChat.id === message.chatId) {
    console.log('append message put');
    yield put(appendMessage(message.message));
  }
  // yield put(appendMessage(message.message));
}

// Отмечает отправленные сообщения прочитанными
export function* markAsRead(event: ReadMessagesPayload) {

}
