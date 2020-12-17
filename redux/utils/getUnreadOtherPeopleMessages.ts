import {Messages} from "../store/messages/types/Messages";

export const getUnreadOtherPeopleMessages = (messages: Messages, userId: number): Messages | null => {
  const result = messages.filter(message => {
    return message.user.id !== userId && !(message.status.read && message.status.read.includes(userId));
  });
  return result.length > 0
    ? result
    : null;
};
