import { Status } from '../../constants';

export const LOAD_STATUSES = 'LOAD_STATUSES';
export const SET_STATUSES = 'SET_STATUSES';

export type StatusesState = {
  [key: string]: Status[];
};

export interface LoadStatusesAction {
  type: typeof LOAD_STATUSES;
  payload: {
    type: string;
  };
}

export interface SetStatusesAction {
  type: typeof SET_STATUSES;
  payload: {
    data: Status[];
    type: string;
  };
}

export type StatusesActionTypes = LoadStatusesAction | SetStatusesAction;
