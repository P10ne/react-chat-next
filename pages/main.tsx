import {FC, useEffect} from "react";
import {END} from 'redux-saga';
import Link from 'next/link';
import {Row, Col, Card, Input} from 'antd';
import {block} from 'bem-cn';
import Layout from "../components/Layout/Layout";
// import './Main.scss';
import Chat from "../components/Chat";
import ChatSubheader from "../components/ChatSubheader";
import UsersList from "../components/UsersList";
import MessageInput from "../components/MessageInput";
import {useDispatch, useSelector} from "react-redux";
import {fetchChats} from "../redux/store/chats/actions";
import {activeChatSelector, chatsSelector} from "../redux/store/chats/selectors";
import {wrapper} from "../redux";
import {getAccessToken, getRefreshToken} from "../redux/utils/tokens";
import {getTokensFromCookie} from "../redux/utils/getTokensFromCookie";
import {connectSocket} from "../redux/store/socket/actions";

type MainPageProps = {};

const cn = block('MainPage');

const MainPage: FC<MainPageProps> = () => {
  const dispatch = useDispatch();
  const chats = useSelector(chatsSelector);
  const activeChat = useSelector(activeChatSelector);

  useEffect(() => {
    dispatch(connectSocket());
  }, [dispatch]);

  useEffect(() => {
    if (!chats) {
      dispatch(fetchChats());
    }
  }, [dispatch]);

  return (
    <Layout>
      <Card>
        <Row gutter={[30, 5]}>
          <Col span={8}>
            <Row>
              <Col flex='auto'>
                <div className={cn('col-header')}>
                  <Input.Search allowClear={true} style={{width: '100%'}} />
                </div>
              </Col>
            </Row>
            <Row>
              <Col flex='auto'>
                <UsersList/>
              </Col>
            </Row>
          </Col>
          {
            activeChat &&
            <Col span={16}>
              <Row>
                <Col flex='auto'>
                  <div className={cn('col-header')}>
                    <ChatSubheader title={activeChat.name} subTitle='meta'/>
                  </div>
                </Col>
              </Row>
              <Row gutter={[0, 15]}>
                <Col flex='auto'>
                  <Chat />
                </Col>
              </Row>
              <Row>
                <Col flex='auto'>
                  <MessageInput/>
                </Col>
              </Row>
            </Col>
          }
        </Row>
      </Card>
    </Layout>
  )
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const {store} = ctx;
  // @ts-ignore
  await store.dispatch(fetchChats({ctx}));
});

export default MainPage;
