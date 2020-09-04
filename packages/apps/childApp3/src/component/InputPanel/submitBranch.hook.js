import setBranchApi from '@test/core-api/src/api/branchesApi/setBranchApi';
import {
  setBranch,
  setBranchSuccess,
  setBranchError,
  updateBranch,
} from '../../actions';

export default async function submitBranch(
  dispatch,
  message,
) {
  const { setBranch: setBranchRequest } = setBranchApi();
  dispatch(setBranch());
  try {
    await setBranchRequest({});
    const timestamp = new Date(Date.now()).getTime();
    const latestBranch = {
      data: {
        createdAt: timestamp,
        text: message,
      },
    };
    dispatch(setBranchSuccess());
    dispatch(updateBranch(latestBranch));
  } catch {
    dispatch(setBranchError());
  }
}
