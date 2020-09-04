import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  fetchLimbsInBogCancelable,
  getLimbsInBogUrl,
} from './limbsInBogApi';
import { createAxiosCancelable } from '../../axiosHelpers';

jest.mock('../../axiosHelpers');

describe('Limbs in Bog api', () => {
  describe('fetchLimbsInBogCancelable', () => {
    let axiosMock;
    let isCancelMock;
    const mockBogRefId = 'mockBogRefId';
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

    it('Returns a success object when request returns 200', async () => {
      const mockLimbs = [
        {
          refId: 'mockLimb1',
          name: {
            firstName: 'Merv',
            lastName: 'Griffin',
          },
        },
      ];
      const url = getLimbsInBogUrl(mockBogRefId);
      axiosMock.onGet(url).reply(200, mockLimbs);
      const { fetchLimbsInBog: client } = fetchLimbsInBogCancelable();
      const result = await client(mockBogRefId);

      expect(result).toEqual(mockLimbs);
    });

    it('throws error when request fails', async () => {
      const url = getLimbsInBogUrl(mockBogRefId);
      axiosMock.onPost(url).reply(402);

      const { fetchLimbsInBog: client } = fetchLimbsInBogCancelable();

      await expect(client(mockBogRefId)).rejects.toThrow();
    });

    it('throws no error when request is cancelled', async () => {
      const url = getLimbsInBogUrl(mockBogRefId);
      axiosMock.onPost(url).reply(418);

      const { fetchLimbsInBog: client } = fetchLimbsInBogCancelable();
      isCancelMock.mockReturnValue(true);
      const result = await client(mockBogRefId);
      await expect(result).toEqual(undefined);
    });
  });
});
