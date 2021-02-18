import { INITIALIZE_USER, InitializeUserAction, SET_USER_FROM_TOKEN, SetUserFromTokenAction } from './Auth.types';

export const initializeUserAction = (): InitializeUserAction => ({
  type: INITIALIZE_USER,
});

export const setUserFromTokenAction = (token: string): SetUserFromTokenAction => ({
  type: SET_USER_FROM_TOKEN,
  payload: { token },
});
