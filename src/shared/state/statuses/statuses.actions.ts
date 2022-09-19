import { LOAD_STATUSES, LoadStatusesAction, SET_STATUSES, SetStatusesAction } from './statuses.types';
import { Status } from '../../constants';

export const loadStatusesAction = (type: string): LoadStatusesAction => ({
  type: LOAD_STATUSES,
  payload: { type },
});

export const setStatusesAction = (type: string, data: Status[]): SetStatusesAction => ({
  type: SET_STATUSES,
  payload: { data, type },
});
