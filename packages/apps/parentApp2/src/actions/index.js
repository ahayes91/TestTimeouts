import { BOG_ACTIONS, APP_ACTIONS } from './types';

export const fetchBogDetails = (bogId, holeId) => {
  return {
    type: BOG_ACTIONS.FETCH_BOG_DETAILS,
    bog: { bogId, holeId },
  };
};

export const clearReduxStore = () => {
  return {
    type: APP_ACTIONS.CLEAR_REDUX_STORE,
  };
};

export const loadBogDetails = (
  bogName,
  bogId,
  bog,
  holesResponse,
) => {
  const holes = holesResponse?.data || [];
  const hole = holes.find(
    holesInTheBog => holesInTheBog.bogRefId === bogId,
  );
  return {
    type: BOG_ACTIONS.LOAD_BOG_DETAILS,
    bogName,
    hole,
    bog,
  };
};
