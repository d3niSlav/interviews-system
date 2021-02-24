import { UserDto } from './Auth.dtos';

export const INITIALIZE_USER = 'INITIALIZE_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const SET_USER_FROM_TOKEN = 'SET_USER_FROM_TOKEN';

export type AuthState = {
  user: UserDto | null;
};

export interface InitializeUserAction {
  type: typeof INITIALIZE_USER;
}

export interface LogOutUserAction {
  type: typeof LOG_OUT_USER;
}

export interface SetUserFromTokenAction {
  type: typeof SET_USER_FROM_TOKEN;
  payload: { token: string };
}

export type AuthActionTypes = InitializeUserAction | LogOutUserAction | SetUserFromTokenAction;
