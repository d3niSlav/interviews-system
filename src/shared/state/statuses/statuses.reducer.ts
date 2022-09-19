import { SET_STATUSES, StatusesActionTypes, StatusesState } from './statuses.types';

const initialState: StatusesState = {};

export default (state = initialState, action: StatusesActionTypes): StatusesState => {
  switch (action.type) {
    case SET_STATUSES: {
      return {
        ...state,
        [action.payload.type]: action.payload.data,
      };
    }
    default: {
      return state;
    }
  }
};
