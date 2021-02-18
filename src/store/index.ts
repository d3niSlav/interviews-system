import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers';
import history from '../shared/history';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routerMiddleware = createRouterMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(routerMiddleware, sagaMiddleware)));

export default store;
