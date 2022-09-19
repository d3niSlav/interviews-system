import { JobPositionDTO } from './job-positions.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectJobPosition = (state: RootState): JobPositionDTO | null => state.jobPosition.jobPosition;

export const selectJobPositionsTableData = (state: RootState): JobPositionDTO[] =>
  state.jobPosition.jobPositionList.data;

export const selectAllJobPositionsData = (state: RootState): Pick<JobPositionDTO, 'id' | 'title'>[] =>
  state.jobPosition.allJobPositions;

export const selectJobPositionsPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.jobPosition.jobPositionList.filter,
  limit: state.jobPosition.jobPositionList.pagination.limit,
  order: state.jobPosition.jobPositionList.sortOrder.order,
  page: state.jobPosition.jobPositionList.pagination.page,
  search: state.jobPosition.jobPositionList.search,
  sortBy: state.jobPosition.jobPositionList.sortOrder.sortBy,
  totalPages: state.jobPosition.jobPositionList.pagination.totalPages,
});
