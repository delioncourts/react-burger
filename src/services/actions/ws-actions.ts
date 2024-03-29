//ws feed profile 

import { TOrderFeed } from "../../utils/types";

export type TOrderResponse = {
    success: boolean;
    orders: Array<TOrderFeed>;
    total: number;
    totalToday: number;
    isOpen?: boolean;
};

export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_SEND_MESSAGE: 'WS_ORDERS_SEND_MESSAGE' = 'WS_ORDERS_SEND_MESSAGE';
export const WS_ORDERS_CONNECTION_DISCONNECT: 'WS_ORDERS_CONNECTION_DISCONNECT' = 'WS_ORDERS_CONNECTION_DISCONNECT';

export interface IWSOrdersConnectionStart {
    readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IWSOrdersConnectionClosed {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IWSOrdersConnectionDisconnect {
    readonly type: typeof WS_ORDERS_CONNECTION_DISCONNECT;
}

export interface IWSOrdersConnectionSuccess {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

//payload https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
export interface IWSOrdersConnectionError {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
    payload: MessageEvent
}

export interface IWSOrdersConnectionSendMessage {
    readonly type: typeof WS_ORDERS_SEND_MESSAGE;
    readonly payload: TOrderResponse;
}

export type TWSOrders = IWSOrdersConnectionStart |
    IWSOrdersConnectionClosed |
    IWSOrdersConnectionDisconnect |
    IWSOrdersConnectionSuccess |
    IWSOrdersConnectionSendMessage |
    IWSOrdersConnectionError;
