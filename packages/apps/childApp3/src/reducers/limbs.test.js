import { List } from 'immutable';
import reducer, { LimbsState } from './limbs';

describe('Limbs reducers', () => {
  it('returns default state on initialisation', () => {
    const initialState = reducer();
    expect(initialState).toEqual(LimbsState());
  });

  it('returns initial state for unknown action', () => {
    const initialState = reducer();
    const afterUnknownAction = reducer(initialState, {
      type: 'garbage',
    });
    expect(initialState).toEqual(afterUnknownAction);
  });

  it('sets loading flag when type is FETCH_LIMBS_REQUEST', () => {
    const initialState = reducer();
    const result = reducer(initialState, {
      type: 'FETCH_LIMBS_REQUEST',
    });
    const expectedState = LimbsState({
      loading: true,
    });
    expect(result).toEqual(expectedState);
  });

  it('sets error flag when type is FETCH_LIMBS_ERROR', () => {
    const initialState = reducer();
    const result = reducer(initialState, {
      type: 'FETCH_LIMBS_ERROR',
    });
    const expectedState = LimbsState({
      error: true,
    });
    expect(result).toEqual(expectedState);
  });

  it('sets limbs list when type is FETCH_LIMBS_SUCCESS', () => {
    const limbs = [
      { id: 'I keep asking myself wondering how' },
      { id: 'all the things she said, running through my head' },
    ];
    const initialState = reducer();
    const result = reducer(initialState, {
      type: 'FETCH_LIMBS_SUCCESS',
      limbs,
    });
    const expectedState = LimbsState({
      limbs: List(limbs),
    });
    expect(result).toEqual(expectedState);
  });
});
