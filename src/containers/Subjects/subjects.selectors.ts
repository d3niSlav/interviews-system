import { SubjectDTO } from './subjects.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectSubject = (state: RootState): SubjectDTO | null => state.subject.subject;

export const selectSubjectsTableData = (state: RootState): SubjectDTO[] => state.subject.subjectList.data;

export const selectAllSubjectsData = (state: RootState): Pick<SubjectDTO, 'id' | 'title'>[] => state.subject.subjectAll;

export const selectSubjectsPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.subject.subjectList.filter,
  limit: state.subject.subjectList.pagination.limit,
  order: state.subject.subjectList.sortOrder.order,
  page: state.subject.subjectList.pagination.page,
  search: state.subject.subjectList.search,
  sortBy: state.subject.subjectList.sortOrder.sortBy,
  totalPages: state.subject.subjectList.pagination.totalPages,
});
