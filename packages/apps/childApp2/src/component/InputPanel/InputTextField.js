import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { getUserBranchInputText } from '../../reducers/userBranchInput.selectors';
import { updateBranchInput } from '../../actions';

const InputTextField = () => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const currentBranchText = useSelector(getUserBranchInputText);
  const updateBranchInputCallback = useCallback(
    event => {
      const newBranch = event?.target?.value;
      dispatch(updateBranchInput(newBranch));
    },
    [dispatch],
  );

  return (
    <Grid item>
      <TextField
        fullWidth
        data-testid="branchInputField"
        label={formatMessage({ id: "childApp.newBranch"})}
        onChange={updateBranchInputCallback}
        multiline
        value={currentBranchText}
      />
    </Grid>
  );
};

InputTextField.propTypes = {};

InputTextField.defaultProps = {};

export default InputTextField;
