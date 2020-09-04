import { combineReducers } from 'redux';
import bog from './bog.reducer';

// rootReducer
// add any additional reducers inside combineReducers
const rootReducer = combineReducers({
  bog,
});

export default rootReducer;
