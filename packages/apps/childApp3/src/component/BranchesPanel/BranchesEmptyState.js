import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import {
  getShowEmptyState,
  getShowBranchesUnavailableState,
} from '../../reducers/branches.selectors';

const BranchesEmptyState = () => {
  const showEmptyState = useSelector(getShowEmptyState);
  const showBranchesUnavailable = useSelector(
    getShowBranchesUnavailableState,
  );
  if (!showEmptyState && !showBranchesUnavailable) {
    return null;
  }
  return showEmptyState ? (
    <>
      <Typography variant="subtitle1" component="p">
        <strong><FormattedMessage id="childApp.noBranchesYet.title" /></strong>
      </Typography>
      <Typography variant="body2">
        <FormattedMessage id="childApp.noBranchesYet.message" />
      </Typography>
    </>
  ) : (
    <>
      <Typography variant="subtitle1" component="p">
        <strong><FormattedMessage id="childApp.branchesUnavailable.title" /></strong>
      </Typography>
      <Typography variant="body2">
        <FormattedMessage id="childApp.branchesUnavailable.message" />
      </Typography>
    </>
  );
};

BranchesEmptyState.propTypes = {};

export default BranchesEmptyState;
