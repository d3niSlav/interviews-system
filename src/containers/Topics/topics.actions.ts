import { CreateTopicDTO, EditTopicDTO, TopicDTO } from './topics.dto';
import {
  CLEAR_CURRENT_TOPIC,
  ClearTopicAction,
  CREATE_TOPIC,
  CreateTopicAction,
  DELETE_TOPIC,
  DeleteTopicAction,
  EDIT_TOPIC,
  EditTopicAction,
  LOAD_All_TOPICS,
  LOAD_TOPIC,
  LOAD_TOPIC_LIST,
  LoadAllTopicsAction,
  LoadTopicAction,
  LoadTopicListAction,
  SET_All_TOPICS,
  SET_TOPIC,
  SET_TOPIC_LIST,
  SetAllTopicsAction,
  SetTopicAction,
  SetTopicListAction,
} from './topics.types';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const createNewTopicAction = (data: CreateTopicDTO): CreateTopicAction => ({
  type: CREATE_TOPIC,
  payload: { data },
});

export const editTopicAction = (data: EditTopicDTO): EditTopicAction => ({
  type: EDIT_TOPIC,
  payload: { data },
});

export const loadTopicAction = (id: string): LoadTopicAction => ({
  type: LOAD_TOPIC,
  payload: { id },
});

export const deleteTopicAction = (id: string): DeleteTopicAction => ({
  type: DELETE_TOPIC,
  payload: { id },
});

export const setTopicAction = (data: TopicDTO): SetTopicAction => ({
  type: SET_TOPIC,
  payload: { data },
});

export const clearCurrentTopicAction = (): ClearTopicAction => ({
  type: CLEAR_CURRENT_TOPIC,
});

export const loadTopicListAction = (pageConfig?: PageSearchQueryConfig): LoadTopicListAction => ({
  type: LOAD_TOPIC_LIST,
  payload: { pageConfig },
});

export const setTopicListAction = (tableData: TableListData<TopicDTO>): SetTopicListAction => ({
  type: SET_TOPIC_LIST,
  payload: { tableData },
});

export const loadAllTopicsAction = (): LoadAllTopicsAction => ({
  type: LOAD_All_TOPICS,
});

export const setAllTopicsAction = (data: Pick<TopicDTO, 'id' | 'title'>[]): SetAllTopicsAction => ({
  type: SET_All_TOPICS,
  payload: { data },
});
