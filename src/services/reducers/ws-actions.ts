import { TWSOrders } from "../actions/ws-actions";
import { TOrderFeed } from "../../utils/types";

import { WS_ORDERS_CONNECTION_CLOSED, WS_ORDERS_CONNECTION_START, WS_ORDERS_CONNECTION_SUCCESS, WS_ORDERS_CONNECTION_ERROR, WS_ORDERS_SEND_MESSAGE } from "../actions/ws-actions";

export type TOrderResponse = {
    success: boolean;
    orders: Array<TOrderFeed>;
    total: number;
    totalToday: number;
};

type TWSOrdersState = {
    wsConnecting: boolean;
    wsConnected: boolean;
    orders?: TOrderResponse;
    error: MessageEvent | null;
}

const defaultState: TWSOrdersState = {
    wsConnecting: false,
    wsConnected: false,
    orders: undefined,
    error: null,
};

export const wsOrdersReducer = (state = defaultState, action: TWSOrders): TWSOrdersState => {
    switch (action.type) {
        case WS_ORDERS_CONNECTION_START: {
            return {
                ...state,
                wsConnecting: true,
            };
        }
        case WS_ORDERS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnecting: false,
                wsConnected: true,
            };
        }
        case WS_ORDERS_CONNECTION_ERROR: {
            return {
                ...state,
                error: action.payload,
            };
        }
        case WS_ORDERS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false,
                wsConnecting: false,
            };
        }
        case WS_ORDERS_SEND_MESSAGE: {
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