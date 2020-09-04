import {
  fetchBranch,
  storeBranch,
  errorBranch,
  updateBranch,
  fetchLimbsInBog,
  storeLimbsInBog,
  errorLimbsInBog,
  updateBranchInput,
  setBranch,
  setBranchSuccess,
  setBranchError,
  loadBog,
  clearBog,
  branchUnavailable,
} from './index';

describe('Actions', () => {
  it('fetchBranch returns the correct action', () => {
    const result = fetchBranch();
    expect(result).toEqual({
      type: 'FETCH_BRANCH_REQUEST',
    });
  });

  it('storeBranch returns the correct action', () => {
    const result = storeBranch('mockBranch');
    expect(result).toEqual({
      type: 'FETCH_BRANCH_SUCCESS',
      branch: 'mockBranch',
    });
  });

  it('errorBranch returns the correct action', () => {
    const result = errorBranch('mockError');
    expect(result).toEqual({
      type: 'FETCH_BRANCH_ERROR',
    });
  });

  it('updateBranch returns the correct action', () => {
    const result = updateBranch('mockBranch');
    expect(result).toEqual({
      type: 'UPDATE_BRANCH',
      branch: 'mockBranch',
    });
  });

  it('fetchLimbsInBog returns the correct action', () => {
    const result = fetchLimbsInBog();
    expect(result).toEqual({
      type: 'FETCH_LIMBS_REQUEST',
    });
  });

  it('storeLimbsInBog returns the correct action', () => {
    const result = storeLimbsInBog('mockLimbs');
    expect(result).toEqual({
      type: 'FETCH_LIMBS_SUCCESS',
      limbs: 'mockLimbs',
    });
  });

  it('errorLimbsInBog returns the correct action', () => {
    const result = errorLimbsInBog();
    expect(result).toEqual({
      type: 'FETCH_LIMBS_ERROR',
    });
  });

  it('updateBranchInput returns the correct action', () => {
    const result = updateBranchInput('mockBranch');
    expect(result).toEqual({
      type: 'UPDATE_BRANCH_INPUT',
      branch: 'mockBranch',
    });
  });

  it('setBranch returns the correct action', () => {
    const result = setBranch();
    expect(result).toEqual({
      type: 'SET_BRANCH_REQUEST',
    });
  });

  it('setBranchSuccess returns the correct action', () => {
    const result = setBranchSuccess();
    expect(result).toEqual({
      type: 'SET_BRANCH_SUCCESS',
    });
  });

  it('setBranchError returns the correct action', () => {
    const result = setBranchError();
    expect(result).toEqual({
      type: 'SET_BRANCH_ERROR',
    });
  });

  it('loadBog returns the correct action', () => {
    const result = loadBog('mockBog', 'mockHoleId');
    expect(result).toEqual({
      type: 'LOAD_BOG',
      bog: 'mockBog',
      holeId: 'mockHoleId',
    });
  });

  it('clearBog returns the correct action', () => {
    const result = clearBog();
    expect(result).toEqual({
      type: 'CLEAR_BOG',
    });
  });

  it('branchUnavailable returns the correct action', () => {
    const result = branchUnavailable();
    expect(result).toEqual({
      type: 'SET_BRANCH_UNAVAILABLE',
    });
  });
});
