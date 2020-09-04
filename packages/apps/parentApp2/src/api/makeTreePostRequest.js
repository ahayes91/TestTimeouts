import treesApi from '@test/core-api/src/api/treesApi/trees';

export default {
  makeTreePostRequest(bogId) {
    const request = {
      message: 'And in that hole there was a tree, a rare tree, a rattlin tree'
    };
    const { getTreesInTheBog } = treesApi();
    getTreesInTheBog(bogId, request).then(
      response => {
        return; // we do stuff here in our production code but it doesn't matter once the post call is being made
      },
    );
  },
};
