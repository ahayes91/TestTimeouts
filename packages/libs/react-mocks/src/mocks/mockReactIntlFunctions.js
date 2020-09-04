import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { en } from '../../../../../config/lang/index';

const renderWithReactIntl = component => {
  return render(
    <IntlProvider locale="en-US" messages={en}>
      {component}
    </IntlProvider>,
  );
};

export default renderWithReactIntl;
