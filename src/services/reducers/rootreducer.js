import { combineReducers } from "redux";
import { modalIngredientsReducer } from "./modal";

export const rootReducer = combineReducers({
modal: modalIngredientsReducer,
});