import { CreateJobTitleDTO, EditJobTitleDTO, JobTitleDTO, ProgrammingLanguageDTO } from './job-titles.dto';
import {
  CLEAR_CURRENT_JOB_TITLE,
  ClearJobTitleAction,
  CREATE_JOB_TITLE,
  CreateJobTitleAction,
  DELETE_JOB_TITLE,
  DeleteJobTitleAction,
  EDIT_JOB_TITLE,
  EditJobTitleAction,
  LOAD_ALL_JOB_TITLES,
  LOAD_ALL_PROGRAMMING_LANGUAGES,
  LOAD_JOB_TITLE,
  LOAD_JOB_TITLE_LIST,
  LoadAllJobTitlesAction,
  LoadAllProgrammingLanguagesAction,
  LoadJobTitleAction,
  LoadJobTitleListAction,
  SET_ALL_JOB_TITLES,
  SET_ALL_PROGRAMMING_LANGUAGES,
  SET_JOB_TITLE,
  SET_JOB_TITLE_LIST,
  SetAllJobTitlesAction,
  SetAllProgrammingLanguagesAction,
  SetJobTitleAction,
  SetJobTitleListAction,
} from './job-titles.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewJobTitleAction = (data: CreateJobTitleDTO): CreateJobTitleAction => ({
  type: CREATE_JOB_TITLE,
  payload: { data },
});

export const editJobTitleAction = (data: EditJobTitleDTO): EditJobTitleAction => ({
  type: EDIT_JOB_TITLE,
  payload: { data },
});

export const loadJobTitleAction = (id: string): LoadJobTitleAction => ({
  type: LOAD_JOB_TITLE,
  payload: { id },
});

export const deleteJobTitleAction = (id: string): DeleteJobTitleAction => ({
  type: DELETE_JOB_TITLE,
  payload: { id },
});

export const setJobTitleAction = (data: JobTitleDTO): SetJobTitleAction => ({
  type: SET_JOB_TITLE,
  payload: { data },
});

export const clearCurrentJobTitleAction = (): ClearJobTitleAction => ({
  type: CLEAR_CURRENT_JOB_TITLE,
});

export const loadJobTitleListAction = (pageConfig?: PageSearchQueryConfig): LoadJobTitleListAction => ({
  type: LOAD_JOB_TITLE_LIST,
  payload: { pageConfig },
});

export const setJobTitleListAction = (tableData: TableListData<JobTitleDTO>): SetJobTitleListAction => ({
  type: SET_JOB_TITLE_LIST,
  payload: { tableData },
});

export const loadAllJobTitlesAction = (): LoadAllJobTitlesAction => ({
  type: LOAD_ALL_JOB_TITLES,
});

export const setAllJobTitlesAction = (data: Pick<JobTitleDTO, 'id' | 'title'>[]): SetAllJobTitlesAction => ({
  type: SET_ALL_JOB_TITLES,
  payload: { data },
});

export const loadAllProgrammingLanguagesAction = (): LoadAllProgrammingLanguagesAction => ({
  type: LOAD_ALL_PROGRAMMING_LANGUAGES,
});

export const setAllProgrammingLanguagesAction = (
  data: Pick<ProgrammingLanguageDTO, 'id' | 'title'>[],
): SetAllProgrammingLanguagesAction => ({
  type: SET_ALL_PROGRAMMING_LANGUAGES,
  payload: { data },
});
