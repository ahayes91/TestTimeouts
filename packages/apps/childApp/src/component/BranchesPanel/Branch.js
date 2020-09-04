import React from 'react';
import { shape, string } from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Branch = ({ branch }) => {
  const { name } = branch;
  return (
    <Grid
      container
      component="li"
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      data-testid="branchContainer"
    >
      <Typography
        variant="body1"
        data-testid="branchText"
      >
        {name}
      </Typography>
    </Grid>
  );
};

export const branchShape = shape({
  name: string,
});

Branch.propTypes = {
  branch: branchShape,
};

export default Branch;
