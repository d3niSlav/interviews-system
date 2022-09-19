import { CandidateDTO, CreateCandidateDTO, EditCandidateDTO } from './candidates.dto';
import {
  CLEAR_CURRENT_CANDIDATE,
  ClearCandidateAction,
  CREATE_CANDIDATE,
  CreateCandidateAction,
  DELETE_CANDIDATE,
  DeleteCandidateAction,
  EDIT_CANDIDATE,
  EditCandidateAction,
  LOAD_ALL_CANDIDATES,
  LOAD_CANDIDATE,
  LOAD_CANDIDATE_LIST,
  LoadAllCandidatesAction,
  LoadCandidateAction,
  LoadCandidateListAction,
  SET_ALL_CANDIDATES,
  SET_CANDIDATE,
  SET_CANDIDATE_LIST,
  SetAllCandidatesAction,
  SetCandidateAction,
  SetCandidateListAction,
} from './candidates.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewCandidateAction = (data: CreateCandidateDTO): CreateCandidateAction => ({
  type: CREATE_CANDIDATE,
  payload: { data },
});

export const editCandidateAction = (data: EditCandidateDTO): EditCandidateAction => ({
  type: EDIT_CANDIDATE,
  payload: { data },
});

export const loadCandidateAction = (id: string): LoadCandidateAction => ({
  type: LOAD_CANDIDATE,
  payload: { id },
});

export const deleteCandidateAction = (id: string): DeleteCandidateAction => ({
  type: DELETE_CANDIDATE,
  payload: { id },
});

export const setCandidateAction = (data: CandidateDTO): SetCandidateAction => ({
  type: SET_CANDIDATE,
  payload: { data },
});

export const clearCurrentCandidateAction = (): ClearCandidateAction => ({
  type: CLEAR_CURRENT_CANDIDATE,
});

export const loadCandidateListAction = (pageConfig?: PageSearchQueryConfig): LoadCandidateListAction => ({
  type: LOAD_CANDIDATE_LIST,
  payload: { pageConfig },
});

export const setCandidateListAction = (tableData: TableListData<CandidateDTO>): SetCandidateListAction => ({
  type: SET_CANDIDATE_LIST,
  payload: { tableData },
});

export const loadAllCandidatesAction = (): LoadAllCandidatesAction => ({
  type: LOAD_ALL_CANDIDATES,
});

export const setAllCandidatesAction = (
  data: Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[],
): SetAllCandidatesAction => ({
  type: SET_ALL_CANDIDATES,
  payload: { data },
});
