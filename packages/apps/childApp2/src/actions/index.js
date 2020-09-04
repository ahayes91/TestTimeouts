import {
  BRANCH_ACTIONS,
  LIMBS_ACTIONS,
  BRANCH_INPUT_ACTIONS,
  BOG_ACTIONS,
} from './types';

export function fetchBranch() {
  return {
    type: BRANCH_ACTIONS.FETCH_BRANCH_REQUEST,
  };
}

export function storeBranch(branch) {
  return {
    type: BRANCH_ACTIONS.FETCH_BRANCH_SUCCESS,
    branch,
  };
}

export function updateBranch(branch) {
  return {
    type: BRANCH_ACTIONS.UPDATE_BRANCH,
    branch,
  };
}

export function errorBranch() {
  return {
    type: BRANCH_ACTIONS.FETCH_BRANCH_ERROR,
  };
}

export function branchUnavailable() {
  return {
    type: BRANCH_ACTIONS.SET_BRANCH_UNAVAILABLE,
  };
}

export function fetchLimbsInBog() {
  return {
    type: LIMBS_ACTIONS.FETCH_LIMBS_REQUEST,
  };
}

export function storeLimbsInBog(limbs) {
  return {
    type: LIMBS_ACTIONS.FETCH_LIMBS_SUCCESS,
    limbs,
  };
}

export function errorLimbsInBog() {
  return {
    type: LIMBS_ACTIONS.FETCH_LIMBS_ERROR,
  };
}

export function updateBranchInput(branch) {
  return {
    type: BRANCH_INPUT_ACTIONS.UPDATE_BRANCH_INPUT,
    branch,
  };
}

export function setBranch() {
  return { type: BRANCH_INPUT_ACTIONS.SET_BRANCH_REQUEST };
}

export function setBranchSuccess() {
  return { type: BRANCH_INPUT_ACTIONS.SET_BRANCH_SUCCESS };
}

export function setBranchError() {
  return { type: BRANCH_INPUT_ACTIONS.SET_BRANCH_ERROR };
}

export function loadBog(bog, holeId) {
  return { type: BOG_ACTIONS.LOAD_BOG, bog, holeId };
}

export function clearBog() {
  return { type: BOG_ACTIONS.CLEAR_BOG };
}
