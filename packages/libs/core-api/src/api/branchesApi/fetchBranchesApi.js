import { createAxiosCancelable, getHeaderWithoutAuth } from '../../axiosHelpers';

export default function fetchBranchesCancelable() {
  const { client, cancel, cancelToken, isCancel } = createAxiosCancelable();
  return {
    fetchBranches: async ({
      bogRefId,
      holeRefId,
      config = {},
    }) => {
      const keyPrefix = holeRefId;
      const requestPayload = {
        keyPrefix,
        owner: bogRefId,
      };
      return client
        .post(`/api/bog/hole/tree/branch`, requestPayload, {
          ...config,
          ...getHeaderWithoutAuth(),
          cancelToken,
        })
        .then(response => {
          return {
            ok: response.data.ok,
            error: false,
            bogId: bogRefId,
            data: response.data.result,
          };
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
}
