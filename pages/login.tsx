import {FC, useEffect} from "react";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/LoginForm";
import {useSelector} from "react-redux";
import {isLoginedSelector} from "../redux/store/auth/selectors";
import ROUTES from "../constants/routes";
import {useRouter} from "next/router";

type LoginPageProps = {};

const LoginPage: FC<LoginPageProps> = () => {
  const isLogined = useSelector(isLoginedSelector);
  const history = useRouter();

  useEffect(() => {
    if (isLogined) {
      history.replace(ROUTES.MAIN_PATH);
    }
  }, [isLogined]);

  return (
    <Layout type='form'>
      <LoginForm />
      </Layout>
  )
};

export default LoginPage;
