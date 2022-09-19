import { combineReducers } from 'redux';

import { authReducer } from '../containers/Auth';
import { candidatesReducer } from '../containers/Candidates';
import { employeesReducer } from '../containers/Employees';
import { interviewsReducer } from '../containers/Interviews';
import { jobPositionsReducer } from '../containers/JobPositions';
import { jobTitlesReducer } from '../containers/JobTitles';
import { questionsReducer } from '../containers/Questions';
import { subjectsReducer } from '../containers/Subjects';
import { tagsReducer } from '../containers/Tags';
import { topicsReducer } from '../containers/Topics';
import { attachmentsReducer } from '../shared/state/attachments';
import { currentRequestReducer } from '../shared/state/global-request';
import { statusesReducer } from '../shared/state/statuses';

export const rootReducer = combineReducers({
  attachments: attachmentsReducer,
  auth: authReducer,
  candidate: candidatesReducer,
  currentRequest: currentRequestReducer,
  employee: employeesReducer,
  interview: interviewsReducer,
  jobPosition: jobPositionsReducer,
  jobTitle: jobTitlesReducer,
  question: questionsReducer,
  statuses: statusesReducer,
  subject: subjectsReducer,
  tag: tagsReducer,
  topic: topicsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
