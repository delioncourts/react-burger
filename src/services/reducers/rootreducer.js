import { combineReducers } from "redux";
import { modalIngredientsReducer } from "./modal";
import { orderDetailsReducer } from "./order-details";

export const rootReducer = combineReducers({
modal: modalIngredientsReducer,
order: orderDetailsReducer,
});