//авторизация
import {
  SET_USER,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  REGISTER_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from '../constant/const';

const defaultState = {
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
