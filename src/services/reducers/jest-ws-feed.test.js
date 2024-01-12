import { wsFeedReducer, defaultState } from './ws-feed';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_SEND_MESSAGE,
} from '../actions/ws-feed';
import { TEST_WS_ORDER } from '../../utils/test';

describe('check web socket feed reducer', () => {
  test('should return the initial (default) state', () => {
    expect(wsFeedReducer(undefined, {})).toEqual(defaultState);
  });
});
