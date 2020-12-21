import {createStore, applyMiddleware, Middleware} from "redux";
import { createWrapper } from 'next-redux-wrapper';
import { middleware as thunkMiddleware } from 'redux-saga-thunk';

import {rootReducer} from './store';
import sagaMiddleware, {rootSaga} from "./middlewares/saga";

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
};

export const makeStore = () => {
  const store = createStore(rootReducer, bindMiddleware([thunkMiddleware, sagaMiddleware]));

  // @ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store
};

export const wrapper = createWrapper(makeStore, { debug: false })
