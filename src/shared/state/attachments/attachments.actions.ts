import {
  CREATE_SINGLE_ATTACHMENT_SUBMIT,
  CreateSingleAttachmentSubmitAction,
  LOAD_SINGLE_ATTACHMENT_FAILURE,
  LOAD_SINGLE_ATTACHMENT_SUBMIT,
  LOAD_SINGLE_ATTACHMENT_SUCCESS,
  DELETE_SINGLE_ATTACHMENT_SUBMIT,
  LoadSingleAttachmentFailureAction,
  LoadSingleAttachmentSubmitAction,
  LoadSingleAttachmentSuccessAction,
  DeleteSingleAttachmentSubmitAction,
  AttachmentDTO,
} from './attachments.types';
import { FormErrors } from '../../constants';

export const createNewAttachmentAction = (attachmentData: FormData): CreateSingleAttachmentSubmitAction => ({
  type: CREATE_SINGLE_ATTACHMENT_SUBMIT,
  payload: attachmentData,
});

export const deleteAttachmentAction = (attachmentId: number): DeleteSingleAttachmentSubmitAction => ({
  type: DELETE_SINGLE_ATTACHMENT_SUBMIT,
  payload: { attachmentId },
});

export const loadSingleAttachmentAction = (attachmentId: number): LoadSingleAttachmentSubmitAction => ({
  type: LOAD_SINGLE_ATTACHMENT_SUBMIT,
  payload: { attachmentId },
});

export const loadSingleAttachmentSuccessAction = (data: AttachmentDTO): LoadSingleAttachmentSuccessAction => ({
  type: LOAD_SINGLE_ATTACHMENT_SUCCESS,
  payload: data,
});

export const loadSingleAttachmentFailureAction = (
  errorMessage: string,
  errors?: FormErrors,
): LoadSingleAttachmentFailureAction => ({
  type: LOAD_SINGLE_ATTACHMENT_FAILURE,
  payload: { errorMessage, errors },
});
