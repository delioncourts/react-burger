import { defaultState, authReducer } from './auth';
import {
  SET_USER,
  LOGIN_SUCCESS,
  SIGNOUT_SUCCESS,
  REGISTER_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from '../constant/const';
import { TEST_AUTH_EMAIL, TEST_AUTH_NAME } from '../../utils/test';

describe('check auth reducer', () => {
  test('should return the initial (default) state', () => {
    expect(authReducer(undefined, {})).toEqual(defaultState);
  });

  test('should set auth user', () => {
    expect(
      authReducer(defaultState, { type: SET_USER, name: TEST_AUTH_NAME, email: TEST_AUTH_EMAIL }),
    ).toEqual({ ...defaultState, name: TEST_AUTH_NAME, email: TEST_AUTH_EMAIL, isLoggedIn: true });
  });

  test('should successfully login', () => {
    expect(
      authReducer(defaultState, {
        type: LOGIN_SUCCESS,
        name: TEST_AUTH_NAME,
        email: TEST_AUTH_EMAIL,
      }),
    ).toEqual({ ...defaultState, name: TEST_AUTH_NAME, email: TEST_AUTH_EMAIL, isLoggedIn: true });
  });

  test('should successfully logout (signout)', () => {
    expect(authReducer(defaultState, { type: SIGNOUT_SUCCESS })).toEqual({
      ...defaultState,
      name: null,
      email: null,
      isLoggedIn: false,
    });
  });

  test('should successfully register', () => {
    expect(
      authReducer(defaultState, {
        type: REGISTER_SUCCESS,
        name: TEST_AUTH_NAME,
        email: TEST_AUTH_EMAIL,
      }),
    ).toEqual({ ...defaultState, name: TEST_AUTH_NAME, email: TEST_AUTH_EMAIL, isLoggedIn: true });
  });

  test('should successfully reset password', () => {
    expect(authReducer(defaultState, { type: RESET_PASSWORD_SUCCESS })).toEqual({
      ...defaultState,
      isPasswordReset: true,
    });
  });
});
