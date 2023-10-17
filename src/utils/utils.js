//это для createStore
import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const enhancer = composeEnhancers(applyMiddleware(thunk));

//также была идея подключить Redux DevTools с помощью composeWithDevTools
//подключаем пакет: https://www.npmjs.com/package/@redux-devtools/extension
//импортируем: import { composeWithDevTools } from '@redux-devtools/extension';
//используем в store: createStore(rootReducer, composeWithDevTools());