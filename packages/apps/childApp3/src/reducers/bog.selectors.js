import { createSelector } from 'reselect';

export const getBog = state => state.bog;

export const getBogRefId = createSelector(
  [getBog],
  bogState => bogState.refId,
);

export const getHoleRefId = createSelector(
  [getBog],
  bogState => bogState.holeId,
);
