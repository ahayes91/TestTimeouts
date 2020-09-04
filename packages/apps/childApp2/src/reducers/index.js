import { combineReducers } from 'redux';
import branches from './branches';
import limbs from './limbs';
import userBranchInput from './userBranchInput';
import bog from './bog';

// rootReducer
// add any additional reducers inside combineReducers
const rootReducer = combineReducers({
  branches,
  limbs,
  userBranchInput,
  bog,
});

export default rootReducer;
