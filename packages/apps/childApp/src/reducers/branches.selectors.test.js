import { List, Map } from 'immutable';
import {
  getBranches,
  getAreBranchesLoading,
  getBranchesErrored,
  getBranchUnavailable,
  getBranchesList,
  getBranchesListSortedByTime,
  getBranchesWithLimbs,
  getShowEmptyState,
  getShowBranchesUnavailableState,
} from './branches.selectors';

describe('Branches selectors', () => {
  it('getBranches returns branches from state', () => {
    const mockBranches = "Worryin' 'bout the way things might have been";
    const mockState = {
      branches: mockBranches,
    };
    const result = getBranches(mockState);
    expect(result).toEqual(mockBranches);
  });

  it('getAreBranchesLoading returns true when branches is loading', () => {
    const mockState = {
      loading: true,
    };
    const result = getAreBranchesLoading.resultFunc(mockState);
    expect(result).toEqual(true);
  });

  it('getAreBranchesLoading returns false when branches is not loading', () => {
    const mockState = {
      loading: false,
    };
    const result = getAreBranchesLoading.resultFunc(mockState);
    expect(result).toEqual(false);
  });

  it('getBranchesErrored returns true when branches is errored', () => {
    const mockState = {
      error: true,
    };
    const result = getBranchesErrored.resultFunc(mockState);
    expect(result).toEqual(true);
  });

  it('getBranchesErrored returns false when branches has not errored', () => {
    const mockState = {
      error: false,
    };
    const result = getBranchesErrored.resultFunc(mockState);
    expect(result).toEqual(false);
  });

  it('getBranchUnavailable returns true when branchUnavailable is true', () => {
    const mockState = {
      branchUnavailable: true,
    };
    const result = getBranchUnavailable.resultFunc(mockState);
    expect(result).toEqual(true);
  });

  it('getBranchUnavailable returns false when branchUnavailable is false', () => {
    const mockState = {
      branchUnavailable: false,
    };
    const result = getBranchUnavailable.resultFunc(mockState);
    expect(result).toEqual(false);
  });

  it('getBranchesList returns branches', () => {
    const mockBranches = "Big wheel keep on turnin'";
    const mockState = {
      branches: mockBranches,
    };
    const result = getBranchesList.resultFunc(mockState);
    expect(result).toEqual(mockBranches);
  });

  it('getBranchesListSortedByTime sorts branches based on the data.createdAt field', () => {
    const branch1 = {
      data: {
        createdAt: 1,
      },
    };
    const branch2 = {
      data: {
        createdAt: 2,
      },
    };
    const branch3 = {
      data: {
        createdAt: 3,
      },
    };
    const branch4 = {
      data: {
        createdAt: 4,
      },
    };
    const sortedbranch = [branch1, branch2, branch3, branch4];
    const unsortedbranch = [branch3, branch2, branch1, branch4];
    const result = getBranchesListSortedByTime.resultFunc(unsortedbranch);
    expect(result).toEqual(sortedbranch);
  });

  it('getBranchesWithLimbs returns empty list when branches list is empty', () => {
    const mockState = List();
    const result = getBranchesWithLimbs.resultFunc(mockState);
    expect(result).toEqual(List());
  });

  it('getBranchesWithLimbs returns mapped list of branches', () => {
    const mockbranchList = [
      {
        createdBy: 'limb1',
        data: {
          createdAt: 1,
          text: 'Who knows, not me, we never lost control',
        },
      },
      {
        createdBy: 'limb2',
        data: {
          createdAt: 2,
          text: 'You are face to face, with the man who sold the world',
        },
      },
    ];
    const expected = [
      {
        limb: {
          firstName: 'Sour',
          lastName: 'Dough',
        },
        timestamp: 1,
        message: 'Who knows, not me, we never lost control',
      },
      {
        limb: {
          firstName: 'Pantry',
          lastName: 'Pasta',
        },
        timestamp: 2,
        message: 'You are face to face, with the man who sold the world',
      },
    ];
    const limbs = Map({
      limb1: {
        firstName: 'Sour',
        lastName: 'Dough',
      },
      limb2: {
        firstName: 'Pantry',
        lastName: 'Pasta',
      },
    });
    const mockState = List(mockbranchList);
    const result = getBranchesWithLimbs.resultFunc(
      mockState,
      limbs,
    );
    expect(result).toEqual(List(expected));
  });

  describe('getShowEmptyState', () => {
    it('returns false when branches is loading, even when branches list is empty', () => {
      const branchLoading = true;
      const branchErrored = false;
      const branchUnavailable = false;
      const branchList = List();
      const result = getShowEmptyState.resultFunc(
        branchLoading,
        branchErrored,
        branchList,
        branchUnavailable,
      );
      expect(result).toEqual(false);
    });

    it('returns false when branches has errored, even when branches list is empty', () => {
      const branchLoading = false;
      const branchErrored = true;
      const branchUnavailable = false;
      const branchList = List();
      const result = getShowEmptyState.resultFunc(
        branchLoading,
        branchErrored,
        branchList,
        branchUnavailable,
      );
      expect(result).toEqual(false);
    });

    it('returns false when branch is unavailable, even when branches list is empty', () => {
      const branchLoading = false;
      const branchErrored = false;
      const branchUnavailable = true;
      const branchList = List();
      const result = getShowEmptyState.resultFunc(
        branchLoading,
        branchErrored,
        branchList,
        branchUnavailable,
      );
      expect(result).toEqual(false);
    });

    it('returns false when branches list has more than one element', () => {
      const branchLoading = false;
      const branchErrored = false;
      const branchUnavailable = false;
      const branchList = List([1, 2, 3]);
      const result = getShowEmptyState.resultFunc(
        branchLoading,
        branchErrored,
        branchList,
        branchUnavailable,
      );
      expect(result).toEqual(false);
    });

    it('returns true when branches list is empty, branches isnt loading and branches has not errored', () => {
      const branchLoading = false;
      const branchErrored = false;
      const branchUnavailable = false;
      const branchList = List();
      const result = getShowEmptyState.resultFunc(
        branchLoading,
        branchErrored,
        branchList,
        branchUnavailable,
      );
      expect(result).toEqual(true);
    });
  });

  describe('getShowBranchesUnavailableState', () => {
    it('returns false when branches is loading, even when branches are unavailable', () => {
      const branchLoading = true;
      const branchErrored = false;
      const branchUnavailable = true;
      const result = getShowBranchesUnavailableState.resultFunc(
        branchLoading,
        branchErrored,
        branchUnavailable,
      );
      expect(result).toEqual(false);
    });

    it('returns false when branches has errored, even when branches are unavailable', () => {
      const branchLoading = false;
      const branchErrored = true;
      const branchUnavailable = true;
      const result = getShowBranchesUnavailableState.resultFunc(
        branchLoading,
        branchErrored,
        branchUnavailable,
      );
      expect(result).toEqual(false);
    });

    it('returns true when branches are unavailable', () => {
      const branchLoading = false;
      const branchErrored = false;
      const branchUnavailable = true;
      const result = getShowBranchesUnavailableState.resultFunc(
        branchLoading,
        branchErrored,
        branchUnavailable,
      );
      expect(result).toEqual(true);
    });
  });
});
