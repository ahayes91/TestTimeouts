import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import InputActionButtons from './InputActionButtons';

jest.mock('react-redux');

describe('Input Action buttons', () => {
  it('renders cancel and send buttons', () => {
    const { getByTestId } = renderWithReactIntl(<InputActionButtons />);
    const cancelButton = getByTestId('branchCancelButton');
    expect(cancelButton).not.toBeNull();
    const SendButton = getByTestId('branchSendButton');
    expect(SendButton).not.toBeNull();
  });
});
