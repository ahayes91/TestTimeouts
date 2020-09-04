import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useSelector } from 'react-redux';
import Branches from './Branches';
import useBranchesFetchHook from './Branches.hook';

jest.mock('./Branches.hook');
jest.mock('./InputPanel/InputPanel', () => ({
  __esModule: true,
  default: () => 'MockInputPanel',
}));
jest.mock('react-redux');

function getProps({
  holeRefId = 'mockholeRefId',
  bogRefId = 'mockbogRefId',
} = {}) {
  return {
    holeRefId,
    bogRefId,
  };
}

function getWrapper(props) {
  return renderWithReactIntl(<Branches {...props} />);
}

describe('Branches component', () => {
  it('calls useBranchesFetchHook on mount', () => {
    const props = getProps();
    useSelector.mockReturnValueOnce([]).mockReturnValueOnce(false);
    getWrapper(props);
    expect(useBranchesFetchHook).toHaveBeenCalled();
    expect(useBranchesFetchHook).toHaveBeenCalledWith(
      'mockholeRefId',
      'mockbogRefId',
    );
  });

  it('renders Component with mocked InputPanel', () => {
    const props = getProps();
    useSelector.mockReturnValueOnce([]).mockReturnValueOnce(false);
    const { container } = getWrapper(props);
    expect(container).not.toBeEmpty();
    expect(screen.getByText('MockInputPanel')).toBeInTheDocument();
  });

  it(`doesn't show mocked InputPanel if branches are not available`, () => {
    const props = getProps();
    useSelector.mockReturnValueOnce([]).mockReturnValueOnce(true);
    const { container } = getWrapper(props);
    expect(container).not.toBeEmpty();
    expect(screen.queryByText('MockInputPanel')).not.toBeInTheDocument();
  });
});
