import { createSelector } from 'reselect';

export const getBog = state => state.bog;

export const getBogId = createSelector([getBog], bog => {
  return bog?.bogModel?.refId;
});

export const getBogName = createSelector([getBog], bog => {
  return bog?.bogName;
});

export default getBog;
