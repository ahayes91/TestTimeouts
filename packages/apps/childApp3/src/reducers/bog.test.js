import reducer, { BogState } from './bog';

describe('bog reducers', () => {
  it('returns default state on initialisation', () => {
    const initialState = reducer();
    expect(initialState).toEqual(BogState());
  });

  it('returns initial state for unknown action', () => {
    const initialState = reducer();
    const afterUnknownAction = reducer(initialState, {
      type: 'garbage',
    });
    expect(initialState).toEqual(afterUnknownAction);
  });

  it('sets bog and hole data when type is LOAD_BOG', () => {
    const initialState = reducer();
    const result = reducer(initialState, {
      type: 'LOAD_BOG',
      holeId: 'mockHoleId',
      bog: 'mockBogId',
    });
    const expectedState = BogState({
      refId: 'mockBogId',
      holeId: 'mockHoleId',
    });
    expect(result).toEqual(expectedState);
  });

  it('clears state when type is CLEAR_BOG', () => {
    const result = reducer(
      BogState({
        refId: 'mockRefId',
        holeId: 'mockHoleId',
      }),
      {
        type: 'CLEAR_BOG',
      },
    );
    expect(result).toEqual(BogState());
  });
});
