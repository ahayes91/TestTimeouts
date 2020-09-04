import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useSelector } from 'react-redux';
import BranchesLoadingState from './BranchesLoadingState';

jest.mock('react-redux');

describe('BranchesLoadingState component', () => {
  it('renders nothing when getAreBranchesLoading selector returns false', () => {
    useSelector.mockReturnValue(false);
    const { container } = renderWithReactIntl(<BranchesLoadingState />);
    expect(container).toBeEmpty();
  });

  it('renders loading state when getAreBranchesLoading selector returns true', () => {
    useSelector.mockReturnValue(true);
    const { container, getByTestId } = renderWithReactIntl(
      <BranchesLoadingState />,
    );
    expect(container).not.toBeEmpty();
    const loadingState = getByTestId('branchesLoadingState');
    expect(loadingState).not.toBeNull();
  });
});
