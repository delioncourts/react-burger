//Получение и обновление номера заказа в модальном окне OrderDetails.

import { createOrderRequest } from '../../utils/api';

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_ERROR = "SEND_ORDER_ERROR";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";

//обновить номер заказа
export const UPDATE_ORDER_NUMBER = 'UPDATE_ORDER_NUMBER';

export function sendOrder(arr) {
    return function(dispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST
        });
        createOrderRequest(arr)
        .then(order => {
            if(order.success) {
                dispatch({
                    type: SEND_ORDER_SUCCESS,
                    orderNumber: order.order.number
                })
            }
            else{
                Promise.reject(`Произошла ошибка: ${order.status}`)
            }
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: SEND_ORDER_ERROR
            })
        });
    }
}


