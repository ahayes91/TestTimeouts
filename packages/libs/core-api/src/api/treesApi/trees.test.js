import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createAxiosCancelable } from '../../axiosHelpers';
import { treesApi } from './trees';

jest.mock('../../axiosHelpers');

describe('treesApi', () => {
  describe('getTreesInTheBog function', () => {
    const axiosMock = new MockAdapter(axios);

    beforeEach(() => {
      axiosMock.resetHistory();
    });

    afterAll(() => {
      axiosMock.restore();
    });
  });

  describe('getTreesInTheBog', () => {
    let axiosMock;
    let isCancelMock;
    beforeEach(() => {
      axiosMock = new MockAdapter(axios);
      isCancelMock = jest.fn();

      createAxiosCancelable.mockImplementation(() => {
        return {
          client: axiosMock.axiosInstance,
          cancel: jest.fn(),
          cancelToken: {
            throwIfRequested: jest.fn(),
          },
          isCancel: isCancelMock,
        };
      });
    });

    it('returns nothing if 403 error thrown', async () => {
      const url = '/api/bog/hole/tree';

      axiosMock.onGet(url).reply(403, {});
      isCancelMock.mockReturnValue(false);

      const { getTreesInTheBog: client } = treesApi();

      const result = await client({
        status: '123',
      }).catch(() => {});

      expect(result).toEqual(undefined);
    });

    it('test cancelling request swallows error', async () => {
      // error doesn't matter here cancelling a request will throw an error
      // and we'll test it is an axios cancel with `axios.isCancel(error)`
      const url = '/api/bog/hole/tree';

      axiosMock.onGet(url).reply('400', {});
      isCancelMock.mockReturnValue(true);

      const { getTreesInTheBog: client } = treesApi();

      // no need for catch as error swallowed after isCancel check
      const result = await client({
        status: '123',
      }).catch(() => {});

      expect(result).toEqual(undefined);
    });

    it('returns result if response is status 200 with data', async () => {
      const expectedResult = {
        trees: '1234',
      };

      const url = '/api/bog/hole/tree';

      axiosMock.onPost(url).reply(200, {
        trees: '1234',
      });

      const { getTreesInTheBog: client } = treesApi();

      const result = await client({
        status: 200,
      });

      expect(result.data).toEqual(expectedResult);
    });
  });
});
