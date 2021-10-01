import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import { Router } from "react-router-dom"
import { Provider } from 'react-redux';
import {createBrowserHistory} from 'history'
import createSagaMiddleware from 'redux-saga'
import { sagaWatcher } from './sagas';

const history = createBrowserHistory();
const saga = createSagaMiddleware();
const store = configureStore(saga);

saga.run(sagaWatcher)

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
