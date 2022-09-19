import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers';
import { authSaga } from '../containers/Auth';
import { candidateSaga } from '../containers/Candidates';
import { employeeSaga } from '../containers/Employees';
import { interviewSaga } from '../containers/Interviews';
import { jobPositionSaga } from '../containers/JobPositions';
import { jobTitlesSaga } from '../containers/JobTitles';
import { questionsSaga } from '../containers/Questions';
import { subjectSaga } from '../containers/Subjects';
import { tagsSaga } from '../containers/Tags';
import { topicsSaga } from '../containers/Topics';
import history from '../shared/history';
import { attachmentsSaga } from '../shared/state/attachments';
import { globalRequestSaga } from '../shared/state/global-request';
import { statusesSaga } from '../shared/state/statuses';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routerMiddleware = createRouterMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(routerMiddleware, sagaMiddleware)));

// Common
sagaMiddleware.run(attachmentsSaga);
sagaMiddleware.run(globalRequestSaga);
sagaMiddleware.run(statusesSaga);

// Auth
sagaMiddleware.run(authSaga);

// Job Titles
sagaMiddleware.run(jobTitlesSaga);

// Job Positions
sagaMiddleware.run(jobPositionSaga);

// Subjects
sagaMiddleware.run(subjectSaga);

// Topics
sagaMiddleware.run(topicsSaga);

// Tags
sagaMiddleware.run(tagsSaga);

// Questions
sagaMiddleware.run(questionsSaga);

// Interviews
sagaMiddleware.run(interviewSaga);

// Candidates
sagaMiddleware.run(candidateSaga);

// Employees
sagaMiddleware.run(employeeSaga);

export default store;
