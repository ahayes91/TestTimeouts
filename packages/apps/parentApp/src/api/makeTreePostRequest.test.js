import api from './makeTreePostRequest';
import treesApi from '@test/core-api/src/api/treesApi/trees';

jest.mock('@test/core-api/src/api/treesApi/trees');

describe('makeTreePostRequest', () => {
    it('calls getTreesInTheBog api', () => {
        const mockGetTreesInTheBog = jest.fn(() => Promise.resolve());
        treesApi.mockImplementation(() => ({
            getTreesInTheBog: mockGetTreesInTheBog,
          }));
        api.makeTreePostRequest('mockBogId');
        expect(mockGetTreesInTheBog).toHaveBeenCalled();
    });
})