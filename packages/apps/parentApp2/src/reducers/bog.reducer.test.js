import { BOG_ACTIONS, APP_ACTIONS } from '../actions/types';
import reducer, { BogModel } from './bog.reducer';

describe('bog reducer', () => {
  it('returns default state on initialisation', () => {
    const initialState = reducer();
    expect(initialState).toEqual(
      BogModel({
        bogName: null,
      }),
    );
  });
  it('returns initial state for unknown action', () => {
    const initialState = reducer();
    const afterUnknownAction = reducer(initialState, {
      type: 'garbage',
    });
    expect(initialState).toEqual(afterUnknownAction);
  });

  it('sets bogId when type is BOG_ACTIONS.FETCH_BOG_DETAILS', () => {
    const initialState = reducer();
    const bogId = '1234';
    const afterAction = reducer(initialState, {
      type: BOG_ACTIONS.FETCH_BOG_DETAILS,
      bogId,
    });
    expect(afterAction.bogName).toEqual(null);
  });

  it('sets bogName list when type is BOG_ACTIONS.LOAD_BOG_DETAILS', () => {
    const bogName = 'Theres a concert hall in Vienna';
    const mockBogModel = { refId: 'mockBogRef' };
    const mockHole = 'mockHole';
    const initialState = reducer();
    const afterAction = reducer(initialState, {
      type: BOG_ACTIONS.LOAD_BOG_DETAILS,
      bogName,
      hole: mockHole,
      bog: mockBogModel,
    });
    expect(afterAction).toEqual(
      BogModel({
        bogName: 'Theres a concert hall in Vienna',
        hole: mockHole,
        bogModel: mockBogModel,
      }),
    );
  });

  it('clears state when is APP_ACTIONS.CLEAR_REDUX_STORE', () => {
    const initialState = reducer({
      bogName: 'mockName',
      bogModel: 'mockBog',
    });
    const afterAction = reducer(initialState, {
      type: APP_ACTIONS.CLEAR_REDUX_STORE,
    });
    expect(afterAction).toEqual(BogModel());
  });
});
