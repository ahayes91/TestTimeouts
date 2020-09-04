import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useSelector } from 'react-redux';
import InputPanelLoadingState from './InputPanelLoadingState';

jest.mock('react-redux');

describe('Input Panel loading state', () => {
  it('renders skeleton when areBranchesLoading is true', () => {
    useSelector.mockImplementation(() => true);
    const { getByTestId } = renderWithReactIntl(<InputPanelLoadingState />);
    const loadingState = getByTestId('branchesInputLoadingState');
    expect(loadingState).not.toBeNull();
  });

  it('renders nothing when areBranchesLoading is false', () => {
    useSelector.mockImplementation(() => false);
    const { container } = renderWithReactIntl(<InputPanelLoadingState />);
    expect(container).toBeEmpty();
  });
});
