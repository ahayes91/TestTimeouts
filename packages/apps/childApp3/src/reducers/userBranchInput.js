import { Record } from 'immutable';
import { BRANCH_INPUT_ACTIONS } from '../actions/types';

export const UserInputState = Record({
  branch: null,
  updating: false,
  error: false,
});

export default (state = UserInputState(), action = {}) => {
  const { type } = action;
  switch (type) {
    case BRANCH_INPUT_ACTIONS.UPDATE_BRANCH_INPUT: {
      const { branch } = action;
      return UserInputState({ branch });
    }
    case BRANCH_INPUT_ACTIONS.SET_BRANCH_REQUEST: {
      const { branch } = state;
      return UserInputState({ updating: true, branch });
    }
    case BRANCH_INPUT_ACTIONS.SET_BRANCH_SUCCESS: {
      return UserInputState();
    }
    case BRANCH_INPUT_ACTIONS.SET_BRANCH_ERROR: {
      const { branch } = state;
      return UserInputState({ error: true, branch });
    }
    default: {
      return state;
    }
  }
};
