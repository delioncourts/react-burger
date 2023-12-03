import { TOrderFeed } from "../../utils/types";

export type TOrderResponse = {
    success: boolean;
    orders: Array<TOrderFeed>;
    total: number;
    totalToday: number;
};

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';

export interface IWSFeedConnectionStart {
    readonly type: typeof WS_FEED_CONNECTION_START;
}

export interface IWSFeedConnectionClosed {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWSFeedConnectionSuccess {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

//payload https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
export interface IWSFeedConnectionError {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
    payload: MessageEvent
}

export interface IWSFeedConnectionSendMessage {
    readonly type: typeof WS_FEED_SEND_MESSAGE;
    readonly payload: TOrderResponse;
}

export type TWSFeed = IWSFeedConnectionStart | IWSFeedConnectionClosed | IWSFeedConnectionSuccess | IWSFeedConnectionSendMessage | IWSFeedConnectionError;
