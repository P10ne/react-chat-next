import {FC, SyntheticEvent} from "react";
import {Avatar} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {block} from 'bem-cn';
// import './UsersListItem.scss';

type UsersListItemProps = {
  avatarSrc?: string;
  name: string;
  unreadMessagesCount: number;
  selected?: boolean;
  children?: never;
  onClick?: (event: SyntheticEvent) => void;
};
const cn = block('UsersListItem');

const UsersListItem: FC<UsersListItemProps> = ({name, selected, onClick, unreadMessagesCount}) => {
  return (
    <div className={cn({selected})} onClick={(e) => onClick && onClick(e)}>
      <div className={cn('avatar')}>
        <Avatar icon={<UserOutlined/>} />
      </div>
      <div className={cn('info')}>
        <span className={cn('name')}>
          {name}
        </span>
        <span className={cn('meta')}>
          meta
        </span>
        {
          !selected && unreadMessagesCount > 0 &&
            <span className={cn('unread')}>
              {unreadMessagesCount}
            </span>
        }
      </div>
    </div>
  )
};

export default UsersListItem;
