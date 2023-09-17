//Получение и обновление номера заказа в модальном окне OrderDetails.

import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_ERROR,
  SEND_ORDER_SUCCESS,
  UPDATE_ORDER_NUMBER,
} from '../actions/order-details';

const initialState = {
  orderNumber: 0,
  orderRequest: false,
  orderError: false,
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderError: false,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.order.number,
        orderRequest: false,
      };
    }
    case SEND_ORDER_ERROR: {
      return {
        ...initialState,
        orderError: true,
      };
    }
    case UPDATE_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: action.order.number,
      };
    }
    default: {
      return state;
    }
  }
};
