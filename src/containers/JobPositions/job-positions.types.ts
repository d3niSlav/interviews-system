import { CreateJobPositionDTO, EditJobPositionDTO, JobPositionDTO } from './job-positions.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_JOB_POSITION = 'CREATE_JOB_POSITION';
export const LOAD_JOB_POSITION = 'LOAD_JOB_POSITION';
export const EDIT_JOB_POSITION = 'EDIT_JOB_POSITION';
export const DELETE_JOB_POSITION = 'DELETE_JOB_POSITION';
export const SET_JOB_POSITION = 'SET_JOB_POSITION';
export const CLEAR_CURRENT_JOB_POSITION = 'CLEAR_CURRENT_JOB_POSITION';
export const LOAD_JOB_POSITION_LIST = 'LOAD_JOB_POSITION_LIST';
export const SET_JOB_POSITION_LIST = 'SET_JOB_POSITION_LIST';
export const LOAD_ALL_JOB_POSITIONS = 'LOAD_ALL_JOB_POSITIONS';
export const SET_ALL_JOB_POSITIONS = 'SET_ALL_JOB_POSITIONS';

export type JobPositionsState = {
  jobPosition: JobPositionDTO | null;
  jobPositionList: TableListData<JobPositionDTO>;
  allJobPositions: Pick<JobPositionDTO, 'id' | 'title'>[];
};

export interface CreateJobPositionAction {
  type: typeof CREATE_JOB_POSITION;
  payload: { data: CreateJobPositionDTO };
}

export interface LoadJobPositionAction {
  type: typeof LOAD_JOB_POSITION;
  payload: { id: string };
}

export interface EditJobPositionAction {
  type: typeof EDIT_JOB_POSITION;
  payload: { data: EditJobPositionDTO };
}

export interface DeleteJobPositionAction {
  type: typeof DELETE_JOB_POSITION;
  payload: { id: string };
}

export interface SetJobPositionAction {
  type: typeof SET_JOB_POSITION;
  payload: { data: JobPositionDTO };
}

export interface ClearJobPositionAction {
  type: typeof CLEAR_CURRENT_JOB_POSITION;
}

export interface LoadJobPositionListAction {
  type: typeof LOAD_JOB_POSITION_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetJobPositionListAction {
  type: typeof SET_JOB_POSITION_LIST;
  payload: { tableData: TableListData<JobPositionDTO> };
}

export interface LoadAllJobPositionsAction {
  type: typeof LOAD_ALL_JOB_POSITIONS;
}

export interface SetAllJobPositionsAction {
  type: typeof SET_ALL_JOB_POSITIONS;
  payload: { data: Pick<JobPositionDTO, 'id' | 'title'>[] };
}

export type JobPositionActionTypes =
  | CreateJobPositionAction
  | LoadJobPositionAction
  | EditJobPositionAction
  | DeleteJobPositionAction
  | SetJobPositionAction
  | ClearJobPositionAction
  | LoadJobPositionListAction
  | SetJobPositionListAction
  | LoadAllJobPositionsAction
  | SetAllJobPositionsAction;
