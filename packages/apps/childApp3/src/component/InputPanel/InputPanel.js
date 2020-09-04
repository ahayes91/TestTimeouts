import React from 'react';
import { func } from 'prop-types';
import InputPanelLoadingState from './InputPanelLoadingState';
import InputPanelLoadedState from './InputPanelLoadedState';

const InputPanel = props => {
  const { onClose } = props;
  return (
    <>
      <InputPanelLoadingState />
      <InputPanelLoadedState onClose={onClose} />
    </>
  );
};

InputPanel.propTypes = {
  onClose: func,
};
InputPanel.defaultProps = {};

export default InputPanel;
