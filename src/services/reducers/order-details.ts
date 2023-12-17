//Получение и обновление номера заказа в модальном окне OrderDetails.

import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_NUMBER,
} from '../constant/const';

import { TOrderActions } from '../actions/order-details';
import { TIngredient } from '../../utils/types';
import { TOrderFeed } from '../../utils/types';

type TOrderState = {
 //isOpen?: boolean;
  ingredients:  TOrderFeed;
  number: number | undefined | null;
  orderRequest: boolean;
  orderError: boolean;
  orderByNumber: TOrderFeed;
}

const defaultState:TOrderState = {
  ingredients: {} as TOrderFeed,
  number: null,
  orderRequest: false,
  orderError: false,
  orderByNumber: {} as TOrderFeed,
};

export const orderDetailsReducer = (state = defaultState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderError: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        number: action.orderNumber,
        orderByNumber:  action.orders,
        orderRequest: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...defaultState,
        orderError: true,
      };
    }
    case UPDATE_ORDER_NUMBER: {
      return {
        ...state,
        number: action.orderNumber,
      };
    }
    default: {
      return state;
    }
  }
};
