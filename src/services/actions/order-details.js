//Получение и обновление номера заказа в модальном окне OrderDetails.

import { createOrderRequest } from '../../utils/api';

import { GET_ORDER_REQUEST, GET_ORDER_ERROR, GET_ORDER_SUCCESS, UPDATE_ORDER_NUMBER } from '../constant/const';

export function sendOrder(arr) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrderRequest(arr)
      .then((order) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: order.order.number,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ORDER_ERROR,
        });
      });
  };
}
