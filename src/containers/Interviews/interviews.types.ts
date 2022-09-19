import { CreateInterviewDTO, EditInterviewDTO, InterviewDTO } from './interviews.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_INTERVIEW = 'CREATE_INTERVIEW';
export const LOAD_INTERVIEW = 'LOAD_INTERVIEW';
export const EDIT_INTERVIEW = 'EDIT_INTERVIEW';
export const DELETE_INTERVIEW = 'DELETE_INTERVIEW';
export const SET_INTERVIEW = 'SET_INTERVIEW';
export const CLEAR_CURRENT_INTERVIEW = 'CLEAR_CURRENT_INTERVIEW';
export const LOAD_INTERVIEW_LIST = 'LOAD_INTERVIEW_LIST';
export const SET_INTERVIEW_LIST = 'SET_INTERVIEW_LIST';

export type InterviewsState = {
  interview: InterviewDTO | null;
  interviewList: TableListData<InterviewDTO>;
};

export interface CreateInterviewAction {
  type: typeof CREATE_INTERVIEW;
  payload: { data: CreateInterviewDTO };
}

export interface LoadInterviewAction {
  type: typeof LOAD_INTERVIEW;
  payload: { id: string };
}

export interface EditInterviewAction {
  type: typeof EDIT_INTERVIEW;
  payload: { data: EditInterviewDTO };
}

export interface DeleteInterviewAction {
  type: typeof DELETE_INTERVIEW;
  payload: { id: string };
}

export interface SetInterviewAction {
  type: typeof SET_INTERVIEW;
  payload: { data: InterviewDTO };
}

export interface ClearInterviewAction {
  type: typeof CLEAR_CURRENT_INTERVIEW;
}

export interface LoadInterviewListAction {
  type: typeof LOAD_INTERVIEW_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetInterviewListAction {
  type: typeof SET_INTERVIEW_LIST;
  payload: { tableData: TableListData<InterviewDTO> };
}

export type InterviewActionTypes =
  | CreateInterviewAction
  | LoadInterviewAction
  | EditInterviewAction
  | DeleteInterviewAction
  | SetInterviewAction
  | ClearInterviewAction
  | LoadInterviewListAction
  | SetInterviewListAction;
