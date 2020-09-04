import { createAxiosCancelable, getHeaderWithoutAuth } from '../../axiosHelpers';

export const treesApi = () => {
  const { client, cancel, cancelToken, isCancel } = createAxiosCancelable();
  return {
    getTreesInTheBog: (
      bogId = '',
      request = {},
    ) => {
      const url = '/api/bog/hole/tree';
      return client
        .post(
          url,
          {
            request: JSON.stringify(request),
            bogId: bogId,
          },
          {
            ...getHeaderWithoutAuth(),
            cancelToken,
          },
        )
        .then(response => {
          return response;
        })
        .catch(error => {
          if (!isCancel(error)) {
            // if we have cancelled we don't want to throw the 'error'
            throw error;
          }
        });
    },
    cancel,
  };
};

export default treesApi;
