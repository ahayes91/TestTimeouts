import axios from 'axios';
import axiosRetry from 'axios-retry';
import { setupCache } from 'axios-cache-adapter';
import backoff from './utils/backoff';

// Exported only for unit test coverage
export const customCacheInvalidate = async (config, request) => {
  if (request.clearCacheEntry) {
    await config.store.removeItem(config.uuid);
  }
};

const cache = setupCache({
  // 15 minute cache
  maxAge: 15 * 60 * 1000,
  // Invalidate only when a specific option is passed through config
  invalidate: customCacheInvalidate,
});

export const getHeaderWithoutAuth = (optionalHeaders = {}) => {
  return {
    headers: {
      ...optionalHeaders,
    },
  };
};

/**
 * @param {number} min retry delay in ms
 * @param {number} max retry delay in ms
 * @param {boolean} includeAuth whether to include Authorization in headers (default to true)
 * @returns {AxiosInstance}
 */
export const createAxios = (min, max, includeAuth = false) => {
  const auth = includeAuth ? () => {} : getHeaderWithoutAuth();
  const client = axios.create(auth);
  axiosRetry(client, backoff(min, max));
  return client;
};

export const createAxiosCancelable = ({
  min = 1000,
  max = 15000,
  withCache = false,
} = {}) => {
  const canceler = axios.CancelToken.source();
  const auth = getHeaderWithoutAuth();
  if (withCache) {
    auth.adapter = cache.adapter;
  }
  const client = axios.create(auth);
  axiosRetry(client, backoff(min, max));
  return {
    client,
    cancel: canceler.cancel,
    cancelToken: canceler.token,
    isCancel: axios.isCancel,
  };
};
