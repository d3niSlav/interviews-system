import { TopicDTO } from './topics.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectTopic = (state: RootState): TopicDTO | null => state.topic.topic;

export const selectTopicsTableData = (state: RootState): TopicDTO[] => state.topic.topicList.data;

export const selectAllTopicsData = (state: RootState): Pick<TopicDTO, 'id' | 'title'>[] => state.topic.allTopics;

export const selectTopicsPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.topic.topicList.filter,
  limit: state.topic.topicList.pagination.limit,
  order: state.topic.topicList.sortOrder.order,
  page: state.topic.topicList.pagination.page,
  search: state.topic.topicList.search,
  sortBy: state.topic.topicList.sortOrder.sortBy,
  totalPages: state.topic.topicList.pagination.totalPages,
});
