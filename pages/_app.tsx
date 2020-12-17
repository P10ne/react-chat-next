import 'antd/dist/antd.min.css';
import '../styles/globals.css';
import {wrapper} from "../redux";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
