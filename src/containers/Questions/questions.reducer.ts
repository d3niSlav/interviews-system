import { QuestionDTO } from './questions.dto';
import {
  CLEAR_CURRENT_QUESTION,
  QuestionActionTypes,
  QuestionsState,
  LOAD_QUESTION_LIST,
  SET_QUESTION,
  SET_QUESTION_LIST,
} from './questions.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: QuestionsState = {
  question: null,
  questionList: getTableListDefaultState<QuestionDTO>(),
};

const questionsReducer = (state = initialState, action: QuestionActionTypes): QuestionsState => {
  switch (action.type) {
    case CLEAR_CURRENT_QUESTION: {
      return {
        ...state,
        question: null,
      };
    }
    case SET_QUESTION: {
      return {
        ...state,
        question: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_QUESTION_LIST: {
      return {
        ...state,
        questionList: {
          ...state.questionList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_QUESTION_LIST: {
      return {
        ...state,
        questionList: {
          ...state.questionList,
          ...action.payload.tableData,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default questionsReducer;
