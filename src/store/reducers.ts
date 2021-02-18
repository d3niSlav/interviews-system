import { combineReducers } from 'redux';

import { authReducer } from '../containers/Auth';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
