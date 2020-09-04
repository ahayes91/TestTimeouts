import { Record } from 'immutable';
import { BOG_ACTIONS, APP_ACTIONS } from '../actions/types';

export const BogModel = Record({
  bogName: null,
  bogModel: null,
  hole: null,
});

export default (state = BogModel(), action = {}) => {
  switch (action.type) {
    case BOG_ACTIONS.FETCH_BOG_DETAILS: {
      return state;
    }
    case BOG_ACTIONS.LOAD_BOG_DETAILS: {
      const { bogName, hole, bog } = action;
      return BogModel({
        bogName,
        hole,
        bogModel: bog,
      });
    }
    case APP_ACTIONS.CLEAR_REDUX_STORE: {
      return BogModel();
    }
    default: {
      return state;
    }
  }
};
