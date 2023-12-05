import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { AppThunk, AppDispatch } from '../../index';
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


//регистрация
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

//авторизация (логин)
export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginErrorAction {
  readonly type: typeof LOGIN_ERROR;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly name: string;
  readonly email: string;
}

//пользователь
export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly name: string;
  readonly email: string
};

//выход из профиля
export interface ISignoutSuccessAction {
  readonly type: typeof SIGNOUT_SUCCESS;
}

//восстановление пароля из имейла
export interface IForgotPasswordErrorAction {
  readonly type: typeof FORGOT_PASSWORD_ERROR;
}

export interface IForgotPasswordSuccessAction {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

//обновление пароля
export interface IResetPasswordErrorAction {
  readonly type: typeof RESET_PASSWORD_ERROR;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export type TAuthActions = IRegisterRequestAction |
  IRegisterErrorAction |
  IRegisterSuccessAction |
  ILoginRequestAction |
  ILoginErrorAction |
  ILoginSuccessAction |
  ISetUserAction |
  ISignoutSuccessAction |
  IForgotPasswordErrorAction |
  IForgotPasswordSuccessAction |
  IResetPasswordErrorAction |
  IResetPasswordSuccessAction;

//регистрация
export const register = (name: string, email: string, password: string): AppThunk => (dispatch: AppDispatch) => {
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
}

//авторизация (логин)
export const authorize = (email: string, password: string): AppThunk => (dispatch: AppDispatch) => {
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

}

//пользователь
export const getUserInfo = () => (dispatch: AppDispatch) => {
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
}

//обновление данных о пользователе
export const updateUserInfo = (name: string, email: string, password: string): AppThunk => (dispatch: AppDispatch) => {
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

}

//выход из профиля
export const signout = () => (dispatch: AppDispatch) => {
  logoutRequest(getCookie('refreshToken') as string)
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


//восстановление пароля из имейла
export const forgotPassword = (email: string): AppThunk => (dispatch: AppDispatch) => {
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
}

//обновление пароля
export const resetPassword = (email: string, token: string): AppThunk => (dispatch: AppDispatch) => {
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

}
