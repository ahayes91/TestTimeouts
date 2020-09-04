import { List } from 'immutable';
import reducer, { BranchRequestState } from './branches';

describe('branches reducers', () => {
  it('returns state with loading true on initialisation', () => {
    const initialState = reducer();
    expect(initialState).toEqual(BranchRequestState({ loading: true }));
  });

  it('returns initial state for unknown action', () => {
    const initialState = reducer();
    const afterUnknownAction = reducer(initialState, {
      type: 'garbage',
    });
    expect(initialState).toEqual(afterUnknownAction);
  });

  it('sets loading flag when type is FETCH_BRANCH_REQUEST', () => {
    const initialState = reducer();
    const result = reducer(initialState, {
      type: 'FETCH_BRANCH_REQUEST',
    });
    const expectedState = BranchRequestState({
      loading: true,
    });
    expect(result).toEqual(expectedState);
  });

  it('sets branches when type is FETCH_BRANCH_SUCCESS', () => {
    const mockBranch = [{ id: 'mockBranch1' }];
    const initialState = reducer();
    const result = reducer(initialState, {
      type: 'FETCH_BRANCH_SUCCESS',
      branch: mockBranch,
    });
    const expectedState = BranchRequestState({
      branches: List(mockBranch),
    });
    expect(result).toEqual(expectedState);
    expect(result.branches.toJS()).toEqual(mockBranch);
  });

  it('updates branches when type is UPDATE_BRANCH', () => {
    const mockBranchOriginal = { id: 'mockBranch1' };
    const mockBranchNew = { id: 'mockBranch2' };
    const mockBranchesList = [mockBranchOriginal];
    const initialState = reducer(
      BranchRequestState({ branches: List(mockBranchesList) }),
    );
    const expectedState = BranchRequestState({
      branches: List([mockBranchOriginal, mockBranchNew]),
    });
    const result = reducer(initialState, {
      type: 'UPDATE_BRANCH',
      branch: mockBranchNew,
    });
    expect(result).toEqual(expectedState);
  });

  it('sets branchUnavailable when type is SET_BRANCH_UNAVAILABLE', () => {
    const initialState = reducer();
    const result = reducer(initialState, {
      type: 'SET_BRANCH_UNAVAILABLE',
    });
    const expectedState = BranchRequestState({
      branchUnavailable: true,
    });
    expect(result).toEqual(expectedState);
  });
});
