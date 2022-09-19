import { CreateTopicDTO, EditTopicDTO, TopicDTO } from './topics.dto';
import { PageSearchQueryConfig, TableListData } from '../../shared/constants';

export const CREATE_TOPIC = 'CREATE_TOPIC';
export const LOAD_TOPIC = 'LOAD_TOPIC';
export const EDIT_TOPIC = 'EDIT_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';
export const SET_TOPIC = 'SET_TOPIC';
export const CLEAR_CURRENT_TOPIC = 'CLEAR_CURRENT_TOPIC';
export const LOAD_TOPIC_LIST = 'LOAD_TOPIC_LIST';
export const SET_TOPIC_LIST = 'SET_TOPIC_LIST';
export const LOAD_All_TOPICS = 'LOAD_All_TOPICS';
export const SET_All_TOPICS = 'SET_All_TOPICS';

export type TopicsState = {
  topic: TopicDTO | null;
  topicList: TableListData<TopicDTO>;
  allTopics: Pick<TopicDTO, 'id' | 'title'>[];
};

export interface CreateTopicAction {
  type: typeof CREATE_TOPIC;
  payload: { data: CreateTopicDTO };
}

export interface LoadTopicAction {
  type: typeof LOAD_TOPIC;
  payload: { id: string };
}

export interface EditTopicAction {
  type: typeof EDIT_TOPIC;
  payload: { data: EditTopicDTO };
}

export interface DeleteTopicAction {
  type: typeof DELETE_TOPIC;
  payload: { id: string };
}

export interface SetTopicAction {
  type: typeof SET_TOPIC;
  payload: { data: TopicDTO };
}

export interface ClearTopicAction {
  type: typeof CLEAR_CURRENT_TOPIC;
}

export interface LoadTopicListAction {
  type: typeof LOAD_TOPIC_LIST;
  payload: { pageConfig?: PageSearchQueryConfig };
}

export interface SetTopicListAction {
  type: typeof SET_TOPIC_LIST;
  payload: { tableData: TableListData<TopicDTO> };
}

export interface LoadAllTopicsAction {
  type: typeof LOAD_All_TOPICS;
}

export interface SetAllTopicsAction {
  type: typeof SET_All_TOPICS;
  payload: { data: Pick<TopicDTO, 'id' | 'title'>[] };
}

export type TopicActionTypes =
  | CreateTopicAction
  | LoadTopicAction
  | EditTopicAction
  | DeleteTopicAction
  | SetTopicAction
  | ClearTopicAction
  | LoadTopicListAction
  | SetTopicListAction
  | LoadAllTopicsAction
  | SetAllTopicsAction;
