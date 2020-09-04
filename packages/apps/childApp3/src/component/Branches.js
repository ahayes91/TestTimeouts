import React from 'react';
import { useSelector } from 'react-redux';
import { string } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {
  getBranchesWithLimbs,
  getShowBranchesUnavailableState,
} from '../reducers/branches.selectors';
import useBranchesFetchHook from './Branches.hook';
import BranchesPanel from './BranchesPanel/BranchesPanel';
import InputPanel from './InputPanel/InputPanel';

const Branches = ({
  holeRefId,
  bogRefId,
}) => {
  useBranchesFetchHook(
    holeRefId,
    bogRefId,
  );
  const branches = useSelector(getBranchesWithLimbs);
  const areBranchesUnavailable = useSelector(
    getShowBranchesUnavailableState,
  );
  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      justify="space-between"
      component="section"
    >
      <BranchesPanel branches={branches} />
      {!areBranchesUnavailable && <InputPanel />}
    </Grid>
  );
};

Branches.propTypes = {
  holeRefId: string,
  bogRefId: string,
};
Branches.defaultProps = {};

export default Branches;
