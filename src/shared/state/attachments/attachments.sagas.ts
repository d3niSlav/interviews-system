import { call, CallEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';

import * as api from './attachments.api';
import {
  CREATE_SINGLE_ATTACHMENT_SUBMIT,
  LOAD_SINGLE_ATTACHMENT_SUBMIT,
  DELETE_SINGLE_ATTACHMENT_SUBMIT,
  CreateSingleAttachmentSubmitAction,
  LoadSingleAttachmentSubmitAction,
  AttachmentResponseDTO,
  SingleAttachmentActionTypes,
  DeleteSingleAttachmentSubmitAction,
} from './attachments.types';
import { BasicResponseDTO } from '../../constants';
import { loadSingleAttachmentFailureAction, loadSingleAttachmentSuccessAction } from './attachments.actions';

function* loadSingleAttachment(
  action: LoadSingleAttachmentSubmitAction,
): Generator<CallEffect<AttachmentResponseDTO> | PutEffect<SingleAttachmentActionTypes>> {
  try {
    const { data } = (yield call(api.getAttachment, action.payload.attachmentId)) as AttachmentResponseDTO;
    yield put(loadSingleAttachmentSuccessAction(data));
  } catch (error: any) {
    yield put(loadSingleAttachmentSuccessAction(error.errorMessage));
  }
}

function* createNewAttachment(
  action: CreateSingleAttachmentSubmitAction,
): Generator<CallEffect<AttachmentResponseDTO> | PutEffect<SingleAttachmentActionTypes>> {
  try {
    const { data: newAttachment } = (yield call(api.createAttachment, action.payload)) as AttachmentResponseDTO;
    if (newAttachment) {
      yield put(loadSingleAttachmentSuccessAction(newAttachment));
    }
  } catch (error: any) {
    const { errorMessage, errors } = error.response.data;
    yield put(loadSingleAttachmentFailureAction(errorMessage, errors));
  }
}

function* deleteAttachment(
  action: DeleteSingleAttachmentSubmitAction,
): Generator<CallEffect<BasicResponseDTO> | PutEffect<SingleAttachmentActionTypes>> {
  try {
    yield call(api.deleteAttachment, action.payload.attachmentId);
  } catch (error: any) {
    const { errorMessage, errors } = error.response.data;
    yield put(loadSingleAttachmentFailureAction(errorMessage, errors));
  }
}

export default function* attachmentsSaga(): Generator {
  yield takeEvery(CREATE_SINGLE_ATTACHMENT_SUBMIT, createNewAttachment);
  yield takeEvery(LOAD_SINGLE_ATTACHMENT_SUBMIT, loadSingleAttachment);
  yield takeEvery(DELETE_SINGLE_ATTACHMENT_SUBMIT, deleteAttachment);
}
