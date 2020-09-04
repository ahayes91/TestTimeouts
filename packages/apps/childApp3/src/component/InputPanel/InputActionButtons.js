import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { func } from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import submitBranch from './submitBranch.hook';
import { getUserBranchInputText } from '../../reducers/userBranchInput.selectors';
import { updateBranchInput } from '../../actions';

const InputActionButtons = ({ onClose }) => {
  const dispatch = useDispatch();
  const currentBranchText = useSelector(getUserBranchInputText);

  const cancelCallback = useCallback(() => {
    dispatch(updateBranchInput(''));
    onClose();
  }, [dispatch]);
  
  const submitBranchCallback = useCallback(() => {
    submitBranch(dispatch, currentBranchText);
  }, [dispatch, currentBranchText]);

  return (
    <Grid
      item
      container
      direction="row"
      justify="space-between"
    >
      <Button
        data-testid="branchCancelButton"
        variant="outlined"
        size="large"
        onClick={cancelCallback}
      >
        <FormattedMessage id="childApp.cancelButton" />
      </Button>

      <Button
        data-testid="branchSendButton"
        variant="contained"
        size="large"
        color="primary"
        onClick={submitBranchCallback}
      >
        <FormattedMessage id="childApp.sendButton" />
      </Button>
    </Grid>
  );
};

InputActionButtons.propTypes = {
  onClose: func,
};

InputActionButtons.defaultProps = {};

export default InputActionButtons;
