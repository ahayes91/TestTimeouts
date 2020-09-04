import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { IntlProvider } from 'react-intl';
import { getLangFile } from '@test/i18n/src/intlApi';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import Routes from './Routes/Routes.component';
import history from '../history';

const sagaMiddleware = createSagaMiddleware();

const mergedMiddleware = [sagaMiddleware, routerMiddleware(history)];
export const store = createStore(
  rootReducer,
  applyMiddleware(...mergedMiddleware),
);
sagaMiddleware.run(rootSaga);

const App = () => {

  return (
    <Provider store={store}>
      <IntlProvider locale={'en-US'} messages={getLangFile('en-US')}>
        <HashRouter>
          <Routes />
        </HashRouter>
      </IntlProvider>
    </Provider>
  );
};

export default App;
