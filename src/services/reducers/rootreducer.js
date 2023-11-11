import { combineReducers } from 'redux';
import { modalIngredientsReducer } from './modal';
import { orderDetailsReducer } from './order-details';
import { burgerIngredientsReducer } from './burger-ingredients';
import { burgerConstructorReducer } from './burger-constructor';
import { authReducer } from './auth';

//ключ-значение
export const rootReducer = combineReducers({
  modal: modalIngredientsReducer,
  order: orderDetailsReducer,
  ingredients: burgerIngredientsReducer,
  cart: burgerConstructorReducer,
  user: authReducer
});
