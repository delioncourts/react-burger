import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from '../actions/modal';

const initialState = {
  currentIngredient: null,
  isOpen: false,
};
export const modalIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIEWED_INGREDIENT: {
      return { ...state, isOpen: true, currentIngredient: action.item };
    }
    case REMOVE_VIEWED_INGREDIENTL: {
      return { ...state, isOpen: false, currentIngredient: null };
    }
    default: {
      return state;
    }
  }
};
export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload,
      };
    }
    case DELETE_INGREDIENTS_DETAILS: {
      return {
        ...state,
        ingredientDetails: null,
      };
    }
    default:
      return state;
  }
};
