import { put, call } from 'redux-saga/effects';
import { fetchBog } from '@test/core-api/src/api/limbsApi/bogApi';
import { fetchHoles } from '@test/core-api/src/api/holesApis/getHolesApi';
import { loadBogDetails } from '../actions';

export function* fetchBogDetails(payload) {
  const {
    bog: { bogId, holeId },
  } = payload;
  const bogResponse = yield call(fetchBog, [bogId]);
  const holesResponse = yield call(
    fetchHoles,
    holeId,
  );
  const bog = bogResponse[0];
  yield put(
    loadBogDetails(bog.name, bogId, bog, holesResponse),
  );
}

export default fetchBogDetails;
