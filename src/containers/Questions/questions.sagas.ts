import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import { loadQuestionListAction, setQuestionAction, setQuestionListAction } from './questions.actions';
import {
  createQuestionRequest,
  deleteQuestionRequest,
  getQuestionRequest,
  getQuestionsRequest,
  updateQuestionRequest,
} from './questions.api';
import { QuestionDTO } from './questions.dto';
import { selectQuestionsPageConfiguration } from './questions.selectors';
import {
  CLEAR_CURRENT_QUESTION,
  CREATE_QUESTION,
  CreateQuestionAction,
  DELETE_QUESTION,
  DeleteQuestionAction,
  EDIT_QUESTION,
  EditQuestionAction,
  QuestionActionTypes,
  LOAD_QUESTION,
  LOAD_QUESTION_LIST,
  LoadQuestionAction,
  LoadQuestionListAction,
} from './questions.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewQuestionSaga(
  action: CreateQuestionAction,
): Generator<
  PutEffect<GlobalRequestActions | QuestionActionTypes> | CallEffect<DefaultResponseDTO<QuestionDTO>> | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createQuestionRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectQuestionsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadQuestionListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadQuestionSaga(
  action: LoadQuestionAction,
): Generator<CallEffect<DefaultResponseDTO<QuestionDTO>> | PutEffect<GlobalRequestActions | QuestionActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getQuestionRequest, id)) as DefaultResponseDTO<QuestionDTO>;
    yield put(setQuestionAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editQuestionSaga(
  action: EditQuestionAction,
): Generator<PutEffect<GlobalRequestActions | QuestionActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateQuestionRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectQuestionsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadQuestionListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteQuestionSaga(
  action: DeleteQuestionAction,
): Generator<PutEffect<GlobalRequestActions | QuestionActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteQuestionRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectQuestionsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadQuestionListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetQuestionErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_QUESTION));
  yield put(setRequestSucceededAction(EDIT_QUESTION));
}

function* loadQuestionsTableData(
  action: LoadQuestionListAction,
): Generator<
  CallEffect<PagedResponseDTO<QuestionDTO[]>> | PutEffect<QuestionActionTypes> | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getQuestionsRequest, pageConfig)) as PagedResponseDTO<
      QuestionDTO[]
    >;
    yield put(setQuestionListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* questionSaga(): Generator {
  yield takeLatest(CREATE_QUESTION, createNewQuestionSaga);
  yield takeLatest(LOAD_QUESTION, loadQuestionSaga);
  yield takeLatest(EDIT_QUESTION, editQuestionSaga);
  yield takeLatest(DELETE_QUESTION, deleteQuestionSaga);
  yield takeEvery(CLEAR_CURRENT_QUESTION, resetQuestionErrors);
  yield takeLatest(LOAD_QUESTION_LIST, loadQuestionsTableData);
}
