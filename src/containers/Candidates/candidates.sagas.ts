import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import {
  loadCandidateListAction,
  setAllCandidatesAction,
  setCandidateAction,
  setCandidateListAction,
} from './candidates.actions';
import {
  createCandidateRequest,
  deleteCandidateRequest,
  getAllCandidatesRequest,
  getCandidateRequest,
  getCandidatesRequest,
  updateCandidateRequest,
} from './candidates.api';
import { CandidateDTO } from './candidates.dto';
import { selectCandidatesPageConfiguration } from './candidates.selectors';
import {
  CLEAR_CURRENT_CANDIDATE,
  CREATE_CANDIDATE,
  CreateCandidateAction,
  DELETE_CANDIDATE,
  DeleteCandidateAction,
  EDIT_CANDIDATE,
  EditCandidateAction,
  CandidateActionTypes,
  LOAD_CANDIDATE,
  LOAD_CANDIDATE_LIST,
  LoadCandidateAction,
  LoadCandidateListAction,
  LoadAllCandidatesAction,
  LOAD_ALL_CANDIDATES,
} from './candidates.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewCandidateSaga(
  action: CreateCandidateAction,
): Generator<
  PutEffect<GlobalRequestActions | CandidateActionTypes> | CallEffect<DefaultResponseDTO<CandidateDTO>> | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createCandidateRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectCandidatesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadCandidateListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadCandidateSaga(
  action: LoadCandidateAction,
): Generator<CallEffect<DefaultResponseDTO<CandidateDTO>> | PutEffect<GlobalRequestActions | CandidateActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getCandidateRequest, id)) as DefaultResponseDTO<CandidateDTO>;
    yield put(setCandidateAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editCandidateSaga(
  action: EditCandidateAction,
): Generator<PutEffect<GlobalRequestActions | CandidateActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateCandidateRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectCandidatesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadCandidateListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteCandidateSaga(
  action: DeleteCandidateAction,
): Generator<PutEffect<GlobalRequestActions | CandidateActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteCandidateRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectCandidatesPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadCandidateListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetCandidateErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_CANDIDATE));
  yield put(setRequestSucceededAction(EDIT_CANDIDATE));
}

function* loadCandidatesTableData(
  action: LoadCandidateListAction,
): Generator<
  CallEffect<PagedResponseDTO<CandidateDTO[]>> | PutEffect<CandidateActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getCandidatesRequest, pageConfig)) as PagedResponseDTO<
      CandidateDTO[]
    >;
    yield put(setCandidateListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllCandidatesData(
  action: LoadAllCandidatesAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[]>>
  | PutEffect<CandidateActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllCandidatesRequest)) as DefaultResponseDTO<
      Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[]
    >;
    yield put(setAllCandidatesAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* candidateSaga(): Generator {
  yield takeLatest(CREATE_CANDIDATE, createNewCandidateSaga);
  yield takeLatest(LOAD_CANDIDATE, loadCandidateSaga);
  yield takeLatest(EDIT_CANDIDATE, editCandidateSaga);
  yield takeLatest(DELETE_CANDIDATE, deleteCandidateSaga);
  yield takeEvery(CLEAR_CURRENT_CANDIDATE, resetCandidateErrors);
  yield takeLatest(LOAD_CANDIDATE_LIST, loadCandidatesTableData);
  yield takeLatest(LOAD_ALL_CANDIDATES, loadAllCandidatesData);
}
