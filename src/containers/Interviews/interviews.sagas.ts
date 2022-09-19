import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import { loadInterviewListAction, setInterviewAction, setInterviewListAction } from './interviews.actions';
import {
  createInterviewRequest,
  deleteInterviewRequest,
  getInterviewRequest,
  getInterviewsRequest,
  updateInterviewRequest,
} from './interviews.api';
import { InterviewDTO } from './interviews.dto';
import { selectInterviewsPageConfiguration } from './interviews.selectors';
import {
  CLEAR_CURRENT_INTERVIEW,
  CREATE_INTERVIEW,
  CreateInterviewAction,
  DELETE_INTERVIEW,
  DeleteInterviewAction,
  EDIT_INTERVIEW,
  EditInterviewAction,
  InterviewActionTypes,
  LOAD_INTERVIEW,
  LOAD_INTERVIEW_LIST,
  LoadInterviewAction,
  LoadInterviewListAction,
} from './interviews.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewInterviewSaga(
  action: CreateInterviewAction,
): Generator<
  PutEffect<GlobalRequestActions | InterviewActionTypes> | CallEffect<DefaultResponseDTO<InterviewDTO>> | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createInterviewRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectInterviewsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadInterviewListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadInterviewSaga(
  action: LoadInterviewAction,
): Generator<CallEffect<DefaultResponseDTO<InterviewDTO>> | PutEffect<GlobalRequestActions | InterviewActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getInterviewRequest, id)) as DefaultResponseDTO<InterviewDTO>;
    yield put(setInterviewAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editInterviewSaga(
  action: EditInterviewAction,
): Generator<PutEffect<GlobalRequestActions | InterviewActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateInterviewRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectInterviewsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadInterviewListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteInterviewSaga(
  action: DeleteInterviewAction,
): Generator<PutEffect<GlobalRequestActions | InterviewActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteInterviewRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectInterviewsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadInterviewListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetInterviewErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_INTERVIEW));
  yield put(setRequestSucceededAction(EDIT_INTERVIEW));
}

function* loadInterviewsTableData(
  action: LoadInterviewListAction,
): Generator<
  CallEffect<PagedResponseDTO<InterviewDTO[]>> | PutEffect<InterviewActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getInterviewsRequest, pageConfig)) as PagedResponseDTO<
      InterviewDTO[]
    >;
    yield put(setInterviewListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* interviewSaga(): Generator {
  yield takeLatest(CREATE_INTERVIEW, createNewInterviewSaga);
  yield takeLatest(LOAD_INTERVIEW, loadInterviewSaga);
  yield takeLatest(EDIT_INTERVIEW, editInterviewSaga);
  yield takeLatest(DELETE_INTERVIEW, deleteInterviewSaga);
  yield takeEvery(CLEAR_CURRENT_INTERVIEW, resetInterviewErrors);
  yield takeLatest(LOAD_INTERVIEW_LIST, loadInterviewsTableData);
}
