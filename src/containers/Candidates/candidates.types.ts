import { CreateCandidateDTO, EditCandidateDTO, CandidateDTO } from './candidates.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_CANDIDATE = 'CREATE_CANDIDATE';
export const LOAD_CANDIDATE = 'LOAD_CANDIDATE';
export const EDIT_CANDIDATE = 'EDIT_CANDIDATE';
export const DELETE_CANDIDATE = 'DELETE_CANDIDATE';
export const SET_CANDIDATE = 'SET_CANDIDATE';
export const CLEAR_CURRENT_CANDIDATE = 'CLEAR_CURRENT_CANDIDATE';
export const LOAD_CANDIDATE_LIST = 'LOAD_CANDIDATE_LIST';
export const SET_CANDIDATE_LIST = 'SET_CANDIDATE_LIST';
export const LOAD_ALL_CANDIDATES = 'LOAD_ALL_CANDIDATES';
export const SET_ALL_CANDIDATES = 'SET_ALL_CANDIDATES';

export type CandidatesState = {
  candidate: CandidateDTO | null;
  candidateList: TableListData<CandidateDTO>;
  allCandidates: Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[];
};

export interface CreateCandidateAction {
  type: typeof CREATE_CANDIDATE;
  payload: { data: CreateCandidateDTO };
}

export interface LoadCandidateAction {
  type: typeof LOAD_CANDIDATE;
  payload: { id: string };
}

export interface EditCandidateAction {
  type: typeof EDIT_CANDIDATE;
  payload: { data: EditCandidateDTO };
}

export interface DeleteCandidateAction {
  type: typeof DELETE_CANDIDATE;
  payload: { id: string };
}

export interface SetCandidateAction {
  type: typeof SET_CANDIDATE;
  payload: { data: CandidateDTO };
}

export interface ClearCandidateAction {
  type: typeof CLEAR_CURRENT_CANDIDATE;
}

export interface LoadCandidateListAction {
  type: typeof LOAD_CANDIDATE_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetCandidateListAction {
  type: typeof SET_CANDIDATE_LIST;
  payload: { tableData: TableListData<CandidateDTO> };
}

export interface LoadAllCandidatesAction {
  type: typeof LOAD_ALL_CANDIDATES;
}

export interface SetAllCandidatesAction {
  type: typeof SET_ALL_CANDIDATES;
  payload: { data: Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[] };
}

export type CandidateActionTypes =
  | CreateCandidateAction
  | LoadCandidateAction
  | EditCandidateAction
  | DeleteCandidateAction
  | SetCandidateAction
  | ClearCandidateAction
  | LoadCandidateListAction
  | SetCandidateListAction
  | LoadAllCandidatesAction
  | SetAllCandidatesAction;
