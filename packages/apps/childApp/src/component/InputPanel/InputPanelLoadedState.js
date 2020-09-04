import React from 'react';
import { useSelector } from 'react-redux';
import { func } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { getAreBranchesLoading } from '../../reducers/branches.selectors';
import InputActionButtons from './InputActionButtons';
import InputTextField from './InputTextField';

const InputPanelLoadedState = props => {
  const { onClose } = props;
  const areBranchesLoading = useSelector(getAreBranchesLoading);
  if (areBranchesLoading) {
    return null;
  }
  return (
    <Grid
      container
      item
      wrap="nowrap"
      direction="column"
      data-testid="branchesPanelLoadedState"
    >
      <InputTextField />
      <InputActionButtons onClose={onClose} />
    </Grid>
  );
};

InputPanelLoadedState.propTypes = {
  onClose: func,
};

InputPanelLoadedState.defaultProps = {};

export default InputPanelLoadedState;
