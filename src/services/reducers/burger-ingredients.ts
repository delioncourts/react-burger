import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from '../constant/const';

import { TGetIngredientsActions } from '../actions/burger-ingredients';
import { TIngredient } from '../../utils/types';

type TIngredientState = {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
  ingredientsError: boolean;
}

const defaultState: TIngredientState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsError: false,
};

export const burgerIngredientsReducer = (state = defaultState, action: TGetIngredientsActions): TIngredientState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsError: false,
      };
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        //сбрасываем состояние до начального чтобы пользователь не работал с устаревшими данными
        ingredients: [],
        ingredientsRequest: false,
        ingredientsError: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
