import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import type { Middleware, MiddlewareAPI } from 'redux';
import { RootState } from '../../index';

export type TwsActionTypes = {
  // outside actions
  wsConnect: ActionCreatorWithPayload<string>,
  //wsDisconnect: ActionCreatorWithoutPayload,
  wsSendMessage?: ActionCreatorWithPayload<any>,
  //wsConnecting: ActionCreatorWithoutPayload,

  // websocket
  onOpen: ActionCreatorWithoutPayload,
  onClose: ActionCreatorWithoutPayload,
  onError: ActionCreatorWithPayload<string>,
  onMessage: ActionCreatorWithPayload<any>,
}

//генератор миддлвер
export const socketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    //создаем таймер, который будет переподключать соединение
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return next => (action) => {
      const { dispatch } = store;
      //const { type } = action;
      const { wsConnect, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (wsConnect.match(action)) {
        url = action.payload;
        //socket = new WebSocket(`${wsUrl}?token=${user.token}`);
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          //dispatch(wsConnecting());
          dispatch(onOpen());
          isConnected = true;

        };

        socket.onerror = event => {
          dispatch(onError(event.type));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = event => {
          //закрытие произошло правильно есои код не равен 1000
          if (event.code !== 1000) {
            dispatch(onError(event.code.toString()))
          }
          dispatch(onClose());

          if (isConnected) {
            //dispatch(wsConnecting())
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnect(url))
            }, 3000)
          }
        };

        if (wsSendMessage?.match) {
          const payload = action.payload;
          const message = { ...(payload) };
          socket.send(JSON.stringify(message));
        }

        /*if (wsDisconnect.match(action)) {
          clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          socket.close();
          dispatch(onClose)
        }*/
      }

      next(action);
    };
  });
};