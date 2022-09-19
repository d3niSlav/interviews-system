import { JobTitleDTO, ProgrammingLanguageDTO } from './job-titles.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectJobTitle = (state: RootState): JobTitleDTO | null => state.jobTitle.jobTitle;

export const selectJobTitlesTableData = (state: RootState): JobTitleDTO[] => state.jobTitle.jobTitleList.data;

export const selectAllJobTitlesData = (state: RootState): Pick<JobTitleDTO, 'id' | 'title'>[] =>
  state.jobTitle.allJobTitles;

export const selectAllProgrammingLanguagesData = (state: RootState): Pick<ProgrammingLanguageDTO, 'id' | 'title'>[] =>
  state.jobTitle.allProgrammingLanguages;

export const selectJobTitlesPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.jobTitle.jobTitleList.filter,
  limit: state.jobTitle.jobTitleList.pagination.limit,
  order: state.jobTitle.jobTitleList.sortOrder.order,
  page: state.jobTitle.jobTitleList.pagination.page,
  search: state.jobTitle.jobTitleList.search,
  sortBy: state.jobTitle.jobTitleList.sortOrder.sortBy,
  totalPages: state.jobTitle.jobTitleList.pagination.totalPages,
});
