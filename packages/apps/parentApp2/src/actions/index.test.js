import { BOG_ACTIONS } from './types';
import {
  fetchBogDetails,
  loadBogDetails,
  clearReduxStore,
} from './index';

describe('TheRattlinBog action', () => {
  it('fetchBogDetails returns the correct action', () => {
    const result = fetchBogDetails('bogId', 'holeId');
    expect(result).toEqual({
      type: BOG_ACTIONS.FETCH_BOG_DETAILS,
      bog: {
        holeId: 'holeId',
        bogId: 'bogId',
      },
    });
  });

  it('loadBogDetails returns the correct action', () => {
    const result = loadBogDetails(
      'bogName',
      'bogId',
      { refId: 'mockedBog' },
      {
        data: [{ bogRefId: 'bogId' }],
      },
    );
    expect(result).toEqual({
      type: BOG_ACTIONS.LOAD_BOG_DETAILS,
      hole: {
        bogRefId: 'bogId',
      },
      bogName: 'bogName',
      bog: { refId: 'mockedBog' },
    });
  });

  it('clearReduxStore returns the correct action', () => {
    const result = clearReduxStore();
    expect(result).toEqual({
      type: 'CLEAR_REDUX_STORE',
    });
  });
});
