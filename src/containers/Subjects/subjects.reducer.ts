import { SubjectDTO } from './subjects.dto';
import {
  CLEAR_CURRENT_SUBJECT,
  LOAD_SUBJECT_LIST,
  SET_ALL_SUBJECTS,
  SET_SUBJECT,
  SET_SUBJECT_LIST,
  SubjectActionTypes,
  SubjectsState,
} from './subjects.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: SubjectsState = {
  subject: null,
  subjectList: getTableListDefaultState<SubjectDTO>(),
  subjectAll: [],
};

const subjectsReducer = (state = initialState, action: SubjectActionTypes): SubjectsState => {
  switch (action.type) {
    case CLEAR_CURRENT_SUBJECT: {
      return {
        ...state,
        subject: null,
      };
    }
    case SET_SUBJECT: {
      return {
        ...state,
        subject: {
          ...action.payload.data,
        },
      };
    }
    case SET_ALL_SUBJECTS: {
      return {
        ...state,
        subjectAll: [...action.payload.data],
      };
    }
    case LOAD_SUBJECT_LIST: {
      return {
        ...state,
        subjectList: {
          ...state.subjectList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_SUBJECT_LIST: {
      return {
        ...state,
        subjectList: {
          ...state.subjectList,
          ...action.payload.tableData,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default subjectsReducer;
