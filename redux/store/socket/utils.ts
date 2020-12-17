import {io, Socket} from "socket.io-client";
import API from "../../../constants/api";
import {eventChannel} from "redux-saga";
import {User} from "../../types/User";
import {ProfileData} from "../profile/reducer";

export function createWebSocketConnection(profileData: User) {
  const socket = io(API.SOCKETS, {
    transports: ['websocket'],
    query: {
      userId: profileData.id
    }
  });
  return socket;
}

export function createSocketChannel(socket: Socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const eventHandler = (event: any) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event)
      // console.log(event);
    };

    // setup the subscription
    socket.on('event', eventHandler);

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('ping', eventHandler)
    };

    return unsubscribe
  })
}
