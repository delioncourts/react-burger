//Получение и обновление номера заказа в модальном окне OrderDetails.

import {SEND_ORDER_REQUEST, SEND_ORDER_ERROR, SEND_ORDER_SUCCESS, UPDATE_ORDER_NUMBER } from '../actions/order-details';

const initialState = {
    orderNumber: 0,
    orderRequest: false,
    orderError: false,
};