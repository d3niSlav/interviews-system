import { CreateTagDTO, EditTagDTO, TagDTO } from './tags.dto';
import {
  CLEAR_CURRENT_TAG,
  ClearTagAction,
  CREATE_TAG,
  CreateTagAction,
  DELETE_TAG,
  DeleteTagAction,
  EDIT_TAG,
  EditTagAction,
  LOAD_ALL_TAGS,
  LOAD_TAG,
  LOAD_TAG_LIST,
  LoadAllTagsAction,
  LoadTagAction,
  LoadTagListAction,
  SET_ALL_TAGS,
  SET_TAG,
  SET_TAG_LIST,
  SetAllTagsAction,
  SetTagAction,
  SetTagListAction,
} from './tags.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewTagAction = (data: CreateTagDTO): CreateTagAction => ({
  type: CREATE_TAG,
  payload: { data },
});

export const editTagAction = (data: EditTagDTO): EditTagAction => ({
  type: EDIT_TAG,
  payload: { data },
});

export const loadTagAction = (id: string): LoadTagAction => ({
  type: LOAD_TAG,
  payload: { id },
});

export const deleteTagAction = (id: string): DeleteTagAction => ({
  type: DELETE_TAG,
  payload: { id },
});

export const setTagAction = (data: TagDTO): SetTagAction => ({
  type: SET_TAG,
  payload: { data },
});

export const clearCurrentTagAction = (): ClearTagAction => ({
  type: CLEAR_CURRENT_TAG,
});

export const loadTagListAction = (pageConfig?: PageSearchQueryConfig): LoadTagListAction => ({
  type: LOAD_TAG_LIST,
  payload: { pageConfig },
});

export const setTagListAction = (tableData: TableListData<TagDTO>): SetTagListAction => ({
  type: SET_TAG_LIST,
  payload: { tableData },
});

export const loadAllTagsAction = (): LoadAllTagsAction => ({
  type: LOAD_ALL_TAGS,
});

export const setAllTagsAction = (data: Pick<TagDTO, 'id' | 'title'>[]): SetAllTagsAction => ({
  type: SET_ALL_TAGS,
  payload: { data },
});
