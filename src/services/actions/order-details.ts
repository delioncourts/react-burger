//Получение и обновление номера заказа в модальном окне OrderDetails.
import { createOrderRequest } from '../../utils/api';
import { TIngredientFull } from '../../utils/types';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_NUMBER
} from '../constant/const';
import { AppThunk } from '../../index';
import { AppDispatch } from '../../index';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderErrorAction {
  readonly type: typeof GET_ORDER_ERROR;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: number
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
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_ERROR,
        });
      });

}

export type TOrderActions = IGetOrderRequestAction | IGetOrderErrorAction | IGetOrderSuccessAction | IUpdateOrderNumber;