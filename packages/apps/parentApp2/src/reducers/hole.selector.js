import { createSelector } from 'reselect';

export const getHole = state => state.bog?.hole;

export const getHoleTitle = createSelector(
  [getHole],
  hole => {
    return hole?.title || '';
  },
);

export const getHoleActivityId = createSelector(
  [getHole],
  hole => {
    return hole?.activities[0]?.refId;
  },
);

export const getHoleRefId = createSelector(
  [getHole],
  hole => {
    return hole?.holeRefId;
  },
);
