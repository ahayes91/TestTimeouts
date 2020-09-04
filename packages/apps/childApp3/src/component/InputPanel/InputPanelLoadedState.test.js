import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useSelector } from 'react-redux';
import InputPanelLoadedState from './InputPanelLoadedState';

jest.mock('react-redux');

describe('Input Panel loading state', () => {
  it('renders input fields when areBranchesLoading is false', () => {
    useSelector.mockImplementation(() => false);
    const { getByTestId } = renderWithReactIntl(<InputPanelLoadedState />);
    const loadedState = getByTestId('branchesPanelLoadedState');
    expect(loadedState).not.toBeNull();
  });

  it('renders nothing when areBranchesLoading is true', () => {
    useSelector.mockImplementation(() => true);
    const { container } = renderWithReactIntl(<InputPanelLoadedState />);
    expect(container).toBeEmpty();
  });
});
