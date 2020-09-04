import { all, takeLatest } from 'redux-saga/effects';
import rootSaga from './index';
import { BOG_ACTIONS } from '../actions/types';
import { fetchBogDetails } from './getBog.saga';

describe('Sagas', () => {
  it('root saga generates correct', () => {
    const generator = rootSaga();
    const allYield = generator.next();
    expect(allYield.value).toEqual(
      all([
        takeLatest(BOG_ACTIONS.FETCH_BOG_DETAILS, fetchBogDetails),
      ]),
    );
    const finalResult = generator.next();
    expect(finalResult.done).toEqual(true);
  });
});
