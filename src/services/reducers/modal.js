import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from '../actions/modal';

const defaultState = {
  currentIngredient: null,
  isOpen: false,
};

export const modalIngredientsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_VIEWED_INGREDIENT: {
      return { ...state, isOpen: true, currentIngredient: action.currentIngredient };
    }
    case REMOVE_VIEWED_INGREDIENT: {
      return { ...state, isOpen: false, currentIngredient: null };
    }
    default: {
      return state;
    }
  }
};
