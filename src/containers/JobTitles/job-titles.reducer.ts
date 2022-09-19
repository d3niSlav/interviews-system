import { JobTitleDTO } from './job-titles.dto';
import {
  CLEAR_CURRENT_JOB_TITLE,
  JobTitleActionTypes,
  JobTitlesState,
  LOAD_JOB_TITLE_LIST,
  SET_ALL_JOB_TITLES,
  SET_ALL_PROGRAMMING_LANGUAGES,
  SET_JOB_TITLE,
  SET_JOB_TITLE_LIST,
} from './job-titles.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: JobTitlesState = {
  jobTitle: null,
  jobTitleList: getTableListDefaultState<JobTitleDTO>(),
  allJobTitles: [],
  allProgrammingLanguages: [],
};

const jobTitlesReducer = (state = initialState, action: JobTitleActionTypes): JobTitlesState => {
  switch (action.type) {
    case CLEAR_CURRENT_JOB_TITLE: {
      return {
        ...state,
        jobTitle: null,
      };
    }
    case SET_JOB_TITLE: {
      return {
        ...state,
        jobTitle: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_JOB_TITLE_LIST: {
      return {
        ...state,
        jobTitleList: {
          ...state.jobTitleList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_JOB_TITLE_LIST: {
      return {
        ...state,
        jobTitleList: {
          ...state.jobTitleList,
          ...action.payload.tableData,
        },
      };
    }
    case SET_ALL_JOB_TITLES: {
      return {
        ...state,
        allJobTitles: [...action.payload.data],
      };
    }
    case SET_ALL_PROGRAMMING_LANGUAGES: {
      return {
        ...state,
        allProgrammingLanguages: [...action.payload.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default jobTitlesReducer;
