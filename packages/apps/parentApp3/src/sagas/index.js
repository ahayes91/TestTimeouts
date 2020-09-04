import { all, takeLatest } from 'redux-saga/effects';
import { BOG_ACTIONS } from '../actions/types';
import { fetchBogDetails } from './getBog.saga';

export default function*() {
  yield all([
    takeLatest(BOG_ACTIONS.FETCH_BOG_DETAILS, fetchBogDetails),
  ]);
}
