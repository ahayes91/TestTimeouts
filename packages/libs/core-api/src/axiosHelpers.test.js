import axios from 'axios';
import axiosRetry from 'axios-retry';
import backoff from './utils/backoff';
import {
  getHeaderWithoutAuth,
  createAxiosCancelable,
  createAxios,
  customCacheInvalidate,
} from './axiosHelpers';

jest.mock('./utils/backoff');

jest.mock('axios');
jest.mock('axios-retry');

describe('axiosHelpers', () => {
  describe('getHeaderWithoutAuth function', () => {
    it('returns headers with no optional headers', () => {
      expect.assertions(1);
      expect(getHeaderWithoutAuth()).toEqual({
        headers: {
        },
      });
    });
  });

  describe('create axios without auth header', () => {
    let mockClient;
    let mockBackoff;
    const min = 33;
    const max = 34;

    beforeEach(() => {
      mockClient = {
        interceptors: {
          response: {
            use: jest.fn(),
          },
        },
      };

      axios.create.mockReturnValue(mockClient);

      mockBackoff = {
        retries: 1,
        retryDelay: jest.fn(),
      };
      backoff.mockReturnValue(mockBackoff);

    });

    it('will not include Authorization in the headers if false', () => {
      const axiosClient = createAxios(min, max, false);

      expect(axiosClient.client).not.toBeNull();
      expect(axios.create).toHaveBeenCalledWith({
        headers: {
        },
      });
    });
  });

  describe('create cancelable axios', () => {
    let mockClient;
    let mockBackoff;

    beforeEach(() => {

      axios.CancelToken = {
        source: () => {
          return {
            cancel: jest.fn(),
          };
        },
      };

      mockClient = {
        interceptors: {
          response: {
            use: jest.fn(),
          },
        },
      };

      axios.create.mockReturnValue(mockClient);

      mockBackoff = {
        retries: 1,
        retryDelay: jest.fn(),
      };
      backoff.mockReturnValue(mockBackoff);
    });

    it('when min and max retry times are specified, client is correctly setup with all dependencies configured correctly', () => {
      const min = 33;
      const max = 34;
      const axiosClient = createAxiosCancelable({ min, max });

      expect(axiosClient.client).not.toBeNull();
      expect(axiosClient.cancel).not.toBeNull();
      expect(axiosClient.cancelToken).not.toBeNull();
      expect(axiosClient.isCancel).not.toBeNull();

      expect(axios.create).toHaveBeenCalledWith({
        headers: {
        },
      });

      expect(backoff).toHaveBeenCalledWith(min, max);

      expect(axiosRetry).toHaveBeenCalledWith(mockClient, mockBackoff);
    });

    it('when no min/max specified and default min and max retry times are used, client is correctly setup with all dependencies configured correctly', () => {
      const expectedMin = 1000;
      const expectedMax = 15000;

      createAxiosCancelable();

      expect(backoff).toHaveBeenCalledWith(expectedMin, expectedMax);
    });
    describe('cache', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('when withCache is true, axios create is called with adapter', () => {
        createAxiosCancelable({ withCache: true });

        expect(axios.create).toBeCalledWith(
          expect.objectContaining({
            adapter: expect.any(Function),
          }),
        );
      });

      it('when withCache is false, axios create is called without adapter', () => {
        createAxiosCancelable({ withCache: false });

        expect(axios.create).not.toBeCalledWith(
          expect.objectContaining({
            adapter: expect.any(Function),
          }),
        );
      });

      it('when withCache not specified, axios create is called without adapter', () => {
        createAxiosCancelable();

        expect(axios.create).not.toBeCalledWith(
          expect.objectContaining({
            adapter: expect.any(Function),
          }),
        );
      });

      it('when invalidate function on cache is called, it looks for clearCacheEntry in the request before invalidating the cache', async () => {
        const mockRemoveItem = jest.fn();
        const mockUuid = 'mockUuid';
        const mockConfig = {
          store: {
            removeItem: mockRemoveItem,
          },
          uuid: mockUuid,
        };

        customCacheInvalidate(mockConfig, {});
        expect(mockRemoveItem).not.toHaveBeenCalled();
        const mockRequest = { clearCacheEntry: true };

        customCacheInvalidate(mockConfig, mockRequest);
        expect(mockRemoveItem).toHaveBeenCalledWith(mockUuid);
      });
    });
  });
});
