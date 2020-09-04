import keyMirror from '@test/react-utils/src/keyMirror';

export const BRANCH_ACTIONS = keyMirror({
  FETCH_BRANCH_REQUEST: null,
  FETCH_BRANCH_SUCCESS: null,
  FETCH_BRANCH_ERROR: null,
  UPDATE_BRANCH: null,
  SET_BRANCH_UNAVAILABLE: null,
});

export const LIMBS_ACTIONS = keyMirror({
  FETCH_LIMBS_REQUEST: null,
  FETCH_LIMBS_SUCCESS: null,
  FETCH_LIMBS_ERROR: null,
});

export const BRANCH_INPUT_ACTIONS = keyMirror({
  UPDATE_BRANCH_INPUT: null,
  SET_BRANCH_REQUEST: null,
  SET_BRANCH_SUCCESS: null,
  SET_BRANCH_ERROR: null,
});

export const BOG_ACTIONS = keyMirror({
  LOAD_BOG: null,
  CLEAR_BOG: null,
});
