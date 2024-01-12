import { burgerIngredientsReducer, defaultState } from './burger-ingredients';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_SUCCESS,
} from '../constant/const';
import { TEST_BUN, TEST_SAUCE, TEST_MAIN } from '../../utils/test';

describe('check burger ingredients reducer', () => {
  test('should return the initial (default) state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(defaultState);
  });

  test('should request burger ingredients', () => {
    expect(burgerIngredientsReducer(defaultState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ingredients: [],
      ingredientsRequest: true,
      ingredientsError: false,
    });
  });

  test('should recieve error in ingredients', () => {
    expect(burgerIngredientsReducer(defaultState, { type: GET_INGREDIENTS_ERROR })).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsError: true,
    });
  });

  test('should succesfully receive ingredients', () => {
    expect(
      burgerIngredientsReducer(defaultState, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: [TEST_BUN, TEST_SAUCE, TEST_MAIN],
      }),
    ).toEqual({
      ingredients: [TEST_BUN, TEST_SAUCE, TEST_MAIN],
      ingredientsRequest: false,
      ingredientsError: false,
    });
  });
});
