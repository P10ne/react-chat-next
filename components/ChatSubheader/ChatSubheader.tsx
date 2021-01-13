import {FC} from "react";
import {PageHeader as AntdPageHeader} from 'antd';
import {block} from 'bem-cn';
import {useSelector} from "react-redux";
import {activeChatSelector} from "../../redux/store/chats/selectors";
import styled from "styled-components";

type ChatSubheaderProps = {
  title: string;
  subTitle: string;
};

const StyledChatSubheader = styled(AntdPageHeader)`
  padding-left: 0;
  padding-top: 0;
  .ant-page-header {
    padding-left: 0;
    &-heading {
      &-left {
        flex-direction: column;
        align-items: flex-start;
      }
      &-title {
        font-size: 18px;
        line-height: 24px;
      }
      &-sub-title {
        font-size: 13px;
        line-height: 14px;
      }
    }
  }
`;

const ChatSubheader: FC<ChatSubheaderProps> = (props) => {
  const activeChat = useSelector(activeChatSelector);
  return (
    <StyledChatSubheader
      {...props}
    />
  )
};

export default ChatSubheader;
