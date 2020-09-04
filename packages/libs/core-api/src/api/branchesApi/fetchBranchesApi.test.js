import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createAxiosCancelable } from '@test/core-api/src/axiosHelpers';
import fetchBranchesCancelable from './fetchBranchesApi';

jest.mock('../../axiosHelpers');

describe('fetchBranchesCancelable', () => {
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
    const mockBranch = {
      createdBy: 'b93ced70-4ce2-4d0d-8336-b7ae2c3fd240',
      data: {
        createdAt: 1588865802190,
        text: 'This is my test branch for my awesome tree',
      },
      key: 'branch.2a93e291-0a3e-429b-9a36-07b43a8ebe2d.f1588865802190',
    };
    const expectedResult = {
      ok: true,
      error: false,
      bogId: 'mockBogRef',
      data: [mockBranch],
    };
    const url = `/api/bog/hole/tree/branch`;
    axiosMock.onPost(url).reply(200, {
      ok: true,
      result: [mockBranch],
    });

    const { fetchBranches: client } = fetchBranchesCancelable();

    const result = await client({
      bogRefId: 'mockBogRef',
      holeRefId: 'mockHoleRefId',
    });

    expect(result).toEqual(expectedResult);
  });

  it('throws error when request fails', async () => {
    const url = `/api/bog/hole/tree/branch`;
    axiosMock.onPost(url).reply(402);

    const { fetchBranches: client } = fetchBranchesCancelable();

    await expect(
      client({
        bogRefId: 'mockBogRef',
        holeRefId: 'mockHoleRefId',
      }),
    ).rejects.toThrow();
  });

  it('throws no error when request is cancelled', async () => {
    const url = `/api/bog/hole/tree/branch`;
    axiosMock.onPost(url).reply(418);

    const { fetchBranches: client } = fetchBranchesCancelable();
    isCancelMock.mockReturnValue(true);
    const result = await client({
      bogRefId: 'mockBogRef',
      holeRefId: 'mockHoleRefId',
    });
    await expect(result).toEqual(undefined);
  });
});
