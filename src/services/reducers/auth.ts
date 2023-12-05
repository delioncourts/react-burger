//авторизация
import {
  SET_USER,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  REGISTER_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from '../constant/const';

type TAuthState = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  isPasswordReset: boolean;
}

const defaultState: TAuthState = {
  name: '',
  email: '',
  isLoggedIn: false,
  isPasswordReset: false,
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        isLoggedIn: true,
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        isLoggedIn: true,
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        name: action.name,
        email: action.email,
        isLoggedIn: true,
      };
    }

    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        name: null,
        email: null,
        isLoggedIn: false,
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isPasswordReset: true,
      };
    }

    default: {
      return state;
    }
  }
};
