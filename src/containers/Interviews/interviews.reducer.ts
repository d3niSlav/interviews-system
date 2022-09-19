import { InterviewDTO } from './interviews.dto';
import {
  CLEAR_CURRENT_INTERVIEW,
  InterviewActionTypes,
  InterviewsState,
  LOAD_INTERVIEW_LIST,
  SET_INTERVIEW,
  SET_INTERVIEW_LIST,
} from './interviews.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: InterviewsState = {
  interview: null,
  interviewList: getTableListDefaultState<InterviewDTO>(),
};

const interviewsReducer = (state = initialState, action: InterviewActionTypes): InterviewsState => {
  switch (action.type) {
    case CLEAR_CURRENT_INTERVIEW: {
      return {
        ...state,
        interview: null,
      };
    }
    case SET_INTERVIEW: {
      return {
        ...state,
        interview: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_INTERVIEW_LIST: {
      return {
        ...state,
        interviewList: {
          ...state.interviewList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_INTERVIEW_LIST: {
      return {
        ...state,
        interviewList: {
          ...state.interviewList,
          ...action.payload.tableData,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default interviewsReducer;
