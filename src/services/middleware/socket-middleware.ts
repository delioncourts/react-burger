import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';

// import type {
//   AppActions,
//   TWSStoreActions,
//   IMessage,
//   AppDispatch,
//   RootState,
//   IMessageResponse,
// } from '../types';

// import { getCurrentTimestamp } from '../../utils/datetime';

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnsect: ActionCreatorWithoutPayload,
    wsSendMessage?: ActionCreatorWithPayload<any>,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}
export const socketMiddleware = (wsActions:any): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      const { user } = getState().user;
      if (type === wsInit && user) {
        socket = new WebSocket(`${wsUrl}?token=${user.token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: { ...restParsedData } });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = action.payload;
          const message = { ...(payload), token: user?.token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  });
};