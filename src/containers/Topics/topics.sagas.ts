import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import { loadTopicListAction, setAllTopicsAction, setTopicAction, setTopicListAction } from './topics.actions';
import {
  createTopicRequest,
  deleteTopicRequest,
  getAllTopicsRequest,
  getTopicRequest,
  getTopicsRequest,
  updateTopicRequest,
} from './topics.api';
import { TopicDTO } from './topics.dto';
import { selectTopicsPageConfiguration } from './topics.selectors';
import {
  CLEAR_CURRENT_TOPIC,
  CREATE_TOPIC,
  CreateTopicAction,
  DELETE_TOPIC,
  DeleteTopicAction,
  EDIT_TOPIC,
  EditTopicAction,
  TopicActionTypes,
  LOAD_TOPIC,
  LOAD_TOPIC_LIST,
  LoadTopicAction,
  LoadTopicListAction,
  LoadAllTopicsAction,
  LOAD_All_TOPICS,
} from './topics.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewTopicSaga(
  action: CreateTopicAction,
): Generator<
  PutEffect<GlobalRequestActions | TopicActionTypes> | CallEffect<DefaultResponseDTO<TopicDTO>> | SelectEffect
> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createTopicRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectTopicsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadTopicListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadTopicSaga(
  action: LoadTopicAction,
): Generator<CallEffect<DefaultResponseDTO<TopicDTO>> | PutEffect<GlobalRequestActions | TopicActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getTopicRequest, id)) as DefaultResponseDTO<TopicDTO>;
    yield put(setTopicAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editTopicSaga(
  action: EditTopicAction,
): Generator<PutEffect<GlobalRequestActions | TopicActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateTopicRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectTopicsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadTopicListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteTopicSaga(
  action: DeleteTopicAction,
): Generator<PutEffect<GlobalRequestActions | TopicActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteTopicRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectTopicsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadTopicListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetTopicErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_TOPIC));
  yield put(setRequestSucceededAction(EDIT_TOPIC));
}

function* loadTopicsTableData(
  action: LoadTopicListAction,
): Generator<CallEffect<PagedResponseDTO<TopicDTO[]>> | PutEffect<TopicActionTypes> | PutEffect<GlobalRequestActions>> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getTopicsRequest, pageConfig)) as PagedResponseDTO<TopicDTO[]>;
    yield put(setTopicListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllTopicsData(
  action: LoadAllTopicsAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<TopicDTO, 'id' | 'title'>[]>>
  | PutEffect<TopicActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllTopicsRequest)) as DefaultResponseDTO<Pick<TopicDTO, 'id' | 'title'>[]>;
    yield put(setAllTopicsAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* topicSaga(): Generator {
  yield takeLatest(CREATE_TOPIC, createNewTopicSaga);
  yield takeLatest(LOAD_TOPIC, loadTopicSaga);
  yield takeLatest(EDIT_TOPIC, editTopicSaga);
  yield takeLatest(DELETE_TOPIC, deleteTopicSaga);
  yield takeEvery(CLEAR_CURRENT_TOPIC, resetTopicErrors);
  yield takeLatest(LOAD_TOPIC_LIST, loadTopicsTableData);
  yield takeLatest(LOAD_All_TOPICS, loadAllTopicsData);
}
