import { JobPositionDTO } from './job-positions.dto';
import {
  CLEAR_CURRENT_JOB_POSITION,
  JobPositionActionTypes,
  JobPositionsState,
  LOAD_JOB_POSITION_LIST,
  SET_ALL_JOB_POSITIONS,
  SET_JOB_POSITION,
  SET_JOB_POSITION_LIST,
} from './job-positions.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: JobPositionsState = {
  jobPosition: null,
  jobPositionList: getTableListDefaultState<JobPositionDTO>(),
  allJobPositions: [],
};

const jobPositionsReducer = (state = initialState, action: JobPositionActionTypes): JobPositionsState => {
  switch (action.type) {
    case CLEAR_CURRENT_JOB_POSITION: {
      return {
        ...state,
        jobPosition: null,
      };
    }
    case SET_JOB_POSITION: {
      return {
        ...state,
        jobPosition: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_JOB_POSITION_LIST: {
      return {
        ...state,
        jobPositionList: {
          ...state.jobPositionList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_JOB_POSITION_LIST: {
      return {
        ...state,
        jobPositionList: {
          ...state.jobPositionList,
          ...action.payload.tableData,
        },
      };
    }
    case SET_ALL_JOB_POSITIONS: {
      return {
        ...state,
        allJobPositions: [...action.payload.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default jobPositionsReducer;
