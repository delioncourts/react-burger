//редьюсер должен быть чистой функцией

import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../constant/const';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TIngredient } from '../../utils/types';

type TConstructorState = {
  buns: TIngredient | undefined | null; 
  otherItems: TIngredient[],
}

const defaultState:TConstructorState = {
  buns: undefined,
  otherItems: [],
};

export const burgerConstructorReducer = (state = defaultState, action: TBurgerConstructorActions): TConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.item.type === "bun") {
        return {
          ...state,
          buns: action.item,
        };
      } else {
        return {
          ...state,
          otherItems: [...state.otherItems].concat(action.item)
        };
      }
    }

    case REMOVE_INGREDIENT: {
      const itemIndex = state.otherItems.indexOf(action.item);
      const doubleItems = state.otherItems.slice();
      doubleItems.splice(itemIndex, 1);
      return {
        ...state,
        otherItems: doubleItems,
      };
    }

    case MOVE_INGREDIENT: {
      const ingredientsToMove = [...state.otherItems];
      ingredientsToMove.splice(action.dragIndex, 0, ingredientsToMove.splice(action.hoverIndex, 1)[0]);
      return {
        ...state,
        otherItems: [...ingredientsToMove],
      };
    }
    default:
      return state;
  }
};