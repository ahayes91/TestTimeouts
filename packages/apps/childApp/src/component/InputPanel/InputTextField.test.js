import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import InputTextField from './InputTextField';

jest.mock('react-redux');

describe('Input Action buttons', () => {
  it('renders input', () => {
    const { getByTestId } = renderWithReactIntl(<InputTextField />);
    const inputField = getByTestId('branchInputField');
    expect(inputField).not.toBeNull();
  });
});
