//Получение списка ингредиентов от API.

import { loadIngredients } from '../../utils/api';

import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_ERROR, GET_INGREDIENTS_SUCCESS } from '../constant/const';

export function getIngregients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    loadIngredients()
      .then((res) => {
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
  };
}
