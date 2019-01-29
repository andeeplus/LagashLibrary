import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import { Provider } from 'react-redux'
import './index.scss';
import Routes from '../src/routes'
import * as serviceWorker from './serviceWorker';
import dbApi from './services/dbApi'

dbApi.initDatabase();

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
