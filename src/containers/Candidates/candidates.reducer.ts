import { CandidateDTO } from './candidates.dto';
import {
  CandidateActionTypes,
  CandidatesState,
  CLEAR_CURRENT_CANDIDATE,
  LOAD_CANDIDATE_LIST,
  SET_ALL_CANDIDATES,
  SET_CANDIDATE,
  SET_CANDIDATE_LIST,
} from './candidates.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: CandidatesState = {
  candidate: null,
  candidateList: getTableListDefaultState<CandidateDTO>(),
  allCandidates: [],
};

const candidatesReducer = (state = initialState, action: CandidateActionTypes): CandidatesState => {
  switch (action.type) {
    case CLEAR_CURRENT_CANDIDATE: {
      return {
        ...state,
        candidate: null,
      };
    }
    case SET_CANDIDATE: {
      return {
        ...state,
        candidate: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_CANDIDATE_LIST: {
      return {
        ...state,
        candidateList: {
          ...state.candidateList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_CANDIDATE_LIST: {
      return {
        ...state,
        candidateList: {
          ...state.candidateList,
          ...action.payload.tableData,
        },
      };
    }
    case SET_ALL_CANDIDATES: {
      return {
        ...state,
        allCandidates: [...action.payload.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default candidatesReducer;
