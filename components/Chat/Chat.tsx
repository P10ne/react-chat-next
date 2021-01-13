import {FC, useEffect, useLayoutEffect, useRef} from "react";
import {Skeleton} from 'antd';
import {block} from 'bem-cn';
// import './Chat.scss;
import Message from "../Message";
import {useDispatch, useSelector} from "react-redux";
import {messagesSelector} from "../../redux/store/messages/selectors";
import {MessageContent} from "../../redux/store/messages/types/Message";
import {profileDataSelector} from "../../redux/store/profile/selectors";
import {MessageStatusProp} from "../Message/Message";
import {getUnreadOtherPeopleMessages} from "../../redux/utils/getUnreadOtherPeopleMessages";
import {readMessages} from "../../redux/store/socket/actions";
import {activeChatSelector} from "../../redux/store/chats/selectors";
import {resetUnreadCount} from "../../redux/store/chats/actions";
import {User} from "../../redux/types/User";
import styled from "styled-components";

type ChatProps = {};
type PreparedMessage = {
  id: number;
  type: 'message'
  content: MessageContent;
  isOwn: boolean;
  date: string;
  status: MessageStatusProp;
  user?: User,
  userSpace: boolean
}

const cn = block('Chat');

const StyledChat = styled.section`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 8px;
  overflow: auto;
  height: calc(100vh - 200px);
  padding: 8px 0;
`;

const Chat: FC<ChatProps> = () => {
  const {data, loading, error} = useSelector(messagesSelector);
  const profileData = useSelector(profileDataSelector);
  const activeChat = useSelector(activeChatSelector);
  const ref = useRef(null);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (ref && ref.current && data && data.length > 0) {
      // @ts-ignore
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, [data]);

  useEffect(() => {
    if (data && data.length > 0 && profileData && activeChat) {
      const unreadMessages = getUnreadOtherPeopleMessages(data, profileData.id);
      if (unreadMessages) {
        dispatch(readMessages({
          chatId: activeChat.id,
          messages: unreadMessages
        }));
        dispatch(resetUnreadCount({
          chatId: activeChat.id
        }));
      }
    }
  }, [data, profileData, activeChat, dispatch]);

  const preparedMessages: Array<PreparedMessage> = (() => {
    const resultMessages: Array<PreparedMessage> = [];
    let lastUser: User | null = null;
    data.forEach(message => {
      resultMessages.push({
        id: message.id || 0,
        status: (():MessageStatusProp => {
          if (message.status.sending) return "sending";
          if (message.status.sent) return "sent";
          if (message.status.read) return "read";
          return "read";
        })(),
        type: message.type,
        content: message.content,
        date: message.createdAt,
        isOwn: message.user.id === profileData?.id,
        user: activeChat?.isGroup && lastUser?.id !== message.user.id
          ? message.user
          : undefined,
        userSpace: !!activeChat?.isGroup
      });
      lastUser = message.user;
    });
    return resultMessages;
  })();

  const messagesNode =
    preparedMessages.map(message =>
      <Message
        {...message}
        key={message.id}
      />
    );

  const loadingNode =
    <>
      {new Array(5).fill(0).map((item, index) => <Skeleton active paragraph={{rows: 1, width: 100}} key={index} />)}
    </>;

  const errorNode = <p>Ошибка</p>;

  return (
    <StyledChat
      ref={ref}
    >
      {
        !loading && data
          ? messagesNode
          : !loading && error
          ? errorNode
          : loadingNode
      }
    </StyledChat>
  );
};

export default Chat;
