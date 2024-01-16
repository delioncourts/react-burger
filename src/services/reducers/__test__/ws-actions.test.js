import { wsOrdersReducer, defaultState } from '../ws-actions';
import {
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_SEND_MESSAGE,
} from '../../actions/ws-actions';
import { TEST_WS_ORDER } from '../../../utils/test';

describe('check web socket orders actions  reducer', () => {
  test('should return the initial (default) state', () => {
    expect(wsOrdersReducer(undefined, {})).toEqual(defaultState);
  });

  test('should start web socket connection', () => {
    expect(wsOrdersReducer(defaultState, { type: WS_ORDERS_CONNECTION_START })).toEqual({
      ...defaultState,
      wsConnecting: true,
    });
  });

  test('should succesfully connect web socket', () => {
    expect(wsOrdersReducer(defaultState, { type: WS_ORDERS_CONNECTION_SUCCESS })).toEqual({
      ...defaultState,
      wsConnecting: false,
      wsConnected: true,
    });
  });

  test('should through error in web socket', () => {
    expect(
      wsOrdersReducer(defaultState, {
        type: WS_ORDERS_CONNECTION_ERROR,
        payload: 'Connection error',
      }),
    ).toEqual({
      ...defaultState,
      error: 'Connection error',
    });
  });

  test('should close web socket connection', () => {
    expect(wsOrdersReducer(defaultState, { type: WS_ORDERS_CONNECTION_CLOSED })).toEqual({
      ...defaultState,
      wsConnected: false,
      wsConnecting: false,
    });
  });

  test('should send web socket message', () => {
    expect(
      wsOrdersReducer(defaultState, { type: WS_ORDERS_SEND_MESSAGE, payload: TEST_WS_ORDER }),
    ).toEqual({
      ...defaultState,
      orders: TEST_WS_ORDER,
    });
  });
});
