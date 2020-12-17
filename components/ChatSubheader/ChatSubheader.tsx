import {FC} from "react";
import {PageHeader as AntdPageHeader} from 'antd';
import {block} from 'bem-cn';
// import './ChatSubheader.scss';
import {useSelector} from "react-redux";
import {activeChatSelector} from "../../redux/store/chats/selectors";

type ChatSubheaderProps = {
  title: string;
  subTitle: string;
};
const cn = block('ChatSubheader');

const ChatSubheader: FC<ChatSubheaderProps> = (props) => {
  const activeChat = useSelector(activeChatSelector);
  return (
    <AntdPageHeader
      className={cn()}
      {...props}
    />
  )
};

export default ChatSubheader;
