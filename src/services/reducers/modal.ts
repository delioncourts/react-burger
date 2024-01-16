import { TIngredient, TOrderFeed } from '../../utils/types';
import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from '../constant/const';
import { TModalActions } from '../actions/modal';

type TModalState = {
  type: any;
  currentIngredient: TIngredient[] | null;
  isOpen: boolean;
}

export const defaultState: TModalState = {
  currentIngredient: null,
  isOpen: false,
  type: undefined,
};

export const modalIngredientsReducer = (state = defaultState, action: TModalState):TModalActions => {
  switch (action.type) {
    case GET_VIEWED_INGREDIENT: {
      return { ...state, isOpen: true, currentIngredient: action.currentIngredient };
    }
    case REMOVE_VIEWED_INGREDIENT: {
      return { ...state, isOpen: false, currentIngredient: null};
    }
    default: {
      return state as any;
    }
  }
};
