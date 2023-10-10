import { v4 as uuidv4 } from 'uuid';

import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../actions/burger-constructor';

const defaultState = {
  buns: null,
  otherItems: [],
};

export const burgerConstructorReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      if (action.item.type === 'bun') {
        return {
          ...state,
          buns: state.buns
            ? state.buns._id === action.item._id
              ? state.buns
              : action.item
            : [...state.buns, action.item],
        };
      }
      return {
        ...state,
        otherItems: [
          ...state.otherItems,
          {
            ...action.item,
            uniqueId: uuidv4(),
          },
        ],
      };
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
      ingredientsToMove.splice(action.toIndex, 0, ingredientsToMove.splice(action.fromIndex, 1)[0]);
      return {
        ...state,
        otherItems: [...ingredientsToMove],
      };
    }
    default:
      return state;
  }
};
