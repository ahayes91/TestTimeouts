import {
  BRANCH_ACTIONS,
  LIMBS_ACTIONS,
  BRANCH_INPUT_ACTIONS,
  BOG_ACTIONS,
} from './types';

describe('Types', () => {
  it('BRANCH_ACTIONS is correct shape', () => {
    expect(BRANCH_ACTIONS).toEqual({
      FETCH_BRANCH_REQUEST: 'FETCH_BRANCH_REQUEST',
      FETCH_BRANCH_SUCCESS: 'FETCH_BRANCH_SUCCESS',
      FETCH_BRANCH_ERROR: 'FETCH_BRANCH_ERROR',
      UPDATE_BRANCH: 'UPDATE_BRANCH',
      SET_BRANCH_UNAVAILABLE: 'SET_BRANCH_UNAVAILABLE',
    });
  });

  it('LIMBS_ACTIONS is correct shape', () => {
    expect(LIMBS_ACTIONS).toEqual({
      FETCH_LIMBS_REQUEST: 'FETCH_LIMBS_REQUEST',
      FETCH_LIMBS_SUCCESS: 'FETCH_LIMBS_SUCCESS',
      FETCH_LIMBS_ERROR: 'FETCH_LIMBS_ERROR',
    });
  });

  it('BRANCH_INPUT_ACTIONS is correct shape', () => {
    expect(BRANCH_INPUT_ACTIONS).toEqual({
      UPDATE_BRANCH_INPUT: 'UPDATE_BRANCH_INPUT',
      SET_BRANCH_REQUEST: 'SET_BRANCH_REQUEST',
      SET_BRANCH_SUCCESS: 'SET_BRANCH_SUCCESS',
      SET_BRANCH_ERROR: 'SET_BRANCH_ERROR',
    });
  });

  it('BOG_ACTIONS is correct shape', () => {
    expect(BOG_ACTIONS).toEqual({
      LOAD_BOG: 'LOAD_BOG',
      CLEAR_BOG: 'CLEAR_BOG',
    });
  });
});
