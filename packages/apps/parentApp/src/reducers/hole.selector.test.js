import {
  getHole,
  getHoleTitle,
  getHoleActivityId,
  getHoleRefId,
} from './hole.selector';

describe('Hole selectors', () => {
  it('getHole returns the hole from store', () => {
    const store = {
      bog: {
        hole: 'mockHole',
      },
    };
    const result = getHole(store);
    expect(result).toEqual('mockHole');
  });

  describe('getHoleTitle', () => {
    it('returns the hole title when it exist', () => {
      const result = getHoleTitle.resultFunc({ title: 'mockTitle' });
      expect(result).toEqual('mockTitle');
    });

    it('returns empty string when title doesnt exist', () => {
      const result = getHoleTitle.resultFunc();
      expect(result).toEqual('');
    });
  });

  describe('getHoleActivityId', () => {
    it('returns the activity id when it exist', () => {
      const mockHole = {
        activities: [{ refId: 'mockActivityId' }],
      };
      const result = getHoleActivityId.resultFunc(mockHole);
      expect(result).toEqual('mockActivityId');
    });

    it('returns undefined when field does not exist', () => {
      const result = getHoleActivityId.resultFunc();
      expect(result).toEqual(undefined);
    });
  });

  describe('getHoleRefId', () => {
    it('returns the hole id when it exists', () => {
      const mockHole = {
        holeRefId: 'mockHoleId',
      };
      const result = getHoleRefId.resultFunc(mockHole);
      expect(result).toEqual('mockHoleId');
    });

    it('returns undefined when field does not exist', () => {
      const result = getHoleRefId.resultFunc();
      expect(result).toEqual(undefined);
    });
  });
});
