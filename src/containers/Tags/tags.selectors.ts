import { TagDTO } from './tags.dto';
import { PageSearchQueryConfig } from '../../shared/constants';
import { RootState } from '../../store/reducers';

export const selectTag = (state: RootState): TagDTO | null => state.tag.tag;

export const selectTagsTableData = (state: RootState): TagDTO[] => state.tag.tagList.data;

export const selectAllTagsData = (state: RootState): Pick<TagDTO, 'id' | 'title'>[] => state.tag.allTags;

export const selectTagsPageConfiguration = (state: RootState): PageSearchQueryConfig => ({
  filter: state.tag.tagList.filter,
  limit: state.tag.tagList.pagination.limit,
  order: state.tag.tagList.sortOrder.order,
  page: state.tag.tagList.pagination.page,
  search: state.tag.tagList.search,
  sortBy: state.tag.tagList.sortOrder.sortBy,
  totalPages: state.tag.tagList.pagination.totalPages,
});
