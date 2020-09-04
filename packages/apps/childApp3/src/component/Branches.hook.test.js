import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import fetchBranchesApi from '@test/core-api/src/api/branchesApi/fetchBranchesApi';
import { fetchLimbsInBogCancelable } from '@test/core-api/src/api/limbsApi/limbsInBogApi';
import hook, { fetchData, fetchLimbsData } from './Branches.hook';
import {
  fetchBranch,
  storeBranch,
  errorBranch,
  fetchLimbsInBog,
  storeLimbsInBog,
  errorLimbsInBog,
  loadBog,
  branchUnavailable,
} from '../actions';
import { currentTreeId } from '@test/parentApp/src/integrationTests/__mocks__/mocks';

jest.mock('react');
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock(
  '@test/core-api/src/api/branchesApi/fetchBranchesApi',
);
jest.mock('@test/core-api/src/api/limbsApi/limbsInBogApi');

describe('Branches.hook', () => {
  const holeRefId = 'mockHoleRefId';
  const bogRefId = 'mockBogRefId';
  const currentUserId = '111';

  beforeEach(() => {
    jest.clearAllMocks();
    const fetchBranchesMock = jest.fn();
    const fetchLimbsInBogMock = jest.fn();
    fetchBranchesApi.mockImplementation(() => ({
      fetchBranches: fetchBranchesMock,
    }));
    fetchLimbsInBogCancelable.mockImplementation(() => ({
      fetchLimbsInBog: fetchLimbsInBogMock,
    }));
  });

  it('hook calls useEffect', () => {
    hook();
    expect(useDispatch).toHaveBeenCalled();
    expect(useEffect).toHaveBeenCalled();
  });

  describe('fetchData', () => {
    it('loads branches and limbs when requests are successful', async () => {
      const branchesResult = {
        data: [{ createdBy: 'somerandomtree' }],
      };
      const limbsResult = [
        {
          name: {
            firstName: 'I dont want to fall asleep',
            lastName: 'I dont want to pass away',
          },
        },
      ];
      fetchLimbsInBogCancelable().fetchLimbsInBog.mockImplementation(() =>
        Promise.resolve(limbsResult),
      );
      fetchBranchesApi().fetchBranches.mockImplementation(() =>
        Promise.resolve(branchesResult),
      );
      const dispatched = [];
      const dispatch = action => dispatched.push(action);
      await fetchData(
        dispatch,
        bogRefId,
        holeRefId,
        undefined,
      );
      expect(fetchBranchesApi().fetchBranches).toHaveBeenCalled();
      expect(fetchBranchesApi().fetchBranches).toHaveBeenCalledWith({
        bogRefId,
        holeRefId,
      });
      expect(dispatched).toEqual([
        loadBog(bogRefId, holeRefId),
        fetchBranch(),
        storeBranch(branchesResult.data),
        fetchLimbsInBog(),
        storeLimbsInBog(limbsResult),
      ]);
    });

    it('sets branchUnavailable and doesnt load limbs when requests are successful but branches are undefined', async () => {
      const branchesResult = {
        data: undefined,
      };
      fetchBranchesApi().fetchBranches.mockImplementation(() =>
        Promise.resolve(branchesResult),
      );
      const dispatched = [];
      const dispatch = action => dispatched.push(action);
      await fetchData(
        dispatch,
        bogRefId,
        holeRefId,
        undefined,
      );
      expect(fetchBranchesApi().fetchBranches).toHaveBeenCalled();
      expect(fetchBranchesApi().fetchBranches).toHaveBeenCalledWith({
        bogRefId,
        holeRefId,
      });
      expect(dispatched).toEqual([
        loadBog(bogRefId, holeRefId),
        fetchBranch(),
        branchUnavailable(),
      ]);
    });

    it('triggers error when limbs requests fail', async () => {
      fetchBranchesApi().fetchBranches.mockImplementation(() =>
        Promise.reject(),
      );
      fetchLimbsInBogCancelable().fetchLimbsInBog.mockImplementation(() =>
        Promise.reject(),
      );
      const dispatched = [];
      const dispatch = action => dispatched.push(action);
      await fetchData(
        dispatch,
        bogRefId,
        holeRefId,
        undefined,
      );
      expect(fetchBranchesApi().fetchBranches).toHaveBeenCalled();
      expect(fetchBranchesApi().fetchBranches).toHaveBeenCalledWith({
        bogRefId,
        holeRefId,
      });
      expect(dispatched).toEqual([
        loadBog(bogRefId, holeRefId),
        fetchBranch(),
        errorBranch(),
      ]);
    });
  });

  describe('fetchLimbsData', () => {
    it('does not make a call to fetch limbs when branches is only for current tree', async () => {
      const branch = [
        {
          createdBy: currentTreeId,
        },
      ];
      const dispatched = [];
      const dispatch = action => dispatched.push(action);
      await fetchLimbsData(dispatch, bogRefId, branch);
      expect(fetchLimbsInBogCancelable).not.toHaveBeenCalled();
      expect(dispatched).toEqual([
        storeLimbsInBog([
          {
            refId: currentTreeId,
            name: {
              firstName: 'mock',
              lastName: 'mock',
            },
          },
        ]),
      ]);
    });

    it('makes a call to fetch limbs when branches are for other trees', async () => {
      const branches = [
        {
          createdBy: 'someOtherTree',
        },
      ];
      const limbsResult = [
        {
          name: {
            firstName: 'I dont want to fall asleep',
            lastName: 'I dont want to pass away',
          },
        },
      ];
      const dispatched = [];
      const dispatch = action => dispatched.push(action);
      fetchLimbsInBogCancelable().fetchLimbsInBog.mockImplementation(() =>
        Promise.resolve(limbsResult),
      );
      await fetchLimbsData(dispatch, bogRefId, branches);
      expect(fetchLimbsInBogCancelable).toHaveBeenCalled();
      expect(dispatched).toEqual([
        fetchLimbsInBog(),
        storeLimbsInBog(limbsResult),
      ]);
    });

    it('dispatches action when request to fetch limbs fails', async () => {
      const branches = [
        {
          createdBy: 'someOtherTree',
        },
      ];
      const dispatched = [];
      const dispatch = action => dispatched.push(action);
      fetchLimbsInBogCancelable().fetchLimbsInBog.mockImplementation(() =>
        Promise.reject(),
      );
      await fetchLimbsData(dispatch, bogRefId, branches);
      expect(fetchLimbsInBogCancelable).toHaveBeenCalled();
      expect(dispatched).toEqual([
        fetchLimbsInBog(),
        errorLimbsInBog(),
      ]);
    });
  });
});
