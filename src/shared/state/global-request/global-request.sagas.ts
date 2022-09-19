import { CLEAR_REQUEST_FAILED, GlobalRequestActions, GlobalRequestFailedAction } from './global-request.types';
import { put, PutEffect, takeEvery } from 'redux-saga/effects';

import { REQUEST_FAILED_NETWORK, NETWORK_ERROR, REQUEST_FAILED } from './global-request.constants';
import { setRequestFailedNetworkAction, setRequestSucceededAction } from './global-request.actions';

function* requestFailedSaga(action: GlobalRequestFailedAction): Generator<PutEffect<GlobalRequestActions>> {
  const { payload } = action;
  const isNetworkError = payload.data.message === 'Network Error';

  if (isNetworkError) {
    const networkError = { errorMessage: NETWORK_ERROR };
    yield put(setRequestFailedNetworkAction(REQUEST_FAILED_NETWORK, networkError));
  }
}

function* resetRequestFailedNetwork(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(REQUEST_FAILED_NETWORK));
}

export default function* globalRequestSaga(): Generator {
  yield takeEvery(REQUEST_FAILED, requestFailedSaga);
  yield takeEvery(CLEAR_REQUEST_FAILED, resetRequestFailedNetwork);
}
