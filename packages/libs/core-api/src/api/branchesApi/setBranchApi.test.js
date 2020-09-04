import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createAxiosCancelable } from '@test/core-api/src/axiosHelpers';
import setBranchCancelable from './setBranchApi';

jest.mock('../../axiosHelpers');

describe('setBranchCancelable', () => {
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

  it('returns success object when request returns 200', async () => {
    const expectedResult = { ok: true, error: false };
    const url = `/api/bog/hole/tree/branch`;
    axiosMock.onPost(url).reply(200, {
      ok: true,
    });

    const { setBranch: client } = setBranchCancelable();

    const result = await client({
    });

    expect(result).toEqual(expectedResult);
  });

  it('throws error when request fails', async () => {
    const url = `/api/bog/hole/tree/branch`;
    axiosMock.onPost(url).reply(402);

    const { setBranch: client } = setBranchCancelable();

    await expect(
      client({
      }),
    ).rejects.toThrow();
  });

  it('throws no error when request is cancelled', async () => {
    const url = `/api/bog/hole/tree/branch`;
    axiosMock.onPost(url).reply(418);

    const { setBranch: client } = setBranchCancelable();
    isCancelMock.mockReturnValue(true);
    const result = await client({
    });
    await expect(result).toEqual(undefined);
  });
});
