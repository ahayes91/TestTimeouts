import { createAxiosCancelable, getHeaderWithoutAuth } from '../../axiosHelpers';

export default function setBranchCancelable() {
  const { client, cancel, cancelToken, isCancel } = createAxiosCancelable();
  return {
    setBranch: async ({
      config = {},
    }) => {
      const requestPayload = {
        message: 'dummy payload doesnt matter in this example repo',
      };
      return client
        .post(`/api/bog/hole/tree/branch`, requestPayload, {
          ...config,
          ...getHeaderWithoutAuth(),
          cancelToken,
        })
        .then(response => {
          return { ok: response.data.ok, error: false };
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
