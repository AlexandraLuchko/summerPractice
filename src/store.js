import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import rootReducers from './modules';

const configureStore = (saga, reducers = {}, preloadedState = {}, middlewares = []) => createStore(
  combineReducers({
    ...rootReducers,
    ...reducers
  }),
  preloadedState,
  compose(
    applyMiddleware(
      ...middlewares,
      thunk,
      reduxLogger,
      saga
    ),
  )
);

export default configureStore;