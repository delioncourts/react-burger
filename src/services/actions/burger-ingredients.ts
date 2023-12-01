//Получение списка ингредиентов от API.

import { loadIngredients } from '../../utils/api';
import { AppThunk, AppDispatch } from '../../index';
import { TIngredient } from '../../utils/types';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS
} from '../constant/const';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}

export const getIngregients = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_INGREDIENTS_REQUEST,
  });
  loadIngredients()
    .then((res:any) => {
      if (res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
        });
      } else {
        Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_INGREDIENTS_ERROR,
      });
    });
}

export type TGetIngredientsActions = IGetIngredientsRequestAction | IGetIngredientsErrorAction | IGetIngredientsSuccessAction;