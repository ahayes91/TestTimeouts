import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { getAreBranchesLoading } from '../../reducers/branches.selectors';

const BranchesLoadingState = () => {
  const { formatMessage } = useIntl();
  const areBranchesLoading = useSelector(getAreBranchesLoading);
  if (!areBranchesLoading) {
    return null;
  }
  return (
    <Grid
      item
      aria-label={formatMessage({
        id: 'childApp.branchesLoading',
      })}
      data-testid="branchesLoadingState"
    >
      <Skeleton width="100%" variant="text" />
      <Skeleton width="100%" variant="rect" />
    </Grid>
  );
};

BranchesLoadingState.propTypes = {};

BranchesLoadingState.defaultProps = {};

export default BranchesLoadingState;
