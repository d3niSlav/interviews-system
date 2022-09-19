import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import {
  loadJobTitleListAction,
  setAllJobTitlesAction,
  setAllProgrammingLanguagesAction,
  setJobTitleAction,
  setJobTitleListAction,
} from './job-titles.actions';
import {
  createJobTitleRequest,
  deleteJobTitleRequest,
  getAllJobTitlesRequest,
  getAllProgrammingLanguagesRequest,
  getJobTitleRequest,
  getJobTitlesRequest,
  updateJobTitleRequest,
} from './job-titles.api';
import { JobTitleDTO, ProgrammingLanguageDTO } from './job-titles.dto';
import { selectJobTitlesPageConfiguration } from './job-titles.selectors';
import {
  CLEAR_CURRENT_JOB_TITLE,
  CREATE_JOB_TITLE,
  CreateJobTitleAction,
  DELETE_JOB_TITLE,
  DeleteJobTitleAction,
  EDIT_JOB_TITLE,
  EditJobTitleAction,
  JobTitleActionTypes,
  LOAD_ALL_JOB_TITLES,
  LOAD_ALL_PROGRAMMING_LANGUAGES,
  LOAD_JOB_TITLE,
  LOAD_JOB_TITLE_LIST,
  LoadAllJobTitlesAction,
  LoadAllProgrammingLanguagesAction,
  LoadJobTitleAction,
  LoadJobTitleListAction,
} from './job-titles.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewJobTitleSaga(
  action: CreateJobTitleAction,
): Generator<
  PutEffect<GlobalRequestActions | JobTitleActionTypes> | CallEffect<DefaultResponseDTO<JobTitleDTO>> | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createJobTitleRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectJobTitlesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadJobTitleListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadJobTitleSaga(
  action: LoadJobTitleAction,
): Generator<CallEffect<DefaultResponseDTO<JobTitleDTO>> | PutEffect<GlobalRequestActions | JobTitleActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getJobTitleRequest, id)) as DefaultResponseDTO<JobTitleDTO>;
    yield put(setJobTitleAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editJobTitleSaga(
  action: EditJobTitleAction,
): Generator<PutEffect<GlobalRequestActions | JobTitleActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateJobTitleRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectJobTitlesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadJobTitleListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteJobTitleSaga(
  action: DeleteJobTitleAction,
): Generator<PutEffect<GlobalRequestActions | JobTitleActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteJobTitleRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectJobTitlesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadJobTitleListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetJobTitleErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_JOB_TITLE));
  yield put(setRequestSucceededAction(EDIT_JOB_TITLE));
}

function* loadJobTitlesTableData(
  action: LoadJobTitleListAction,
): Generator<
  CallEffect<PagedResponseDTO<JobTitleDTO[]>> | PutEffect<JobTitleActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getJobTitlesRequest, pageConfig)) as PagedResponseDTO<
      JobTitleDTO[]
    >;
    yield put(setJobTitleListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllJobTitlesData(
  action: LoadAllJobTitlesAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<JobTitleDTO, 'id' | 'title'>[]>>
  | PutEffect<JobTitleActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllJobTitlesRequest)) as DefaultResponseDTO<Pick<JobTitleDTO, 'id' | 'title'>[]>;
    yield put(setAllJobTitlesAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllProgrammingLanguagesData(
  action: LoadAllProgrammingLanguagesAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<ProgrammingLanguageDTO, 'id' | 'title'>[]>>
  | PutEffect<JobTitleActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllProgrammingLanguagesRequest)) as DefaultResponseDTO<
      Pick<ProgrammingLanguageDTO, 'id' | 'title'>[]
    >;
    yield put(setAllProgrammingLanguagesAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* jobTitleSaga(): Generator {
  yield takeLatest(CREATE_JOB_TITLE, createNewJobTitleSaga);
  yield takeLatest(LOAD_JOB_TITLE, loadJobTitleSaga);
  yield takeLatest(EDIT_JOB_TITLE, editJobTitleSaga);
  yield takeLatest(DELETE_JOB_TITLE, deleteJobTitleSaga);
  yield takeEvery(CLEAR_CURRENT_JOB_TITLE, resetJobTitleErrors);
  yield takeLatest(LOAD_JOB_TITLE_LIST, loadJobTitlesTableData);
  yield takeLatest(LOAD_ALL_JOB_TITLES, loadAllJobTitlesData);
  yield takeLatest(LOAD_ALL_PROGRAMMING_LANGUAGES, loadAllProgrammingLanguagesData);
}
