import { createSelector } from 'reselect';
import { List } from 'immutable';
import { getLimbsMap } from './limbs.selectors';

export const getBranches = state => state.branches;

export const getAreBranchesLoading = createSelector(
  [getBranches],
  branchesState => {
    return Boolean(branchesState?.loading);
  },
);

export const getBranchesErrored = createSelector(
  [getBranches],
  branchesState => {
    return Boolean(branchesState?.error);
  },
);

export const getBranchUnavailable = createSelector(
  [getBranches],
  branchesState => {
    return Boolean(branchesState?.branchUnavailable);
  },
);

export const getBranchesList = createSelector([getBranches], branchesState => {
  return branchesState?.branches;
});

export const getBranchesListSortedByTime = createSelector(
  [getBranchesList],
  branches => {
    return branches.sort((a, b) => a?.data?.createdAt - b?.data?.createdAt);
  },
);

export const getBranchesWithLimbs = createSelector(
  [getBranchesListSortedByTime, getLimbsMap],
  (branches, limbs) => {
    if (!branches.size) {
      return List();
    }
    return branches.map(branch => {
      const limb = limbs.get(branch?.createdBy, {});
      const timestamp = branch?.data?.createdAt;
      const message = branch?.data?.text;
      return {
        limb,
        timestamp,
        message,
      };
    });
  },
);

export const getShowEmptyState = createSelector(
  [
    getAreBranchesLoading,
    getBranchesErrored,
    getBranchesList,
    getBranchUnavailable,
  ],
  (
    areBranchesLoading,
    areBranchesErrored,
    branchesList,
    branchUnavailable,
  ) => {
    const branchesIsEmpty = branchesList.size === 0;
    return Boolean(
      !areBranchesLoading &&
        !areBranchesErrored &&
        !branchUnavailable &&
        branchesIsEmpty,
    );
  },
);

export const getShowBranchesUnavailableState = createSelector(
  [getAreBranchesLoading, getBranchesErrored, getBranchUnavailable],
  (areBranchesLoading, areBranchesErrored, branchUnavailable) => {
    return Boolean(
      !areBranchesLoading && !areBranchesErrored && branchUnavailable,
    );
  },
);
