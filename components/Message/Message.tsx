import {FC} from "react";
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {CheckOutlined, CheckCircleOutlined, FieldTimeOutlined} from "@ant-design/icons";
import {MessageContent, MessageType} from "../../redux/store/messages/types/Message";
import TextMessage from "./content/TextMessage/TextMessage";
import {User} from "../../redux/types/User";
import styled from "styled-components";

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

const MetaInfo = styled.div`
  display: flex;
`;

const StyledMessage = styled.div<{
  own?: boolean;
}>`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0 7px;
  & + & {
    margin-top: 8px;
  }
  ${({own}) => own && `
    flex-direction: row-reverse;
    ${MetaInfo} {
      justify-content: flex-end;
    }
  `}
`;

const Content = styled.span<{
  userSpace?: boolean;
}>`
  border: 1px solid #efefef;
  padding: 5px 8px;
  border-radius: 10px;
  ${({userSpace}) => userSpace && `
    margin-left: 39px;
  `}
`;

const UserIcon = styled.span`
  & + ${Content} {
    margin-left: 7px;
  }
`;

const UserName = styled.span`
  display: block;
  font-weight: 500;
  line-height: 14px;
  color: #1890ff;
`;

const Date = styled.span`
  margin-right: 25px;
  font-weight: 300;
  font-size: 10px;
`;

const Status = styled.span`
  display: flex;
  align-items: center;
`;

const Message: FC<MessageProps> = ({content, status, date, isOwn, type, user, userSpace}) => {
  return (
    <StyledMessage own={isOwn}>
      {
        !isOwn && user &&
          <UserIcon>
            <Avatar icon={<UserOutlined/>} />
          </UserIcon>
      }
      <Content userSpace={userSpace}>
        {
          !isOwn && user &&
            <UserName>{user.login}</UserName>
        }
        {type === "message" &&
          <TextMessage text={content.text}/>
        }
        <MetaInfo>
          <Date>{date}</Date>
          {
            isOwn &&
              <Status>
                {status === "sent" && <CheckOutlined />}
                {status === "read" && <CheckCircleOutlined/>}
                {status === "sending" && <FieldTimeOutlined />}
              </Status>
          }
        </MetaInfo>
      </Content>
    </StyledMessage>
  )
};

export default Message;
