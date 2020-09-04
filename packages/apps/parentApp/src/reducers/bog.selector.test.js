import { getBog, getBogId, getBogName } from './bog.selector';

const state = {
  bog: {
    name: {
      firstName: 'P.G.',
      lastName: 'Wodehouse',
    },
  },
};

describe('Bog selectors', () => {
  it('getBog returns bog', () => {
    const result = getBog(state);
    expect(result).toEqual({
      name: {
        firstName: 'P.G.',
        lastName: 'Wodehouse',
      },
    });
  });

  describe('getBogId', () => {
    it('returns the bog id when it exists', () => {
      const mockBog = {
        bogModel: {
          refId: 'mockBogId',
        },
      };
      const result = getBogId.resultFunc(mockBog);
      expect(result).toEqual('mockBogId');
    });

    it('returns undefined when field does not exist', () => {
      const result = getBogId.resultFunc();
      expect(result).toEqual(undefined);
    });
  });

  describe('getBogName', () => {
    it('returns the bog name when it exists', () => {
      const mockBog = {
        bogName: 'mockBogName',
      };
      const result = getBogName.resultFunc(mockBog);
      expect(result).toEqual('mockBogName');
    });

    it('returns undefined when field does not exist', () => {
      const result = getBogName.resultFunc();
      expect(result).toEqual(undefined);
    });
  });
});
