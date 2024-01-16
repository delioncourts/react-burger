import { orderDetailsReducer, defaultState } from '../order-details';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  GET_ORDER_SUCCESS,
  UPDATE_ORDER_NUMBER,
  GET_CURRENT_ORDER_REQUEST,
  GET_CURRENT_ORDER_ERROR,
  GET_CURRENT_ORDER_SUCCESS,
} from '../../constant/const';
import { TEST_ORDER_NUMBER } from '../../../utils/test';

describe('check order details reducer', () => {
  test('should return the initial (default) state', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(defaultState);
  });

  test('should receive order request', () => {
    expect(orderDetailsReducer(defaultState, { type: GET_ORDER_REQUEST })).toEqual({
      ...defaultState,
      orderRequest: true,
      orderError: false,
    });
  });

  test('should successfully receive order', () => {
    expect(
      orderDetailsReducer(defaultState, {
        type: GET_ORDER_SUCCESS,
        orderNumber: TEST_ORDER_NUMBER,
      }),
    ).toEqual({
      ...defaultState,
      number: TEST_ORDER_NUMBER,
      orderRequest: false,
    });
  });

  test('should receive error in order', () => {
    expect(
      orderDetailsReducer(defaultState, {
        type: GET_ORDER_ERROR,
      }),
    ).toEqual({
      ...defaultState,
      orderError: true,
    });
  });

  test('should update order number', () => {
    expect(
      orderDetailsReducer(defaultState, {
        type: UPDATE_ORDER_NUMBER,
        orderNumber: TEST_ORDER_NUMBER,
      }),
    ).toEqual({
      ...defaultState,
      number: TEST_ORDER_NUMBER,
    });
  });

  test('should receive current order request', () => {
    expect(orderDetailsReducer(defaultState, { type: GET_CURRENT_ORDER_REQUEST })).toEqual({
      ...defaultState,
      orderError: false,
    });
  });

  test('should succesfully receive current order', () => {
    expect(
      orderDetailsReducer(defaultState, { type: GET_CURRENT_ORDER_SUCCESS, orders: { id: 1 } }),
    ).toEqual({
      ...defaultState,
      orderByNumber: { id: 1 },
    });
  });

  test('should receive error in current order', () => {
    expect(
      orderDetailsReducer(defaultState, {
        type: GET_CURRENT_ORDER_ERROR,
      }),
    ).toEqual({
      ...defaultState,
      orderError: true,
    });
  });
});
