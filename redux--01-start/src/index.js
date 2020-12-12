import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = store => {
  return next => {
    return action => {
      console.log('[Middleware] Dispatching', action);

      const result = next(action);

      console.log('[Middleware] Next state', store.getState());

      return result;
    }
  }
};

const store = createStore(combineReducers({ counter: counterReducer, results: resultReducer }), composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
