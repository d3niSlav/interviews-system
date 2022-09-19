import { TopicDTO } from './topics.dto';
import {
  CLEAR_CURRENT_TOPIC,
  LOAD_TOPIC_LIST,
  SET_All_TOPICS,
  SET_TOPIC,
  SET_TOPIC_LIST,
  TopicActionTypes,
  TopicsState,
} from './topics.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: TopicsState = {
  topic: null,
  topicList: getTableListDefaultState<TopicDTO>(),
  allTopics: [],
};

const topicsReducer = (state = initialState, action: TopicActionTypes): TopicsState => {
  switch (action.type) {
    case CLEAR_CURRENT_TOPIC: {
      return {
        ...state,
        topic: null,
      };
    }
    case SET_TOPIC: {
      return {
        ...state,
        topic: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_TOPIC_LIST: {
      return {
        ...state,
        topicList: {
          ...state.topicList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_TOPIC_LIST: {
      return {
        ...state,
        topicList: {
          ...state.topicList,
          ...action.payload.tableData,
        },
      };
    }
    case SET_All_TOPICS: {
      return {
        ...state,
        allTopics: [...action.payload.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default topicsReducer;
