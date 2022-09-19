import { CreateTagDTO, EditTagDTO, TagDTO } from './tags.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_TAG = 'CREATE_TAG';
export const LOAD_TAG = 'LOAD_TAG';
export const EDIT_TAG = 'EDIT_TAG';
export const DELETE_TAG = 'DELETE_TAG';
export const SET_TAG = 'SET_TAG';
export const CLEAR_CURRENT_TAG = 'CLEAR_CURRENT_TAG';
export const LOAD_TAG_LIST = 'LOAD_TAG_LIST';
export const SET_TAG_LIST = 'SET_TAG_LIST';
export const LOAD_ALL_TAGS = 'LOAD_ALL_TAGS';
export const SET_ALL_TAGS = 'SET_ALL_TAGS';

export type TagsState = {
  tag: TagDTO | null;
  tagList: TableListData<TagDTO>;
  allTags: Pick<TagDTO, 'id' | 'title'>[];
};

export interface CreateTagAction {
  type: typeof CREATE_TAG;
  payload: { data: CreateTagDTO };
}

export interface LoadTagAction {
  type: typeof LOAD_TAG;
  payload: { id: string };
}

export interface EditTagAction {
  type: typeof EDIT_TAG;
  payload: { data: EditTagDTO };
}

export interface DeleteTagAction {
  type: typeof DELETE_TAG;
  payload: { id: string };
}

export interface SetTagAction {
  type: typeof SET_TAG;
  payload: { data: TagDTO };
}

export interface ClearTagAction {
  type: typeof CLEAR_CURRENT_TAG;
}

export interface LoadTagListAction {
  type: typeof LOAD_TAG_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetTagListAction {
  type: typeof SET_TAG_LIST;
  payload: { tableData: TableListData<TagDTO> };
}

export interface LoadAllTagsAction {
  type: typeof LOAD_ALL_TAGS;
}

export interface SetAllTagsAction {
  type: typeof SET_ALL_TAGS;
  payload: { data: Pick<TagDTO, 'id' | 'title'>[] };
}

export type TagActionTypes =
  | CreateTagAction
  | LoadTagAction
  | EditTagAction
  | DeleteTagAction
  | SetTagAction
  | ClearTagAction
  | LoadTagListAction
  | SetTagListAction
  | LoadAllTagsAction
  | SetAllTagsAction;
