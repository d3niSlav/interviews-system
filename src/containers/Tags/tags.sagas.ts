import { AxiosError } from 'axios';
import { call, CallEffect, put, PutEffect, takeEvery, takeLatest, SelectEffect, select } from 'redux-saga/effects';

import { loadTagListAction, setAllTagsAction, setTagAction, setTagListAction } from './tags.actions';
import {
  createTagRequest,
  deleteTagRequest,
  getAllTagsRequest,
  getTagRequest,
  getTagsRequest,
  updateTagRequest,
} from './tags.api';
import { TagDTO } from './tags.dto';
import { selectTagsPageConfiguration } from './tags.selectors';
import {
  CLEAR_CURRENT_TAG,
  CREATE_TAG,
  CreateTagAction,
  DELETE_TAG,
  DeleteTagAction,
  EDIT_TAG,
  EditTagAction,
  TagActionTypes,
  LOAD_TAG,
  LOAD_TAG_LIST,
  LoadTagAction,
  LoadTagListAction,
  LoadAllTagsAction,
  LOAD_ALL_TAGS,
} from './tags.types';
import { BasicResponseDTO, DefaultResponseDTO, PagedResponseDTO, PageSearchQueryConfig } from '../../shared/constants';
import {
  GlobalRequestActions,
  setRequestFailedAction,
  setRequestStartedAction,
  setRequestSucceededAction,
} from '../../shared/state/global-request';

function* createNewTagSaga(
  action: CreateTagAction,
): Generator<PutEffect<GlobalRequestActions | TagActionTypes> | CallEffect<DefaultResponseDTO<TagDTO>> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(createTagRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectTagsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadTagListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadTagSaga(
  action: LoadTagAction,
): Generator<CallEffect<DefaultResponseDTO<TagDTO>> | PutEffect<GlobalRequestActions | TagActionTypes>> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getTagRequest, id)) as DefaultResponseDTO<TagDTO>;
    yield put(setTagAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* editTagSaga(
  action: EditTagAction,
): Generator<PutEffect<GlobalRequestActions | TagActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { data },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(updateTagRequest, data);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectTagsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadTagListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* deleteTagSaga(
  action: DeleteTagAction,
): Generator<PutEffect<GlobalRequestActions | TagActionTypes> | CallEffect<BasicResponseDTO> | SelectEffect> {
  const {
    type: actionType,
    payload: { id },
  } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    yield call(deleteTagRequest, id);
    yield put(setRequestSucceededAction(actionType));
    const pageConfig = (yield select(selectTagsPageConfiguration)) as PageSearchQueryConfig;
    yield put(loadTagListAction(pageConfig));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* resetTagErrors(): Generator<PutEffect<GlobalRequestActions>> {
  yield put(setRequestSucceededAction(CREATE_TAG));
  yield put(setRequestSucceededAction(EDIT_TAG));
}

function* loadTagsTableData(
  action: LoadTagListAction,
): Generator<CallEffect<PagedResponseDTO<TagDTO[]>> | PutEffect<TagActionTypes> | PutEffect<GlobalRequestActions>> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { pageConfig } = action.payload;
    const { data, pagination, sortOrder } = (yield call(getTagsRequest, pageConfig)) as PagedResponseDTO<TagDTO[]>;
    yield put(setTagListAction({ data, pagination, sortOrder }));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

function* loadAllTagsData(
  action: LoadAllTagsAction,
): Generator<
  | CallEffect<DefaultResponseDTO<Pick<TagDTO, 'id' | 'title'>[]>>
  | PutEffect<TagActionTypes>
  | PutEffect<GlobalRequestActions>
> {
  const { type: actionType } = action;

  try {
    yield put(setRequestStartedAction(actionType));
    const { data } = (yield call(getAllTagsRequest)) as DefaultResponseDTO<Pick<TagDTO, 'id' | 'title'>[]>;
    yield put(setAllTagsAction(data));
    yield put(setRequestSucceededAction(actionType));
  } catch (error) {
    yield put(setRequestFailedAction(actionType, error as AxiosError));
  }
}

export default function* tagSaga(): Generator {
  yield takeLatest(CREATE_TAG, createNewTagSaga);
  yield takeLatest(LOAD_TAG, loadTagSaga);
  yield takeLatest(EDIT_TAG, editTagSaga);
  yield takeLatest(DELETE_TAG, deleteTagSaga);
  yield takeEvery(CLEAR_CURRENT_TAG, resetTagErrors);
  yield takeLatest(LOAD_TAG_LIST, loadTagsTableData);
  yield takeLatest(LOAD_ALL_TAGS, loadAllTagsData);
}
