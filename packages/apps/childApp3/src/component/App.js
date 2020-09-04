import React from 'react';
import { string } from 'prop-types';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { getLangFile } from '@test/i18n/src/intlApi';
import rootReducer from '../reducers';
import Branches from './Branches';

const mergedMiddleware = [];
export const store = createStore(
  rootReducer,
  applyMiddleware(...mergedMiddleware),
);

const App = ({
  holeRefId,
  bogRefId,
}) => {
  return (
    <Provider store={store}>
      <IntlProvider locale={'en-US'} messages={getLangFile('en-US')}>
        <Branches
          holeRefId={holeRefId}
          bogRefId={bogRefId}
        />
      </IntlProvider>
    </Provider>
  );
};

App.propTypes = {
  holeRefId: string,
  bogRefId: string,
};

export default App;
