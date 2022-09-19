import { CreateSubjectDTO, EditSubjectDTO, SubjectDTO } from './subjects.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_SUBJECT = 'CREATE_SUBJECT';
export const LOAD_SUBJECT = 'LOAD_SUBJECT';
export const EDIT_SUBJECT = 'EDIT_SUBJECT';
export const DELETE_SUBJECT = 'DELETE_SUBJECT';
export const SET_SUBJECT = 'SET_SUBJECT';
export const LOAD_ALL_SUBJECTS = 'LOAD_ALL_SUBJECTS';
export const SET_ALL_SUBJECTS = 'SET_ALL_SUBJECTS';
export const CLEAR_CURRENT_SUBJECT = 'CLEAR_CURRENT_SUBJECT';
export const LOAD_SUBJECT_LIST = 'LOAD_SUBJECT_LIST';
export const SET_SUBJECT_LIST = 'SET_SUBJECT_LIST';

export type SubjectsState = {
  subject: SubjectDTO | null;
  subjectList: TableListData<SubjectDTO>;
  subjectAll: Pick<SubjectDTO, 'id' | 'title'>[];
};

export interface CreateSubjectAction {
  type: typeof CREATE_SUBJECT;
  payload: { data: CreateSubjectDTO };
}

export interface LoadSubjectAction {
  type: typeof LOAD_SUBJECT;
  payload: { id: string };
}

export interface EditSubjectAction {
  type: typeof EDIT_SUBJECT;
  payload: { data: EditSubjectDTO };
}

export interface DeleteSubjectAction {
  type: typeof DELETE_SUBJECT;
  payload: { id: string };
}

export interface SetSubjectAction {
  type: typeof SET_SUBJECT;
  payload: { data: SubjectDTO };
}

export interface ClearSubjectAction {
  type: typeof CLEAR_CURRENT_SUBJECT;
}

export interface LoadSubjectListAction {
  type: typeof LOAD_SUBJECT_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetSubjectListAction {
  type: typeof SET_SUBJECT_LIST;
  payload: { tableData: TableListData<SubjectDTO> };
}

export interface LoadAllSubjectsAction {
  type: typeof LOAD_ALL_SUBJECTS;
}

export interface SetAllSubjectsAction {
  type: typeof SET_ALL_SUBJECTS;
  payload: { data: Pick<SubjectDTO, 'id' | 'title'>[] };
}

export type SubjectActionTypes =
  | CreateSubjectAction
  | LoadSubjectAction
  | EditSubjectAction
  | DeleteSubjectAction
  | SetSubjectAction
  | ClearSubjectAction
  | LoadSubjectListAction
  | SetSubjectListAction
  | LoadAllSubjectsAction
  | SetAllSubjectsAction;
