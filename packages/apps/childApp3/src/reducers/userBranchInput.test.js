import reducer, { UserInputState } from './userBranchInput';

describe('User Branch reducers', () => {
  it('returns default state on initialisation', () => {
    const initialState = reducer();
    expect(initialState).toEqual(UserInputState());
  });

  it('returns initial state for unknown action', () => {
    const initialState = reducer();
    const afterUnknownAction = reducer(initialState, {
      type: 'garbage',
    });
    expect(initialState).toEqual(afterUnknownAction);
  });

  it('updates branch when type is UPDATE_BRANCH_INPUT', () => {
    const mockBranch = 'Hello darkness my old friend';
    const result = reducer(UserInputState(), {
      type: 'UPDATE_BRANCH_INPUT',
      branch: mockBranch,
    });
    const expectedState = UserInputState({
      branch: mockBranch,
    });
    expect(result).toEqual(expectedState);
  });

  it('sets updating flag when type is SET_BRANCH_REQUEST', () => {
    const result = reducer(UserInputState({ branch: 'mockBranch' }), {
      type: 'SET_BRANCH_REQUEST',
    });
    const expectedState = UserInputState({
      updating: true,
      branch: 'mockBranch',
    });
    expect(result).toEqual(expectedState);
  });

  it('sets back to empty state when type is SET_BRANCH_SUCCESS', () => {
    const result = reducer(
      UserInputState({ branch: 'Do you hear the drums Fernando' }),
      {
        type: 'SET_BRANCH_SUCCESS',
      },
    );
    const expectedState = UserInputState();
    expect(result).toEqual(expectedState);
  });

  it('sets error flag when type is SET_BRANCH_ERROR', () => {
    const result = reducer(UserInputState({ branch: 'mockBranch' }), {
      type: 'SET_BRANCH_ERROR',
    });
    const expectedState = UserInputState({
      error: true,
      branch: 'mockBranch',
    });
    expect(result).toEqual(expectedState);
  });
});
