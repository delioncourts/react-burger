import { burgerConstructorReducer, defaultState } from '../burger-constructor';
import { ADD_INGREDIENT, REMOVE_INGREDIENT, MOVE_INGREDIENT } from '../../constant/const';
import { TEST_BUN_1, TEST_BUN_2, TEST_SAUCE, TEST_MAIN } from '../../../utils/test';

describe('check burger constructor reducer', () => {
  test('should return the initial (default) state', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(defaultState);
  });

  test('should add buns in constructor', () => {
    expect(
      burgerConstructorReducer(defaultState, {
        type: ADD_INGREDIENT,
        item: TEST_BUN_1,
      }),
    ).toEqual({ ...defaultState, buns: TEST_BUN_1 });
  });

  test('should add mains in constructor', () => {
    expect(
      burgerConstructorReducer(defaultState, {
        type: ADD_INGREDIENT,
        item: TEST_MAIN,
      }),
    ).toEqual({ ...defaultState, otherItems: [TEST_MAIN] });
  });

  test('should add sauces in constructor', () => {
    expect(
      burgerConstructorReducer(defaultState, {
        type: ADD_INGREDIENT,
        item: TEST_SAUCE,
      }),
    ).toEqual({ ...defaultState, otherItems: [TEST_SAUCE] });
  });

  test('should change buns in constructor', () => {
    expect(
      burgerConstructorReducer(
        { otherItems: [], buns: TEST_BUN_1 },
        { type: ADD_INGREDIENT, item: TEST_BUN_2 },
      ),
    ).toEqual({ otherItems: [], buns: TEST_BUN_2 });
  });

  test('should move ingredients in constructor', () => {
    expect(
      burgerConstructorReducer(
        { otherItems: [TEST_MAIN, TEST_SAUCE], buns: {} },
        { type: MOVE_INGREDIENT, dragIndex: 0, hoverIndex: 1 },
      ),
    ).toEqual({ otherItems: [TEST_SAUCE, TEST_MAIN], buns: {} });
  });

  test('should remove ingredients in constructor', () => {
    expect(
      burgerConstructorReducer(
        { otherItems: [TEST_MAIN], buns: undefined },
        { type: REMOVE_INGREDIENT, item: TEST_MAIN },
      ),
    ).toEqual(defaultState);
  });
});
