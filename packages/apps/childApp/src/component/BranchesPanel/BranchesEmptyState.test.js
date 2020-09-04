import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useSelector } from 'react-redux';
import BranchesEmptyState from './BranchesEmptyState';

jest.mock('react-redux');

describe('BranchesEmptyState component', () => {
  it('renders nothing when getShowEmptyState and getShowBranchesUnavailableState selectors both return false', () => {
    useSelector.mockReturnValue(false);
    const { container } = renderWithReactIntl(<BranchesEmptyState />);
    expect(container).toBeEmpty();
  });

  it('renders empty state when getShowEmptyState selector returns true and getShowBranchesUnavailableState selector returns false', () => {
    useSelector.mockReturnValueOnce(true).mockReturnValueOnce(false);
    const { container } = renderWithReactIntl(<BranchesEmptyState />);
    expect(container).not.toBeEmpty();
    expect(screen.getByText('No Branches Yet')).toBeInTheDocument();
    expect(
      screen.getByText('To add branches to this tree, start typing below.'),
    ).toBeInTheDocument();
  });

  it('renders empty state when getShowEmptyState selector returns false and getShowBranchesUnavailableState selector returns true', () => {
    useSelector.mockReturnValueOnce(false).mockReturnValueOnce(true);
    const { container } = renderWithReactIntl(<BranchesEmptyState />);
    expect(container).not.toBeEmpty();
    expect(screen.getByText('Branches are not available')).toBeInTheDocument();
    expect(
      screen.getByText('The branch is no longer on your tree.'),
    ).toBeInTheDocument();
  });
});
