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
import { TwsActionTypes } from './services/middleware/socket-middleware';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_SEND_MESSAGE,
  WS_FEED_CONNECTION_DISCONNECT,
  
} from './services/actions/ws-feed';

import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_SEND_MESSAGE,
  WS_ORDERS_CONNECTION_DISCONNECT
} from './services/actions/ws-actions';

const wsFeed: TwsActionTypes = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  wsDisconnect: WS_FEED_CONNECTION_DISCONNECT,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_SEND_MESSAGE,
}

const wsOrder: TwsActionTypes = {
  wsInit: WS_ORDERS_CONNECTION_START,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  wsDisconnect: WS_ORDERS_CONNECTION_DISCONNECT,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onMessage: WS_ORDERS_SEND_MESSAGE,
}

const wsFeedUrl = "wss://norma.nomoreparties.space/orders/all";
const wsOrdersUrl = "wss://norma.nomoreparties.space/orders";

const feedMiddleware = socketMiddleware(wsFeedUrl, wsFeed, false);
const orderMiddleware = socketMiddleware(wsOrdersUrl, wsOrder, true);

//в configureStore devTools дефолтно true
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(orderMiddleware, feedMiddleware),
})

export type RootState = ReturnType<typeof rootReducer>;

//Dispatch & Selector
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
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