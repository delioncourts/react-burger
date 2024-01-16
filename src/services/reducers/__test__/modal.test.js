import { modalIngredientsReducer, defaultState } from '../modal';
import { GET_VIEWED_INGREDIENT, REMOVE_VIEWED_INGREDIENT } from '../../constant/const';
import { TEST_BUN_1 } from '../../../utils/test';

describe('check modal reducer', () => {
  test('should return the initial (default) state', () => {
    expect(modalIngredientsReducer(undefined, {})).toEqual(defaultState);
  });

  test('should show current ingredient (bun) in modal', () => {
    expect(
      modalIngredientsReducer(defaultState, {
        type: GET_VIEWED_INGREDIENT,
        currentIngredient: TEST_BUN_1,
        isOpen: true,
      }),
    ).toEqual({ ...defaultState, currentIngredient: TEST_BUN_1, isOpen: true });
  });

  test('should remove current ingredient in modal', () => {
    expect(
      modalIngredientsReducer(defaultState, {
        type: REMOVE_VIEWED_INGREDIENT,
        currentIngredient: null,
        isOpen: false,
      }),
    ).toEqual({ ...defaultState, currentIngredient: null, isOpen: false });
  });
});
