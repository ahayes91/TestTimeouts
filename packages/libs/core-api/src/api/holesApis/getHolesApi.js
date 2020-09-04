import { createAxios, getHeaderWithoutAuth } from '../../axiosHelpers';

export const holesAxios = createAxios(1000, 15000);

export const fetchHoles = async (
  holeId,
) => {
  const endpoint = `/api/bog/hole/${holeId}`;
  const response = await holesAxios.get(endpoint, {
    ...getHeaderWithoutAuth(),
  });

  return response;
};
