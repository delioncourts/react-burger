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
//в configureStore devTools дефолтно true
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof rootReducer>;

//Dispatch & Selector
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
//export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type TAppActions = TBurgerConstructorActions |  TGetIngredientsActions | TOrderActions;

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