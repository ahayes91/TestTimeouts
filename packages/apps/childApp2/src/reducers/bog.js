import { Record } from 'immutable';
import { BOG_ACTIONS } from '../actions/types';

export const BogState = Record({
  refId: null,
  holeId: null,
});

export default (state = BogState(), action = {}) => {
  const { type } = action;
  switch (type) {
    case BOG_ACTIONS.LOAD_BOG: {
      const { bog, holeId } = action;
      return BogState({ refId: bog, holeId });
    }
    case BOG_ACTIONS.CLEAR_BOG: {
      return BogState();
    }
    default: {
      return state;
    }
  }
};
