import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import InputPanel from './InputPanel';

jest.mock('react-redux');

describe('Input panel', () => {
  it('renders input container', () => {
    const { container } = renderWithReactIntl(<InputPanel />);
    expect(container).not.toBeEmpty();
  });
});
