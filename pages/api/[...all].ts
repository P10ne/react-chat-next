import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
}

export default createProxyMiddleware({
  target: 'http://172.16.3.13:4000/',
  changeOrigin: true
});
