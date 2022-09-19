import { CreateQuestionDTO, EditQuestionDTO, QuestionDTO } from './questions.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_QUESTION = 'CREATE_QUESTION';
export const LOAD_QUESTION = 'LOAD_QUESTION';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const SET_QUESTION = 'SET_QUESTION';
export const CLEAR_CURRENT_QUESTION = 'CLEAR_CURRENT_QUESTION';
export const LOAD_QUESTION_LIST = 'LOAD_QUESTION_LIST';
export const SET_QUESTION_LIST = 'SET_QUESTION_LIST';

export type QuestionsState = {
  question: QuestionDTO | null;
  questionList: TableListData<QuestionDTO>;
};

export interface CreateQuestionAction {
  type: typeof CREATE_QUESTION;
  payload: { data: CreateQuestionDTO };
}

export interface LoadQuestionAction {
  type: typeof LOAD_QUESTION;
  payload: { id: string };
}

export interface EditQuestionAction {
  type: typeof EDIT_QUESTION;
  payload: { data: EditQuestionDTO };
}

export interface DeleteQuestionAction {
  type: typeof DELETE_QUESTION;
  payload: { id: string };
}

export interface SetQuestionAction {
  type: typeof SET_QUESTION;
  payload: { data: QuestionDTO };
}

export interface ClearQuestionAction {
  type: typeof CLEAR_CURRENT_QUESTION;
}

export interface LoadQuestionListAction {
  type: typeof LOAD_QUESTION_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetQuestionListAction {
  type: typeof SET_QUESTION_LIST;
  payload: { tableData: TableListData<QuestionDTO> };
}

export type QuestionActionTypes =
  | CreateQuestionAction
  | LoadQuestionAction
  | EditQuestionAction
  | DeleteQuestionAction
  | SetQuestionAction
  | ClearQuestionAction
  | LoadQuestionListAction
  | SetQuestionListAction;
