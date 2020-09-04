import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useSelector } from 'react-redux';
import Main from './Main';
import { getBogId } from '../../reducers/bog.selector';
import {
  getHoleActivityId,
  getHoleRefId,
} from '../../reducers/hole.selector';
import api from '../../api/makeTreePostRequest';

jest.mock('react-redux');
jest.mock('../../api/makeTreePostRequest');
jest.mock('@test/childApp/src/component/App', () => () =>
  'mockBranchesPanel',
);

function getWrapper() {
  return renderWithReactIntl(<Main />);
}

function setUpMockSelectors({
  bogId = 'mockBogId',
  holeActivityId = 'mockHoleActivityId',
  holeRefId = 'mockHoleRefId',
} = {}) {
  useSelector.mockImplementation(selector => {
    if (selector === getBogId) {
      return bogId;
    }
    if (selector === getHoleActivityId) {
      return holeActivityId;
    }
    if (selector === getHoleRefId) {
      return holeRefId;
    }
    return null;
  });
}

describe('Main area', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('is rendered correctly', () => {
    setUpMockSelectors();
    const { container, queryByText } = getWrapper();
    expect(container.firstChild).not.toBeUndefined();
    const branches = queryByText('mockBranchesPanel');
    expect(branches).not.toBeNull();
  });

  it('does not render branches area when holeRefId is not defined', () => {
    setUpMockSelectors({ holeRefId: null });
    const { queryByText } = getWrapper();
    const branchesArea = queryByText('mockBranchesPanel');
    expect(branchesArea).toBeNull();
  });

  it('useEffect makes a request to makeTreePostRequest when bog id and hole activity id are set', () => {
    setUpMockSelectors();
    getWrapper();
    expect(api.makeTreePostRequest).toHaveBeenCalled();
    expect(api.makeTreePostRequest).toHaveBeenCalledWith(
      'mockBogId',
      'mockHoleActivityId',
    );
  });
});
