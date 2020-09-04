import { BOG_ACTIONS, APP_ACTIONS } from './types';

describe('Types', () => {
  it('BOG_ACTIONS is the correct shape', () => {
    expect(BOG_ACTIONS).toEqual({
      FETCH_BOG_DETAILS: 'FETCH_BOG_DETAILS',
      LOAD_BOG_DETAILS: 'LOAD_BOG_DETAILS',
    });
  });

  it('APP_ACTIONS is the correct shape', () => {
    expect(APP_ACTIONS).toEqual({
      CLEAR_REDUX_STORE: 'CLEAR_REDUX_STORE',
    });
  });
});
