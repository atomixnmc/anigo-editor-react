import { createStore, applyMiddleware, compose } from 'redux';
import createClientMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createHashHistory } from 'history';
import thunk from 'redux-thunk';
// import Immutable from 'immutable';
import createRootReducer from './modules/reducer';
export const history = createHashHistory();

export default function createRootStore(client, data) {
  // Sync dispatched route actions to the history
  const middleware = [
    createClientMiddleware(client),
    routerMiddleware(history),
    thunk
  ];

  let createStoreWithMiddlewares;
  // if (__DEVELOPMENT__ && __DEVTOOLS__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
  //   // const { persistState } = require('redux-devtools');
  //   // const DevTools = require('../containers/DevTools/DevTools');
  //   createStoreWithMiddlewares = compose(
  //     applyMiddleware(...middleware),
  //     // window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
  //     //  window.__REDUX_DEVTOOLS_EXTENSION__(),
  //     // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  //   );
  // } else {
  //   createStoreWithMiddlewares = applyMiddleware(...middleware);
  // }
  createStoreWithMiddlewares = applyMiddleware(...middleware)(createStore);
  const store = createStoreWithMiddlewares(
      createRootReducer(history));

  // if (__DEVELOPMENT__ && module.hot) {
  //   module.hot.accept('./modules/reducer', () => {
  //     store.replaceReducer(require('./modules/reducer'));
  //   });
  // }

  return store;
}
