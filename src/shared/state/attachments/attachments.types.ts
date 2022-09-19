import { FormErrors } from '../../constants';

export const CREATE_SINGLE_ATTACHMENT_SUBMIT = 'CREATE_SINGLE_ATTACHMENT_SUBMIT';
export const EDIT_SINGLE_ATTACHMENT_SUBMIT = 'EDIT_SINGLE_ATTACHMENT_SUBMIT';
export const DELETE_SINGLE_ATTACHMENT_SUBMIT = 'DELETE_SINGLE_ATTACHMENT_SUBMIT';
export const LOAD_SINGLE_ATTACHMENT_SUBMIT = 'LOAD_SINGLE_ATTACHMENT_SUBMIT';
export const LOAD_SINGLE_ATTACHMENT_SUCCESS = 'LOAD_SINGLE_ATTACHMENT_SUCCESS';
export const LOAD_SINGLE_ATTACHMENT_FAILURE = 'LOAD_SINGLE_ATTACHMENT_FAILURE';

export interface AttachmentDTO {
  id: number;
  path: string;
  size: number;
  name: string;
  mimetype: string;
  createdAt: string;
}

export interface ImageAttachment extends AttachmentDTO {
  base64: string;
}

export interface AttachmentResponseDTO {
  data: AttachmentDTO;
  message: string;
}

export interface CreateSingleAttachmentSubmitAction {
  type: typeof CREATE_SINGLE_ATTACHMENT_SUBMIT;
  payload: FormData;
}

export interface DeleteSingleAttachmentSubmitAction {
  type: typeof DELETE_SINGLE_ATTACHMENT_SUBMIT;
  payload: { attachmentId: number };
}

export interface LoadSingleAttachmentSubmitAction {
  type: typeof LOAD_SINGLE_ATTACHMENT_SUBMIT;
  payload: { attachmentId: number };
}

export interface LoadSingleAttachmentSuccessAction {
  type: typeof LOAD_SINGLE_ATTACHMENT_SUCCESS;
  payload: AttachmentDTO;
}

export interface LoadSingleAttachmentFailureAction {
  type: typeof LOAD_SINGLE_ATTACHMENT_FAILURE;
  payload: {
    errorMessage: string;
    errors?: FormErrors;
  };
}

export interface SingleAttachmentState {
  current: AttachmentDTO;
  errorMessage: string;
  errors: FormErrors;
  isLoading: boolean;
}

export type SingleAttachmentActionTypes =
  | CreateSingleAttachmentSubmitAction
  | DeleteSingleAttachmentSubmitAction
  | LoadSingleAttachmentSuccessAction
  | LoadSingleAttachmentFailureAction;
