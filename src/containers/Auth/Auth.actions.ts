import {
  INITIALIZE_USER,
  InitializeUserAction,
  LOG_OUT_USER,
  LogOutUserAction,
  SET_USER_FROM_TOKEN,
  SetUserFromTokenAction,
} from './Auth.types';

export const initializeUserAction = (): InitializeUserAction => ({
  type: INITIALIZE_USER,
});

export const logOutUserAction = (): LogOutUserAction => ({
  type: LOG_OUT_USER,
});

export const setUserFromTokenAction = (token: string): SetUserFromTokenAction => ({
  type: SET_USER_FROM_TOKEN,
  payload: { token },
});
