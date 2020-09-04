import setBranchApi from '@test/core-api/src/api/branchesApi/setBranchApi';
import submitBranch from './submitBranch.hook';
import {
  setBranch,
  setBranchSuccess,
  setBranchError,
  updateBranch,
} from '../../actions';

jest.mock(
  '@test/core-api/src/api/branchesApi/setBranchApi',
);

describe('submitBranch hook', () => {
  const mockBranch = 'mockBranch';

  beforeEach(() => {});

  it('dispatches success action when request to submitBranch is successful', async () => {
    const dispatched = [];
    const dispatch = action => {
      dispatched.push(action);
    };
    const mockSetBranch = jest.fn().mockResolvedValue();
    setBranchApi.mockImplementation(() => ({
      setBranch: mockSetBranch,
    }));

    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1591284905926);
    const expectedBranch = {
      data: {
        createdAt: 1591284905926,
        text: mockBranch,
      },
    };
    await submitBranch(
      dispatch,
      mockBranch,
    );
    expect(mockSetBranch).toHaveBeenCalled();
    expect(mockSetBranch).toHaveBeenCalledWith({});
    expect(dateNowSpy).toHaveBeenCalled();
    expect(dispatched).toEqual([
      setBranch(),
      setBranchSuccess(),
      updateBranch(expectedBranch),
    ]);
  });

  it('dispatches error action when request to submitBranch fails', async () => {
    const dispatched = [];
    const dispatch = action => {
      dispatched.push(action);
    };
    const mockSetBranch = jest.fn().mockRejectedValue();
    setBranchApi.mockImplementation(() => ({
      setBranch: mockSetBranch,
    }));

    await submitBranch(
      dispatch,
      mockBranch,
    );
    expect(mockSetBranch).toHaveBeenCalled();
    expect(mockSetBranch).toHaveBeenCalledWith({});
    expect(dispatched).toEqual([setBranch(), setBranchError()]);
  });
});
