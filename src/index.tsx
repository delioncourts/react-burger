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

import {
  IWSFeedConnectionClosed as FeedClose,
  IWSFeedConnectionSendMessage as FeedSendMessage,
  IWSFeedConnectionError as FeedError,
  IWSFeedConnectionStart as FeedConnect,
  IWSFeedConnectionSuccess as FeedSuccess
} from './services/actions/ws-feed';

import {
  IWSOrdersConnectionClosed as OrderClose,
  IWSOrdersConnectionError as OrderError,
  IWSOrdersConnectionSendMessage as OrderSendMessage,
  IWSOrdersConnectionStart as OrderConnect,
  IWSOrdersConnectionSuccess as OrderSuccess
} from './services/actions/ws-actions';
const wsFeed = {
  wsConnect: FeedConnect,
  //wsDisconnect: FeedDisconnect,
  onOpen: FeedSuccess,
  onClose: FeedClose,
  onError: FeedError,
  onMessage: FeedSendMessage,
}

const wsOrder = {
  wsConnect: OrderConnect,
  //wsDisconnect: OrderDisconnect,
  onOpen: OrderSuccess,
  onClose: OrderClose,
  onError: OrderError,
  onMessage: OrderSendMessage,
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