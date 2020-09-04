import { List, Map } from 'immutable';
import {
  getlimbs,
  getLimbsList,
  getLimbsMap,
} from './limbs.selectors';

describe('limbs selectors', () => {
  it('getlimbs returns limbs from state', () => {
    const mockLimbs = 'Left a good job in the city';
    const mockState = {
      limbs: mockLimbs,
    };
    const result = getlimbs(mockState);
    expect(result).toEqual(mockLimbs);
  });

  it('getLimbsList returns limbs if they exist', () => {
    const getLimbsListFunc = getLimbsList.resultFunc;
    const mockLimbs = "Workin' for the man ev'ry night and day";
    const mockState = {
      limbs: mockLimbs,
    };
    const result = getLimbsListFunc(mockState);
    expect(result).toEqual(mockLimbs);
  });

  it('getLimbsList returns undefined if not passed an object', () => {
    const getLimbsListFunc = getLimbsList.resultFunc;
    const mockState = null;
    const result = getLimbsListFunc(mockState);
    expect(result).toEqual(undefined);
  });

  it('getLimbsMap returns empty map if limbs list doesnt have a size greater than 0', () => {
    const getLimbsMapFunc = getLimbsMap.resultFunc;
    const mockLimbsList = List();
    const result = getLimbsMapFunc(mockLimbsList);
    expect(result).toEqual(Map());
  });

  it('getLimbsMap returns map of limbs when limbs list is greater than 0', () => {
    const getLimbsMapFunc = getLimbsMap.resultFunc;
    const mockLimbsList = List([
      { refId: 'mockId1', name: 'And I never lost one minute of sleepin' },
      { refId: 'mockId2', name: 'Its the end of the world and I feel fine' },
    ]);
    const expected = Map({
      mockId1: 'And I never lost one minute of sleepin',
      mockId2: 'Its the end of the world and I feel fine',
    });
    const result = getLimbsMapFunc(mockLimbsList);
    expect(result).toEqual(expected);
  });
});
