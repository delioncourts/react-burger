//ws feed profile 

import { TOrderFeed } from "../../utils/types";

export type TOrderResponse = {
    success: boolean;
    orders: Array<TOrderFeed>;
    total: number;
    totalToday: number;
};

export const WS_ORDERS_CONNECTION_START: 'WS_ORDERS_CONNECTION_START' = 'WS_ORDERS_CONNECTION_START';
export const WS_ORDERS_CONNECTION_CLOSED: 'WS_ORDERS_CONNECTION_CLOSED' = 'WS_ORDERS_CONNECTION_CLOSED';
export const WS_ORDERS_CONNECTION_SUCCESS: 'WS_ORDERS_CONNECTION_SUCCESS' = 'WS_ORDERS_CONNECTION_SUCCESS';
export const WS_ORDERS_CONNECTION_ERROR: 'WS_ORDERS_CONNECTION_ERROR' = 'WS_ORDERS_CONNECTION_ERROR';
export const WS_ORDERS_SEND_MESSAGE: 'WS_ORDERS_SEND_MESSAGE' = 'WS_ORDERS_SEND_MESSAGE';


export interface IWSOrdersConnentionStart {
    readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IWSOrdersConnentionClosed {
    readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IWSOrdersConnentionSuccess {
    readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

//payload https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
export interface IWSOrdersConnentionError {
    readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
    payload: MessageEvent
}

export interface IWSOrdersConnentionSendMessage {
    readonly type: typeof WS_ORDERS_SEND_MESSAGE;
    readonly payload: TOrderResponse;
}

export type TWSOrders = IWSOrdersConnentionStart | IWSOrdersConnentionClosed | IWSOrdersConnentionSuccess | IWSOrdersConnentionSendMessage | IWSOrdersConnentionError;
