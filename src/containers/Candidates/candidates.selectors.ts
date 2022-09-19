import { CandidateDTO } from './candidates.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectCandidate = (state: RootState): CandidateDTO | null => state.candidate.candidate;

export const selectCandidatesTableData = (state: RootState): CandidateDTO[] => state.candidate.candidateList.data;

export const selectAllCandidatesData = (
  state: RootState,
): Pick<CandidateDTO, 'id' | 'firstName' | 'lastName' | 'email'>[] => state.candidate.allCandidates;

export const selectCandidatesPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.candidate.candidateList.filter,
  limit: state.candidate.candidateList.pagination.limit,
  order: state.candidate.candidateList.sortOrder.order,
  page: state.candidate.candidateList.pagination.page,
  search: state.candidate.candidateList.search,
  sortBy: state.candidate.candidateList.sortOrder.sortBy,
  totalPages: state.candidate.candidateList.pagination.totalPages,
});
