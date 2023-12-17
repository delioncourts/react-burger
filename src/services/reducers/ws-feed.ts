import { TWSFeed } from "../actions/ws-feed";
import { TOrderFeed } from "../../utils/types";
import { WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS, WS_FEED_SEND_MESSAGE } from "../actions/ws-feed";

export type TOrderResponse = {
    success: boolean;
    orders: Array<TOrderFeed>;
    total: number;
    totalToday: number;

   // isOpen: boolean;
};

type TWSFeedState = {
    wsConnecting: boolean;
    wsConnected: boolean;
    orders?: TOrderResponse;
    error: MessageEvent | null;
}

const defaultState: TWSFeedState = {
    wsConnecting: false,
    wsConnected: false,
    orders: undefined,
    error: null,
  //  isOpen: false,
};

export const wsFeedReducer = (state = defaultState, action: TWSFeed):TWSFeedState => {
    switch (action.type) {
      case WS_FEED_CONNECTION_START: {
        return {
          ...state,
          wsConnecting: true,
        };
      }
      case WS_FEED_CONNECTION_SUCCESS: {
        return {
          ...state,
          wsConnecting: false,
          wsConnected: true,
        };
      }
      case WS_FEED_CONNECTION_ERROR: {
        return {
          ...state,
          error: action.payload,
        };
      }
      case WS_FEED_CONNECTION_CLOSED: {
        return {
          ...state,
          wsConnecting: false,
          wsConnected: false,
        };
      }
      case WS_FEED_SEND_MESSAGE: {
        return {
          ...state,
          orders: action.payload,
        };
      }
      default: {
        return state;
      }
    }
  };