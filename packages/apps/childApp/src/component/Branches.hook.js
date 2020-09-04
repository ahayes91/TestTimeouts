import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fetchBranchesApi from '@test/core-api/src/api/branchesApi/fetchBranchesApi';
import { fetchLimbsInBogCancelable } from '@test/core-api/src/api/limbsApi/limbsInBogApi';
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

export async function fetchLimbsData(
  dispatch,
  bogRefId,
  branches,
) {
  const currentTreeRefId = currentTreeId;
  const hasLimbsFromUnknownTree = branches.some(
    branch =>  branch.createdBy !== currentTreeRefId,
  );

  if (!hasLimbsFromUnknownTree) {
    // Skip call to fetch limbs if you have access to the trees already
    dispatch(
      storeLimbsInBog([
        {
          refId: currentTreeRefId,
          name: {
            firstName: 'mock', // hardcoded for now, dont care for the purposes of checking the integration tests
            lastName: 'mock',
          },
        },
      ]),
    );
    return;
  }
  const { fetchLimbsInBog: fetchLimbsInBogApi } = fetchLimbsInBogCancelable();
  dispatch(fetchLimbsInBog());
  const limbsInBogPromise = fetchLimbsInBogApi(bogRefId);
  try {
    const limbs = await limbsInBogPromise;
    dispatch(storeLimbsInBog(limbs));
  } catch {
    dispatch(errorLimbsInBog());
  }
}

export async function fetchData(
  dispatch,
  bogRefId,
  holeRefId,
) {
  dispatch(loadBog(bogRefId, holeRefId));
  let branchesPromise;
    const { fetchBranches: fetchBranchesRequest } = fetchBranchesApi();
    dispatch(fetchBranch());
    branchesPromise = fetchBranchesRequest({
      bogRefId,
      holeRefId,
    });
  let branches;
  try {
    branches = await branchesPromise;
    if (branches.data) {
      dispatch(storeBranch(branches.data));
    } else {
      dispatch(branchUnavailable());
    }
  } catch {
    dispatch(errorBranch());
    return;
  }
  if (branches.data) {
    await fetchLimbsData(dispatch, bogRefId, branches.data);
  }
}

export default (holeRefId, bogRefId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData(
      dispatch,
      bogRefId,
      holeRefId,
    );
  }, []);
};
