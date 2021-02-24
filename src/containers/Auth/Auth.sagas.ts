import { takeEvery } from 'redux-saga/effects';

import { LOG_OUT_USER } from './Auth.types';
import { deleteCookie, JWT_TOKEN_COOKIE_NAME } from '../../shared/web-storage';

function* deleteUserToken(): Generator<void> {
  yield deleteCookie(JWT_TOKEN_COOKIE_NAME);
}

export default function* authSaga(): Generator {
  yield takeEvery(LOG_OUT_USER, deleteUserToken);
}
