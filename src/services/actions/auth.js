import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import {
  registerRequest,
  authorizeRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  logoutRequest,
  getUserInfoRequest,
  updateUserInfoRequest,
  updateTokenRequest,
} from '../../utils/api';

//устанавливаем пользователя и выходим из профиля
export const SET_USER = 'SET_USER';
export const SET_USER_SIGNOUT = 'SET_USER_SIGNOUT';

//регистрация
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

//логин
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

//выход из профиля
export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';
export const SIGNOUT_ERROR = 'SIGNOUT_ERROR';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';

//восстановление пароля из имейла
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

//новый пароль
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

//регистрация
export function register(name, email, password) {
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
          let accessToken, refreshToken;
          accessToken = res.accessToken.split('Bearer ')[1];
          refreshToken = res.refreshToken;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: REGISTER_ERROR,
        });
      });
  };
}

//авторизация (логин)
export function authorize(email, password) {
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
          let accessToken, refreshToken;
          accessToken = res.accessToken.split('Bearer ')[1];
          refreshToken = res.refreshToken;
          setCookie('accessToken', accessToken);
          setCookie('refreshToken', refreshToken);
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
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
export function updateUserInfo(name, email, password) {
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
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        } else {
          Promise.reject(`Произошла ошибка: ${res.status}`);
        }
      })
      .catch((err) => console.log(err));
  };
}

//восстановление пароля из имейла
export function forgotPassword(email) {
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
export function resetPassword(email, token) {
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
