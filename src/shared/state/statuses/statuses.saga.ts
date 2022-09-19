import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import { setStatusesAction } from './statuses.actions';
import { getStatusesRequest } from './statuses.api';
import { LOAD_STATUSES, LoadStatusesAction, StatusesActionTypes } from './statuses.types';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../global-request';
import { DefaultResponseDTO, Status } from '../../constants';

function* loadStatusesData(
  action: LoadStatusesAction,
): Generator<
  CallEffect<DefaultResponseDTO<Status[]>> | PutEffect<StatusesActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;
  const { type: statusType } = action.payload;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getStatusesRequest, statusType)) as DefaultResponseDTO<Status[]>;
    yield put(setStatusesAction(statusType, data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* statusesSaga(): Generator {
  yield takeEvery(LOAD_STATUSES, loadStatusesData);
}
