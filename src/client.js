import React from 'react';
import ReactDOM from 'react-dom';
import createStore, { history } from 'redux/create';
import ApiClient from 'helpers/ApiClient';
// import io from 'socket.io-client';
import { Provider, ReactReduxContext } from 'react-redux';
import { BrowserRouter, HashRouter, Route } from 'react-router-dom';
// import {  } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ReduxAsyncConnect } from 'redux-connect';
import { App } from 'containers';

// import './theme/bootstrap.css';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';

const client = new ApiClient();
const dest = document.getElementById('content');
const store = createStore(history, client);
// const syncedHistory = syncHistoryWithStore(history, store);
// const asyncComponent =  render={(props) => <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />}
ReactDOM.render(
  <Provider store={store} key="provider">
    <ConnectedRouter history={history}>
      <HashRouter history={history}>
        <App context={ReactReduxContext} />
      </HashRouter>
    </ConnectedRouter>
  </Provider>,
  dest
);
