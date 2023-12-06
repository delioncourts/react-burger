import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider, TypedUseSelectorHook } from "react-redux";
import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';

import './index.css';

import App from './components/app/app';
import { rootReducer } from './services/reducers/rootreducer';
import { TBurgerConstructorActions } from './services/actions/burger-constructor';
import { TGetIngredientsActions } from './services/actions/burger-ingredients';
import { TOrderActions } from './services/actions/order-details';
import { TWSOrders } from './services/actions/ws-actions';
import { TWSFeed } from './services/actions/ws-feed';
import { TAuthActions } from './services/actions/auth';
import { socketMiddleware } from './services/middleware/socket-middleware';
//import { TwsActionTypes } from './services/middleware/socket-middleware';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_SEND_MESSAGE
} from './services/actions/ws-feed';

import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_SEND_MESSAGE
} from './services/actions/ws-actions';

export type TWActionsTypes = {
  wsConnect: typeof WS_FEED_CONNECTION_SUCCESS | typeof WS_ORDERS_CONNECTION_SUCCESS,
  onOpen: typeof WS_FEED_CONNECTION_START | typeof WS_ORDERS_CONNECTION_START,
  onClose: typeof WS_FEED_CONNECTION_CLOSED | typeof WS_ORDERS_CONNECTION_CLOSED,
  onError: typeof WS_FEED_CONNECTION_ERROR | typeof WS_ORDERS_CONNECTION_ERROR,
  onMessage: typeof WS_FEED_SEND_MESSAGE | typeof WS_ORDERS_SEND_MESSAGE;
}

const wsFeed: TWActionsTypes = {
  //wsConnecting: WS_FEED_CONNECTION_START,
  wsConnect: WS_FEED_CONNECTION_SUCCESS,
  //wsDisconnect: WS_FEED_CONNECTION_CLOSED,
  onOpen: WS_FEED_CONNECTION_START,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_SEND_MESSAGE,
}

const wsOrder: TWActionsTypes = {
  //wsConnecting: WS_FEED_CONNECTION_START,
  wsConnect: WS_ORDERS_CONNECTION_SUCCESS,
  //wsDisconnect: WS_FEED_CONNECTION_CLOSED,
  onOpen: WS_ORDERS_CONNECTION_START,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ORDERS_SEND_MESSAGE,
}

const orderMiddleware = socketMiddleware(wsFeed);
const feedMiddleware = socketMiddleware(wsOrder);

//в configureStore devTools дефолтно true
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(orderMiddleware, feedMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>;

//Dispatch & Selector
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
//export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type TAppActions = TBurgerConstructorActions | TGetIngredientsActions | TOrderActions | TWSOrders | TWSFeed | TAuthActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//BrowserRouter должен быть выше React.StrictMode иначе могут появиться ошибки
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);