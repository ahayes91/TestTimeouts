import { createAxiosCancelable, getHeaderWithoutAuth } from '../../axiosHelpers';

export const getLimbsInBogUrl = bogRefId =>
  `/api/bog/${bogRefId}/limbs`;

/**
 * @param {string} bogRefId
 */
export const fetchLimbsInBogCancelable = () => {
  const { client, cancel, cancelToken, isCancel } = createAxiosCancelable();
  return {
    fetchLimbsInBog: (bogRefId) => {
      const endpoint = getLimbsInBogUrl(bogRefId);
      return client
        .get(endpoint, {
          ...getHeaderWithoutAuth(),
          cancelToken,
        })
        .then(response => {
          return response.data;
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
