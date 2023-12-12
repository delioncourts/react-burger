import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '../../index';
import { getCookie } from '../../utils/cookie';

export type TwsActionTypes = {
  wsInit: string;
  onClose: string;
  onOpen: string;
  onError: string;
  onMessage: string;
  wsDisconnect: string;
};

//генератор миддлвер
export const socketMiddleware = (wsUrl: string, wsActions: TwsActionTypes, auth: boolean): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onMessage, onOpen, onClose, onError, wsDisconnect } = wsActions;
      const accessToken = localStorage.getItem("accessToken")?.replace("Bearer ", "");

      if (type === wsInit) {
        if (auth) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (socket) {

        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };

        if (type === wsDisconnect) {
          socket.close();
        }

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  });
};