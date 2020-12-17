import {FC} from "react";
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {CheckOutlined, CheckCircleOutlined, FieldTimeOutlined} from "@ant-design/icons";
import {block} from 'bem-cn';

// import './Message.scss';
import {MessageContent, MessageType} from "../../redux/store/messages/types/Message";
import TextMessage from "./content/TextMessage/TextMessage";
import {User} from "../../redux/types/User";

const cn = block('Message');
export type MessageStatusProp = 'sending' | 'sent' | 'read';

type MessageProps = {
  content: MessageContent;
  date: string;
  status: MessageStatusProp;
  isOwn: boolean;
  type: MessageType,
  user?: User
  userSpace?: boolean
};

const Message: FC<MessageProps> = ({content, status, date, isOwn, type, user, userSpace}) => {
  return (
    <div className={cn( {own: isOwn})}>
      {
        !isOwn && user &&
          <span className={cn('user')}>
            <Avatar icon={<UserOutlined/>} />
          </span>
      }
      <span className={cn('content', {userspace: userSpace})}>
        {
          !isOwn && user &&
            <span className={cn('username')}>{user.login}</span>
        }
        {type === "message" &&
          <TextMessage text={content.text}/>
        }
        <div className={cn('metainfo')}>
          <small className={cn('date')}>{date}</small>
          {
            isOwn &&
              <span className={cn('status', {value: status})}>
                {status === "sent" && <CheckOutlined />}
                {status === "read" && <CheckCircleOutlined/>}
                {status === "sending" && <FieldTimeOutlined />}
              </span>
          }
        </div>
      </span>
    </div>
  )
};

export default Message;
