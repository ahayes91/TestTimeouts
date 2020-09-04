import { Record, List } from 'immutable';
import { LIMBS_ACTIONS } from '../actions/types';

export const LimbsState = Record({
  limbs: List(),
  loading: false,
  error: false,
});

export default (state = LimbsState(), action = {}) => {
  const { type } = action;
  switch (type) {
    case LIMBS_ACTIONS.FETCH_LIMBS_REQUEST: {
      return LimbsState({ loading: true });
    }
    case LIMBS_ACTIONS.FETCH_LIMBS_ERROR: {
      return LimbsState({ error: true });
    }
    case LIMBS_ACTIONS.FETCH_LIMBS_SUCCESS: {
      const { limbs } = action;
      return LimbsState({ limbs: List(limbs) });
    }
    default: {
      return state;
    }
  }
};
