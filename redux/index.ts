import { createStore, applyMiddleware } from "redux";
import { createWrapper } from 'next-redux-wrapper';

import {rootReducer} from './store';
import sagaMiddleware, {rootSaga} from "./middlewares/saga";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = (context) => {
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

  // @ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

export const wrapper = createWrapper(makeStore, { debug: false })
