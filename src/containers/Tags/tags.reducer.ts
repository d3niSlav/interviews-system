import { TagDTO } from './tags.dto';
import {
  CLEAR_CURRENT_TAG,
  LOAD_TAG_LIST,
  SET_ALL_TAGS,
  SET_TAG,
  SET_TAG_LIST,
  TagActionTypes,
  TagsState,
} from './tags.types';
import { getTableListDefaultState } from '../../shared/helpers';

const initialState: TagsState = {
  tag: null,
  tagList: getTableListDefaultState<TagDTO>(),
  allTags: [],
};

const tagsReducer = (state = initialState, action: TagActionTypes): TagsState => {
  switch (action.type) {
    case CLEAR_CURRENT_TAG: {
      return {
        ...state,
        tag: null,
      };
    }
    case SET_TAG: {
      return {
        ...state,
        tag: {
          ...action.payload.data,
        },
      };
    }
    case LOAD_TAG_LIST: {
      return {
        ...state,
        tagList: {
          ...state.tagList,
          filter: action.payload.pageConfig?.filter || {},
          search: action.payload.pageConfig?.search || '',
        },
      };
    }
    case SET_TAG_LIST: {
      return {
        ...state,
        tagList: {
          ...state.tagList,
          ...action.payload.tableData,
        },
      };
    }
    case SET_ALL_TAGS: {
      return {
        ...state,
        allTags: [...action.payload.data],
      };
    }
    default: {
      return state;
    }
  }
};

export default tagsReducer;
