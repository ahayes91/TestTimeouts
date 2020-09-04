import { getLangFile } from './intlApi';

describe('getLangFile() function', () => {
  it('checking that en files are not empty', () => {
    const enKeysLength = Object.keys(getLangFile('en-US')).length;

    expect(enKeysLength).toBeGreaterThan(0);
  });
});
