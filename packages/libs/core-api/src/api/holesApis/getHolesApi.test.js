import MockAdapter from 'axios-mock-adapter';
import {
  fetchHoles,
  holesAxios,
} from './getHolesApi';

jest.mock('../../../src/axiosHelpers');

describe('getHolesApi', () => {
  describe('fetchHoles() function', () => {
    const axiosMock = new MockAdapter(holesAxios);

    beforeEach(() => {
      axiosMock.resetHistory();
    });

    afterAll(() => {
      axiosMock.restore();
    });
  });

  describe('fetchHoles', () => {
    let axiosMock;
    beforeEach(() => {
      axiosMock = new MockAdapter(holesAxios);
    });

    it('returns nothing if 403 error thrown', async () => {
      const url = `/api/bog/hole/1234`;

      axiosMock.onGet(url).reply(403, {});

      const result = await fetchHoles(
        '1234',
      ).catch(() => {
        // swallow the error
      });

      expect(result).toEqual(undefined);
    });
  });
});
