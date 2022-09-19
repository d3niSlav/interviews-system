import { CreateJobPositionDTO, EditJobPositionDTO, JobPositionDTO } from './job-positions.dto';
import {
  CLEAR_CURRENT_JOB_POSITION,
  ClearJobPositionAction,
  CREATE_JOB_POSITION,
  CreateJobPositionAction,
  DELETE_JOB_POSITION,
  DeleteJobPositionAction,
  EDIT_JOB_POSITION,
  EditJobPositionAction,
  LOAD_ALL_JOB_POSITIONS,
  LOAD_JOB_POSITION,
  LOAD_JOB_POSITION_LIST,
  LoadAllJobPositionsAction,
  LoadJobPositionAction,
  LoadJobPositionListAction,
  SET_ALL_JOB_POSITIONS,
  SET_JOB_POSITION,
  SET_JOB_POSITION_LIST,
  SetAllJobPositionsAction,
  SetJobPositionAction,
  SetJobPositionListAction,
} from './job-positions.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewJobPositionAction = (data: CreateJobPositionDTO): CreateJobPositionAction => ({
  type: CREATE_JOB_POSITION,
  payload: { data },
});

export const editJobPositionAction = (data: EditJobPositionDTO): EditJobPositionAction => ({
  type: EDIT_JOB_POSITION,
  payload: { data },
});

export const loadJobPositionAction = (id: string): LoadJobPositionAction => ({
  type: LOAD_JOB_POSITION,
  payload: { id },
});

export const deleteJobPositionAction = (id: string): DeleteJobPositionAction => ({
  type: DELETE_JOB_POSITION,
  payload: { id },
});

export const setJobPositionAction = (data: JobPositionDTO): SetJobPositionAction => ({
  type: SET_JOB_POSITION,
  payload: { data },
});

export const clearCurrentJobPositionAction = (): ClearJobPositionAction => ({
  type: CLEAR_CURRENT_JOB_POSITION,
});

export const loadJobPositionListAction = (pageConfig?: PageSearchQueryConfig): LoadJobPositionListAction => ({
  type: LOAD_JOB_POSITION_LIST,
  payload: { pageConfig },
});

export const setJobPositionListAction = (tableData: TableListData<JobPositionDTO>): SetJobPositionListAction => ({
  type: SET_JOB_POSITION_LIST,
  payload: { tableData },
});

export const loadAllJobPositionsAction = (): LoadAllJobPositionsAction => ({
  type: LOAD_ALL_JOB_POSITIONS,
});

export const setAllJobPositionsAction = (data: Pick<JobPositionDTO, 'id' | 'title'>[]): SetAllJobPositionsAction => ({
  type: SET_ALL_JOB_POSITIONS,
  payload: { data },
});
