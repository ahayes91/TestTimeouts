import { createSelector } from 'reselect';

export const getUserBranchInput = state => state.userBranchInput;

export const getIsBranchesInputUpdating = createSelector(
  [getUserBranchInput],
  inputState => {
    return Boolean(inputState?.updating);
  },
);

export const getBranchesErrored = createSelector(
  [getUserBranchInput],
  inputState => {
    return Boolean(inputState?.error);
  },
);

export const getUserBranchInputText = createSelector(
  [getUserBranchInput],
  inputState => {
    return inputState?.branch || '';
  },
);
