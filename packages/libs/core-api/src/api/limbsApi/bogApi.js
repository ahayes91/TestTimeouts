import { createAxios, getHeaderWithoutAuth } from '../../axiosHelpers';

export const bogAxios = createAxios(1000, 15000);

export const fetchBog = async (
  bogIds = [],
) => {
  const endpoint = '/api/bog';
  const response = await bogAxios.post(endpoint, bogIds, {
    ...getHeaderWithoutAuth(),
  });
  return response.data;
};
