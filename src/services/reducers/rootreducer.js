import { combineReducers } from 'redux';
import { modalIngredientsReducer } from './modal';
import { orderDetailsReducer } from './order-details';
import { burgerIngredientsReducer } from './burger-ingredients';

export const rootReducer = combineReducers({
  modal: modalIngredientsReducer,
  order: orderDetailsReducer,
  burgerIngredients: burgerIngredientsReducer,
});
