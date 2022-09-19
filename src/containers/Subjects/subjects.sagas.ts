import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import {
  loadSubjectListAction,
  setAllSubjectsAction,
  setSubjectAction,
  setSubjectListAction,
} from './subjects.actions';
import {
  createSubjectRequest,
  deleteSubjectRequest,
  getAllSubjectsRequest,
  getSubjectRequest,
  getSubjectsRequest,
  updateSubjectRequest,
} from './subjects.api';
import { SubjectDTO } from './subjects.dto';
import { selectSubjectsPageConfiguration } from './subjects.selectors';
import {
  CLEAR_CURRENT_SUBJECT,
  CREATE_SUBJECT,
  CreateSubjectAction,
  DELETE_SUBJECT,
  DeleteSubjectAction,
  EDIT_SUBJECT,
  EditSubjectAction,
  SubjectActionTypes,
  LOAD_SUBJECT,
  LOAD_SUBJECT_LIST,
  LoadSubjectAction,
  LoadSubjectListAction,
  LoadAllSubjectsAction,
  LOAD_ALL_SUBJECTS,
} from './subjects.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewSubjectSaga(
  action: CreateSubjectAction,
): Generator<
  PutEffect<GlobalRequestActions | SubjectActionTypes> | CallEffect<DefaultResponseDTO<SubjectDTO>> | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createSubjectRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectSubjectsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadSubjectListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadSubjectSaga(
  action: LoadSubjectAction,
): Generator<CallEffect<DefaultResponseDTO<SubjectDTO>> | PutEffect<GlobalRequestActions | SubjectActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getSubjectRequest, id)) as DefaultResponseDTO<SubjectDTO>;
    yield put(setSubjectAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editSubjectSaga(
  action: EditSubjectAction,
): Generator<PutEffect<GlobalRequestActions | SubjectActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateSubjectRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectSubjectsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadSubjectListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteSubjectSaga(
  action: DeleteSubjectAction,
): Generator<PutEffect<GlobalRequestActions | SubjectActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteSubjectRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectSubjectsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadSubjectListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetSubjectErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_SUBJECT));
  yield put(setRequestSucceededAction(EDIT_SUBJECT));
}

function* loadSubjectsTableData(
  action: LoadSubjectListAction,
): Generator<
  CallEffect<PagedResponseDTO<SubjectDTO[]>> | PutEffect<SubjectActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getSubjectsRequest, pageConfig)) as PagedResponseDTO<
      SubjectDTO[]
    >;
    yield put(setSubjectListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllSubjectsData(
  action: LoadAllSubjectsAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<SubjectDTO, 'id' | 'title'>[]>>
  | PutEffect<SubjectActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllSubjectsRequest)) as DefaultResponseDTO<Pick<SubjectDTO, 'id' | 'title'>[]>;
    yield put(setAllSubjectsAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* subjectSaga(): Generator {
  yield takeLatest(CREATE_SUBJECT, createNewSubjectSaga);
  yield takeLatest(LOAD_SUBJECT, loadSubjectSaga);
  yield takeLatest(EDIT_SUBJECT, editSubjectSaga);
  yield takeLatest(DELETE_SUBJECT, deleteSubjectSaga);
  yield takeEvery(CLEAR_CURRENT_SUBJECT, resetSubjectErrors);
  yield takeLatest(LOAD_SUBJECT_LIST, loadSubjectsTableData);
  yield takeLatest(LOAD_ALL_SUBJECTS, loadAllSubjectsData);
}
