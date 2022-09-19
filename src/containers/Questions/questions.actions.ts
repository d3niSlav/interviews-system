import { CreateQuestionDTO, EditQuestionDTO, QuestionDTO } from './questions.dto';
import {
  CLEAR_CURRENT_QUESTION,
  ClearQuestionAction,
  CREATE_QUESTION,
  CreateQuestionAction,
  DELETE_QUESTION,
  DeleteQuestionAction,
  EDIT_QUESTION,
  EditQuestionAction,
  LOAD_QUESTION,
  LOAD_QUESTION_LIST,
  LoadQuestionAction,
  LoadQuestionListAction,
  SET_QUESTION,
  SET_QUESTION_LIST,
  SetQuestionAction,
  SetQuestionListAction,
} from './questions.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewQuestionAction = (data: CreateQuestionDTO): CreateQuestionAction => ({
  type: CREATE_QUESTION,
  payload: { data },
});

export const editQuestionAction = (data: EditQuestionDTO): EditQuestionAction => ({
  type: EDIT_QUESTION,
  payload: { data },
});

export const loadQuestionAction = (id: string): LoadQuestionAction => ({
  type: LOAD_QUESTION,
  payload: { id },
});

export const deleteQuestionAction = (id: string): DeleteQuestionAction => ({
  type: DELETE_QUESTION,
  payload: { id },
});

export const setQuestionAction = (data: QuestionDTO): SetQuestionAction => ({
  type: SET_QUESTION,
  payload: { data },
});

export const clearCurrentQuestionAction = (): ClearQuestionAction => ({
  type: CLEAR_CURRENT_QUESTION,
});

export const loadQuestionListAction = (pageConfig?: PageSearchQueryConfig): LoadQuestionListAction => ({
  type: LOAD_QUESTION_LIST,
  payload: { pageConfig },
});

export const setQuestionListAction = (tableData: TableListData<QuestionDTO>): SetQuestionListAction => ({
  type: SET_QUESTION_LIST,
  payload: { tableData },
});
