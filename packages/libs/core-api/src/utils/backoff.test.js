import backoff from './backoff';

describe('The backoff() Axios helper function', () => {
  it('converts milliseconds to correct AxiosRetry parameters', () => {
    const { retries, retryDelay } = backoff(1000, 16000);

    expect(retries).toBe(4);

    expect(retryDelay()).toBe(0);

    expect(retryDelay(1)).toBeGreaterThanOrEqual(1000);
    expect(retryDelay(1)).toBeLessThan(1200);

    expect(retryDelay(2)).toBeGreaterThanOrEqual(3000);
    expect(retryDelay(2)).toBeLessThan(3600);

    expect(retryDelay(3)).toBeGreaterThanOrEqual(7000);
    expect(retryDelay(3)).toBeLessThan(8400);

    expect(retryDelay(4)).toBeGreaterThanOrEqual(15000);
    expect(retryDelay(4)).toBeLessThan(18000);
  });
});
