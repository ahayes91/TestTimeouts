import MockAdapter from 'axios-mock-adapter';
import {
  bogAxios,
  fetchBog,
} from './bogApi';

describe('bogApi', () => {
  const axiosMock = new MockAdapter(bogAxios);

  beforeEach(() => {
    axiosMock.resetHistory();
  });

  afterAll(() => {
    axiosMock.restore();
  });

  describe('fetchBog', () => {
    it('should return the bog name with bogId', async () => {
      const mockUrl = `/api/bog`;
      const mockBogId = ['mockBogId'];
      axiosMock.onPost(mockUrl).reply(200, {
        data: [
          {
            name: { firstName: 'Jehovah', lastName: 'By' },
          },
        ],
      });
      const response = await fetchBog(mockBogId);
      expect(response.data.length).toEqual(1);
      expect(response.data[0].name.lastName).toEqual('By');
    });

    it('should return [] with no mockBogId', async () => {
      const mockUrl = `/api/bog`;
      const mockBogId = undefined;
      axiosMock.onPost(mockUrl).reply(200, {
        data: [],
      });
      const response = await fetchBog(mockBogId);
      expect(response.data).toEqual([]);
    });
  });
});
