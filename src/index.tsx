import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit'

import './index.css';

import App from './components/app/app';
import { rootReducer } from './services/reducers/rootreducer';

//в configureStore devTools дефолтно true
const store = configureStore({
  reducer: rootReducer
})

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