import {FC} from "react";
import {Form, Input, Card, Button} from 'antd';
import {useDispatch} from "react-redux";
import {fetchLogin} from "../../redux/store/auth/actions";

type LoginFormProps = {};
type LoginFormData = {login: string; password: string;}

const LoginForm: FC<LoginFormProps> = () => {
  const dispatch = useDispatch();

  const onFinish = (loginFormData: LoginFormData) => {
    dispatch(fetchLogin(loginFormData));
  };

  return (
    <Card>
      <Form
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{}}
        onFinish={onFinish}
      >
        <Form.Item
          label='Логин:'
          name='login'
          rules={[
            {
              required: true,
              message: 'Обязательное поле'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Пароль:'
          name='password'
          rules={[
            {
              required: true,
              message: 'Обязательное поле'
            }
          ]}
        >
          <Input type='password' />
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type='primary' htmlType='submit'>Войти</Button>
        </Form.Item>
      </Form>
    </Card>
  )
};

export default LoginForm;
