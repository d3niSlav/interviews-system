import {
  CREATE_SINGLE_ATTACHMENT_SUBMIT,
  LOAD_SINGLE_ATTACHMENT_FAILURE,
  LOAD_SINGLE_ATTACHMENT_SUCCESS,
  AttachmentDTO,
  SingleAttachmentActionTypes,
  SingleAttachmentState,
} from './attachments.types';

const initialState: SingleAttachmentState = {
  current: {} as AttachmentDTO,
  errorMessage: '',
  errors: {},
  isLoading: false,
};

export default (state = initialState, action: SingleAttachmentActionTypes): SingleAttachmentState => {
  switch (action.type) {
    case CREATE_SINGLE_ATTACHMENT_SUBMIT: {
      return {
        ...state,
        current: {
          ...state.current,
          ...(action.payload as FormData),
        },
        errorMessage: '',
        errors: {},
        isLoading: true,
      };
    }
    case LOAD_SINGLE_ATTACHMENT_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        errors: action.payload.errors || {},
        isLoading: false,
      };
    }
    case LOAD_SINGLE_ATTACHMENT_SUCCESS: {
      return {
        ...state,
        current: action.payload,
        errorMessage: '',
        errors: {},
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
