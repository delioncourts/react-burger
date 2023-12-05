import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import {
  registerRequest,
  authorizeRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  logoutRequest,
  getUserInfoRequest,
  updateUserInfoRequest,
} from '../../utils/api';

import {
  SET_USER,
  SET_USER_SIGNOUT,
  REGISTER_REQUEST,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGNOUT_ERROR,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from '../constant/const';

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterErrorAction {
  readonly type: typeof REGISTER_ERROR;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly name: string;
  readonly email: string;
}


//регистрация
export function register(name:string, email:string, password:string) {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    registerRequest(name, email, password)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER_ERROR,
        });
      });
  };
}

//авторизация (логин)
export function authorize(email:string, password:string) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    authorizeRequest(email, password)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            name: res.user.name,
            email: res.user.email,
          });
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN_ERROR,
        });
      });
  };
}

//пользователь
export function getUserInfo() {
  return function (dispatch) {
    getUserInfoRequest()
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SET_USER,
            name: res.user.name,
            email: res.user.email,
          });
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  };
}

//обновление данных о пользователе
export function updateUserInfo(name:string, email:string, password:string) {
  return function (dispatch) {
    const newInfo = {
      ...(!!password && { password }),
      name,
      email,
    };
    updateUserInfoRequest(newInfo)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SET_USER,
            name: res.user.name,
            email: res.user.email,
          });
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  };
}

//выход из профиля
export function signout() {
  return function (dispatch) {
    logoutRequest(getCookie('refreshToken'))
      .then((res) => {
        if (res.success) {
          dispatch({
            type: SIGNOUT_SUCCESS,
          });
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  };
}

//восстановление пароля из имейла
export function forgotPassword(email:string) {
  return function (dispatch) {
    forgotPasswordRequest(email)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: FORGOT_PASSWORD_ERROR,
          });
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  };
}

//обновление пароля
export function resetPassword(email:string, token) {
  return function (dispatch) {
    resetPasswordRequest(email, token)
      .then((res) => {
        if (res.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_ERROR,
          });
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  };
}
