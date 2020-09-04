import { call } from 'redux-saga/effects';
import { fetchBog } from '@test/core-api/src/api/limbsApi/bogApi';
import { fetchHoles } from '@test/core-api/src/api/holesApis/getHolesApi';
import { fetchBogDetails } from './getBog.saga';

describe('getBog saga', () => {
  const bogId = 'humphrey';
  const holeId = 'Kindergarden1';
  const mockPayload = {
    bog: { bogId, holeId },
  };

  it('fetches bog and hole details', () => {
    const generator = fetchBogDetails(mockPayload);
    const bogCall = generator.next(bogId);
    expect(bogCall.value).toEqual(
      call(fetchBog, [bogId]),
    );
    const holesCall = generator.next(holeId);
    expect(holesCall.value).toEqual(
      call(fetchHoles, holeId),
    );
    generator.next();
    const finished = generator.next();
    expect(finished.done).toEqual(true);
  });
});
