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
      .catch((err) => 
      console.log(err));
  };
}
