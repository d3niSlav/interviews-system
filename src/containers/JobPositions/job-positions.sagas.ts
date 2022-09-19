import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import {
  loadJobPositionListAction,
  setAllJobPositionsAction,
  setJobPositionAction,
  setJobPositionListAction,
} from './job-positions.actions';
import {
  createJobPositionRequest,
  deleteJobPositionRequest,
  getAllJobPositionsRequest,
  getJobPositionRequest,
  getJobPositionsRequest,
  updateJobPositionRequest,
} from './job-positions.api';
import { JobPositionDTO } from './job-positions.dto';
import { selectJobPositionsPageConfiguration } from './job-positions.selectors';
import {
  CLEAR_CURRENT_JOB_POSITION,
  CREATE_JOB_POSITION,
  CreateJobPositionAction,
  DELETE_JOB_POSITION,
  DeleteJobPositionAction,
  EDIT_JOB_POSITION,
  EditJobPositionAction,
  JobPositionActionTypes,
  LOAD_ALL_JOB_POSITIONS,
  LOAD_JOB_POSITION,
  LOAD_JOB_POSITION_LIST,
  LoadAllJobPositionsAction,
  LoadJobPositionAction,
  LoadJobPositionListAction,
} from './job-positions.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewJobPositionSaga(
  action: CreateJobPositionAction,
): Generator<
  | PutEffect<GlobalRequestActions | JobPositionActionTypes>
  | CallEffect<DefaultResponseDTO<JobPositionDTO>>
  | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createJobPositionRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectJobPositionsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadJobPositionListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadJobPositionSaga(
  action: LoadJobPositionAction,
): Generator<
  CallEffect<DefaultResponseDTO<JobPositionDTO>> | PutEffect<GlobalRequestActions | JobPositionActionTypes>
> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getJobPositionRequest, id)) as DefaultResponseDTO<JobPositionDTO>;
    yield put(setJobPositionAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editJobPositionSaga(
  action: EditJobPositionAction,
): Generator<PutEffect<GlobalRequestActions | JobPositionActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateJobPositionRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectJobPositionsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadJobPositionListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteJobPositionSaga(
  action: DeleteJobPositionAction,
): Generator<PutEffect<GlobalRequestActions | JobPositionActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteJobPositionRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectJobPositionsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadJobPositionListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetJobPositionErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_JOB_POSITION));
  yield put(setRequestSucceededAction(EDIT_JOB_POSITION));
}

function* loadJobPositionsTableData(
  action: LoadJobPositionListAction,
): Generator<
  CallEffect<PagedResponseDTO<JobPositionDTO[]>> | PutEffect<JobPositionActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getJobPositionsRequest, pageConfig)) as PagedResponseDTO<
      JobPositionDTO[]
    >;
    yield put(setJobPositionListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllJobPositionsData(
  action: LoadAllJobPositionsAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<JobPositionDTO, 'id' | 'title'>[]>>
  | PutEffect<JobPositionActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllJobPositionsRequest)) as DefaultResponseDTO<
      Pick<JobPositionDTO, 'id' | 'title'>[]
    >;
    yield put(setAllJobPositionsAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* jobPositionSaga(): Generator {
  yield takeLatest(CREATE_JOB_POSITION, createNewJobPositionSaga);
  yield takeLatest(LOAD_JOB_POSITION, loadJobPositionSaga);
  yield takeLatest(EDIT_JOB_POSITION, editJobPositionSaga);
  yield takeLatest(DELETE_JOB_POSITION, deleteJobPositionSaga);
  yield takeEvery(CLEAR_CURRENT_JOB_POSITION, resetJobPositionErrors);
  yield takeLatest(LOAD_JOB_POSITION_LIST, loadJobPositionsTableData);
  yield takeLatest(LOAD_ALL_JOB_POSITIONS, loadAllJobPositionsData);
}
