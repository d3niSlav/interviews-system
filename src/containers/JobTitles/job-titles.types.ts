import { CreateJobTitleDTO, EditJobTitleDTO, JobTitleDTO, ProgrammingLanguageDTO } from './job-titles.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_JOB_TITLE = 'CREATE_JOB_TITLE';
export const LOAD_JOB_TITLE = 'LOAD_JOB_TITLE';
export const EDIT_JOB_TITLE = 'EDIT_JOB_TITLE';
export const DELETE_JOB_TITLE = 'DELETE_JOB_TITLE';
export const SET_JOB_TITLE = 'SET_JOB_TITLE';
export const CLEAR_CURRENT_JOB_TITLE = 'CLEAR_CURRENT_JOB_TITLE';
export const LOAD_JOB_TITLE_LIST = 'LOAD_JOB_TITLE_LIST';
export const SET_JOB_TITLE_LIST = 'SET_JOB_TITLE_LIST';
export const LOAD_ALL_JOB_TITLES = 'LOAD_ALL_JOB_TITLES';
export const SET_ALL_JOB_TITLES = 'SET_ALL_JOB_TITLES';
export const LOAD_ALL_PROGRAMMING_LANGUAGES = 'LOAD_ALL_PROGRAMMING_LANGUAGES';
export const SET_ALL_PROGRAMMING_LANGUAGES = 'SET_ALL_PROGRAMMING_LANGUAGES';

export type JobTitlesState = {
  jobTitle: JobTitleDTO | null;
  jobTitleList: TableListData<JobTitleDTO>;
  allJobTitles: Pick<JobTitleDTO, 'id' | 'title'>[];
  allProgrammingLanguages: Pick<ProgrammingLanguageDTO, 'id' | 'title'>[];
};

export interface CreateJobTitleAction {
  type: typeof CREATE_JOB_TITLE;
  payload: { data: CreateJobTitleDTO };
}

export interface LoadJobTitleAction {
  type: typeof LOAD_JOB_TITLE;
  payload: { id: string };
}

export interface EditJobTitleAction {
  type: typeof EDIT_JOB_TITLE;
  payload: { data: EditJobTitleDTO };
}

export interface DeleteJobTitleAction {
  type: typeof DELETE_JOB_TITLE;
  payload: { id: string };
}

export interface SetJobTitleAction {
  type: typeof SET_JOB_TITLE;
  payload: { data: JobTitleDTO };
}

export interface ClearJobTitleAction {
  type: typeof CLEAR_CURRENT_JOB_TITLE;
}

export interface LoadJobTitleListAction {
  type: typeof LOAD_JOB_TITLE_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetJobTitleListAction {
  type: typeof SET_JOB_TITLE_LIST;
  payload: { tableData: TableListData<JobTitleDTO> };
}

export interface LoadAllJobTitlesAction {
  type: typeof LOAD_ALL_JOB_TITLES;
}

export interface SetAllJobTitlesAction {
  type: typeof SET_ALL_JOB_TITLES;
  payload: { data: Pick<JobTitleDTO, 'id' | 'title'>[] };
}

export interface LoadAllProgrammingLanguagesAction {
  type: typeof LOAD_ALL_PROGRAMMING_LANGUAGES;
}

export interface SetAllProgrammingLanguagesAction {
  type: typeof SET_ALL_PROGRAMMING_LANGUAGES;
  payload: { data: Pick<ProgrammingLanguageDTO, 'id' | 'title'>[] };
}

export type JobTitleActionTypes =
  | CreateJobTitleAction
  | LoadJobTitleAction
  | EditJobTitleAction
  | DeleteJobTitleAction
  | SetJobTitleAction
  | ClearJobTitleAction
  | LoadJobTitleListAction
  | SetJobTitleListAction
  | LoadAllJobTitlesAction
  | SetAllJobTitlesAction
  | LoadAllProgrammingLanguagesAction
  | SetAllProgrammingLanguagesAction;
