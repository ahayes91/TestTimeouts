import { Record, List } from 'immutable';
import { BRANCH_ACTIONS } from '../actions/types';

export const BranchRequestState = Record({
  branches: List(),
  loading: false,
  error: false,
  branchUnavailable: false,
});

export default (
  state = BranchRequestState({ loading: true }),
  action = {},
) => {
  const { type } = action;
  switch (type) {
    case BRANCH_ACTIONS.FETCH_BRANCH_REQUEST: {
      return BranchRequestState({ loading: true });
    }
    case BRANCH_ACTIONS.FETCH_BRANCH_ERROR: {
      return BranchRequestState({ error: true });
    }
    case BRANCH_ACTIONS.FETCH_BRANCH_SUCCESS: {
      const { branch } = action;
      return BranchRequestState({ branches: List(branch) });
    }
    case BRANCH_ACTIONS.SET_BRANCH_UNAVAILABLE: {
      return BranchRequestState({ branchUnavailable: true });
    }
    case BRANCH_ACTIONS.UPDATE_BRANCH: {
      const { branch } = action;
      const newBranches = state.branches.push(branch);
      return state.set('branches', newBranches);
    }
    default: {
      return state;
    }
  }
};
