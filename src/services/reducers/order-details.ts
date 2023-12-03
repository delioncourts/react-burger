//Получение и обновление номера заказа в модальном окне OrderDetails.

import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_NUMBER,
} from '../constant/const';

const defaultState = {
  number: null,
  orderRequest: false,
  orderError: false,
};

export const orderDetailsReducer = (state = defaultState, action: { type: any; orderNumber: number; }) => {
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