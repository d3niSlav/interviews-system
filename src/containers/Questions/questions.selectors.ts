import { QuestionDTO } from './questions.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectQuestion = (state: RootState): QuestionDTO | null => state.question.question;

export const selectQuestionsTableData = (state: RootState): QuestionDTO[] => state.question.questionList.data;

export const selectQuestionsPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.question.questionList.filter,
  limit: state.question.questionList.pagination.limit,
  order: state.question.questionList.sortOrder.order,
  page: state.question.questionList.pagination.page,
  search: state.question.questionList.search,
  sortBy: state.question.questionList.sortOrder.sortBy,
  totalPages: state.question.questionList.pagination.totalPages,
});
