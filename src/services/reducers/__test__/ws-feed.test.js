import { wsFeedReducer, defaultState } from '../ws-feed';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_SEND_MESSAGE,
} from '../../actions/ws-feed';
import { TEST_WS_ORDER } from '../../../utils/test';

describe('check web socket feed reducer', () => {
  test('should return the initial (default) state', () => {
    expect(wsFeedReducer(undefined, {})).toEqual(defaultState);
  });

  test('should start web socket connection', () => {
    expect(wsFeedReducer(defaultState, { type: WS_FEED_CONNECTION_START })).toEqual({
      ...defaultState,
      wsConnecting: true,
    });
  });

  test('should succesfully connect web socket', () => {
    expect(wsFeedReducer(defaultState, { type: WS_FEED_CONNECTION_SUCCESS })).toEqual({
      ...defaultState,
      wsConnecting: false,
      wsConnected: true,
    });
  });

  test('should through error in web socket', () => {
    expect(
      wsFeedReducer(defaultState, {
        type: WS_FEED_CONNECTION_ERROR,
        payload: 'Connection error',
      }),
    ).toEqual({
      ...defaultState,
      error: 'Connection error',
    });
  });

  test('should close web socket connection', () => {
    expect(wsFeedReducer(defaultState, { type: WS_FEED_CONNECTION_CLOSED })).toEqual({
      ...defaultState,
      wsConnected: false,
      wsConnecting: false,
    });
  });

  test('should send web socket message', () => {
    expect(
      wsFeedReducer(defaultState, { type: WS_FEED_SEND_MESSAGE, payload: TEST_WS_ORDER }),
    ).toEqual({
      ...defaultState,
      orders: TEST_WS_ORDER,
    });
  });
});
