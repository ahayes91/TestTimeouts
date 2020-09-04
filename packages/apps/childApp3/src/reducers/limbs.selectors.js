import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const getlimbs = state => state.limbs;

export const getLimbsList = createSelector(
  [getlimbs],
  limbsState => {
    return limbsState?.limbs;
  },
);

export const getLimbsMap = createSelector(
  [getLimbsList],
  limbsList => {
    const limbsSet = Map();
    if (!limbsList?.size) {
      return limbsSet;
    }
    return limbsList.reduce(
      (map, limb) => map.set(limb.refId, limb.name),
      limbsSet,
    );
  },
);
