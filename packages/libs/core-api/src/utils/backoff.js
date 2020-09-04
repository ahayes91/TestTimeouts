/**
 *
 * Converts `angular-backoff`-like parameters to
 * `axios-retry` compatible ones.
 *
 * @param {number} min
 * @param {number} max
 * @returns {IAxiosRetryConfig}
 */
const backoff = (min, max) => ({
  retries: Math.ceil(Math.log2(max / (1.2 * min))), // see the extra delay below
  retryDelay: (retryCount = 0) => {
    const delay = (2 ** retryCount - 1) * min;
    const randomSum = delay * 0.2 * Math.random(); // 0-20% of the delay
    return delay + randomSum;
  },
});

export default backoff;
