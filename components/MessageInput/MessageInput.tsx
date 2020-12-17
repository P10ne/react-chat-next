import {FC} from "react";
import {Row, Col, Button, Form} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
import Textarea from "../Textarea";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../redux/store/socket/actions";
import {activeChatSelector} from "../../redux/store/chats/selectors";
import {profileDataSelector} from "../../redux/store/profile/selectors";

type MessageInputProps = {};

const MessageInput: FC<MessageInputProps> = () => {
  const activeChat = useSelector(activeChatSelector);
  const profileData = useSelector(profileDataSelector);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const sendHandler = () => {
    if (activeChat && profileData) {
      dispatch(sendMessage({
        chatId: activeChat.id,
        message: {
          id: Date.now(),
          status: {sending: true},
          type: "message",
          content: {text: form.getFieldsValue().message},
          createdAt: new Date().toISOString(),
          user: profileData
        }
      }));
      setTimeout(() => {
        form.setFieldsValue({
          message: ''
        })
      });
    }
  }

  return (
    <Form form={form} onFinish={sendHandler}>
      <Row gutter={[10, 15]}>
        <Col flex='auto'>
          <Form.Item
            name='message'
          >
            <Textarea
              autoSize={{ minRows: 1, maxRows: 3 }}
              onPressEnter={sendHandler}
            />
          </Form.Item>
        </Col>
        <Col flex='none'>
          <Button
            type="primary"
            htmlType="submit"
            icon={<ArrowRightOutlined/>}
          />
        </Col>
      </Row>
    </Form>
  )
};

export default MessageInput;
