import React from 'react';
import { renderWithReactIntl } from '@test/react-mocks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBogDetails, clearReduxStore } from '../../actions/index';
import TheRattlinBogContainer from './TheRattlinBog.component';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useLocation: jest.fn(),
}));
jest.mock('./Main', () => () => 'mockedMain');

function getWrapper() {
  return renderWithReactIntl(<TheRattlinBogContainer />);
}

describe('TheRattlinBogContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const dispatchSpy = jest.fn();
    useDispatch.mockImplementation(() => dispatchSpy);
    useParams.mockImplementation(() => ({
      holeId: 'mockHoleId',
      bogId: 'mockBogId',
      referer: 'mockReferer',
    }));
  });

  it('TheRattlinBogContainer is rendered', () => {
    const { container } = getWrapper();
    expect(container.firstChild).not.toBeUndefined();
  });

  it('useEffect dispatches action to fetch bog and hole data', () => {
    const dispatchSpy = useDispatch();
    const expectedDispatch = fetchBogDetails(
      'mockBogId',
      'mockHoleId',
    );
    getWrapper();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(expectedDispatch);
  });

  it('useEffect dispatches action to clear redux store on dismount', () => {
    const dispatchSpy = useDispatch();
    const { unmount } = getWrapper();
    dispatchSpy.mockClear();
    unmount();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(clearReduxStore());
  });
});
