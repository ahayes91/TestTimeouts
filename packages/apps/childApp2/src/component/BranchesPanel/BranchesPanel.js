import React from 'react';
import { arrayOf, oneOfType, instanceOf } from 'prop-types';
import { Iterable } from 'immutable';
import Grid from '@material-ui/core/Grid';
import Branch, { branchShape } from './Branch';
import BranchesEmptyState from './BranchesEmptyState';
import BranchesLoadingState from './BranchesLoadingState';

const BranchesPanel = ({ branches }) => {
  return (
    <Grid
      component="section"
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      wrap="nowrap"
    >
      <BranchesLoadingState />
      <BranchesEmptyState />
      {branches && (
        <ul>
          {branches.map(branch => (
            <Branch
              key={`branch.${branch.timestamp}`}
              branch={branch}
            />
          ))}
        </ul>
      )}
    </Grid>
  );
};

BranchesPanel.propTypes = {
  branches: oneOfType([arrayOf(branchShape), instanceOf(Iterable)]),
};

export default BranchesPanel;
