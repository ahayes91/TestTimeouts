import {
  getBog,
  getBogRefId,
  getHoleRefId,
} from './bog.selectors';

describe('bog selector', () => {
  it('getBog returns bog state from store', () => {
    const store = {
      bog: 'Here we go again',
    };
    const result = getBog(store);
    expect(result).toEqual('Here we go again');
  });

  it('getBogRefId returns bog refId from state', () => {
    const state = {
      refId: 'Have you ever seen the rain',
    };
    const result = getBogRefId.resultFunc(state);
    expect(result).toEqual('Have you ever seen the rain');
  });

  it('getHoleRefId returns hole refId from state', () => {
    const state = {
      holeId: 'And now I face, the final curtain',
    };
    const result = getHoleRefId.resultFunc(state);
    expect(result).toEqual('And now I face, the final curtain');
  });
});
