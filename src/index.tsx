import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit'

import './index.css';

import App from './components/app/app';
import { rootReducer } from './services/reducers/rootreducer';

import { enhancer } from './utils/utils';

//const store = createStore(rootReducer, enhancer);
const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);