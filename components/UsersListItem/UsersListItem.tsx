import {FC, SyntheticEvent} from "react";
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import styled from "styled-components";

type UsersListItemProps = {
  avatarSrc?: string;
  name: string;
  unreadMessagesCount: number;
  selected?: boolean;
  children?: never;
  onClick?: (event: SyntheticEvent) => void;
};

const ListItem = styled.div<{
  selected?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 5px;
  background-color: ${({selected}) => selected ? '#1890ff' : 'white'};
  ${({selected}) => !selected && `
    :hover {
      background-color: #efefef;
      cursor: pointer;
    }
  `}
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Meta = styled.span`
  color: gray;
`;

const Unread = styled.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: #1890ff;
  font-size: 14px;
  line-height: 14px;
  min-width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;


const UsersListItem: FC<UsersListItemProps> = ({name, selected, onClick, unreadMessagesCount}) => {
  return (
    <ListItem selected={selected} onClick={(e) => onClick && onClick(e)}>
        <Avatar icon={<UserOutlined/>} />
      <Info>
        <Name>{name}</Name>
        <Meta>meta</Meta>
        {
          !selected && unreadMessagesCount > 0 &&
            <Unread>{unreadMessagesCount}</Unread>
        }
      </Info>
    </ListItem>
  )
};

export default UsersListItem;
