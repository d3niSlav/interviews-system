import { InterviewDTO } from './interviews.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectInterview = (state: RootState): InterviewDTO | null => state.interview.interview;

export const selectInterviewsTableData = (state: RootState): InterviewDTO[] => state.interview.interviewList.data;

export const selectInterviewsPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.interview.interviewList.filter,
  limit: state.interview.interviewList.pagination.limit,
  order: state.interview.interviewList.sortOrder.order,
  page: state.interview.interviewList.pagination.page,
  search: state.interview.interviewList.search,
  sortBy: state.interview.interviewList.sortOrder.sortBy,
  totalPages: state.interview.interviewList.pagination.totalPages,
});
