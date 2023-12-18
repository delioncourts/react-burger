//Получение и обновление номера заказа в модальном окне OrderDetails.
import { createOrderRequest } from '../../utils/api';
import { TIngredientFull, TOrderFeed } from '../../utils/types';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_NUMBER
} from '../constant/const';
import { AppThunk } from '../../index';
import { AppDispatch } from '../../index';
import { getOrdersByNumber } from '../../utils/api';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderErrorAction {
  readonly type: typeof GET_ORDER_ERROR;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: number;

  orders: TOrderFeed
}

export interface IUpdateOrderNumber {
  readonly type: typeof UPDATE_ORDER_NUMBER;
  readonly orderNumber: number
}

export const sendOrder = (arr: TIngredientFull[]):AppThunk => (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    createOrderRequest(arr)
      .then((order) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderNumber: order.order.number,
        
          orders: order.order.orders,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_ERROR,
        });
      });

}

export const GET_CURRENT_ORDER_REQUEST: 'GET_CURRENT_ORDER_REQUEST' = 'GET_CURRENT_ORDER_REQUEST';
export const GET_CURRENT_ORDER_ERROR: 'GET_CURRENT__ORDER_ERROR' = 'GET_CURRENT__ORDER_ERROR';
export const GET_CURRENT_ORDER_SUCCESS: 'GET_CURRENT_ORDER_SUCCESS' = 'GET_CURRENT_ORDER_SUCCESS';

export interface IGetOrderCurrentRequestAction {
  readonly type: typeof GET_CURRENT_ORDER_REQUEST;
}

export interface IGetOrderCurrentErrorAction {
  readonly type: typeof GET_CURRENT_ORDER_ERROR;
}

export interface IGetOrderCurrentSuccessAction {
  readonly type: typeof GET_CURRENT_ORDER_SUCCESS;
  orders: TOrderFeed
}


export const getOrder = (number: string) => (dispatch: AppDispatch) => {
  dispatch(GET_CURRENT_ORDER_REQUEST);
  getOrdersByNumber(number)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_CURRENT_ORDER_SUCCESS,
            orders: res.orders[0],
          });
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => dispatch(GET_CURRENT_ORDER_ERROR));
}

export type TOrderActions = IGetOrderRequestAction | 
IGetOrderErrorAction | 
IGetOrderSuccessAction | 
IUpdateOrderNumber | 
IGetOrderCurrentRequestAction |
IGetOrderCurrentErrorAction |
IGetOrderCurrentSuccessAction;