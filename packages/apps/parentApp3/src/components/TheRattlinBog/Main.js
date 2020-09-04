import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import BranchApp from '@test/childApp3/src/component/App';
import api from '../../api/makeTreePostRequest';
import {
  getHoleActivityId,
  getHoleRefId,
} from '../../reducers/hole.selector';
import { getBogId } from '../../reducers/bog.selector';

const Main = () => {
  const holeActivityRefId = useSelector(getHoleActivityId);
  const holeRefId = useSelector(getHoleRefId);
  const bogId = useSelector(getBogId);

  useEffect(() => {
    if (bogId && holeActivityRefId) {
      api.makeTreePostRequest(bogId, holeActivityRefId);
    }
  }, [bogId, holeActivityRefId]);


  return (
    <Grid
      container
      justify="space-between"
      data-testid="mainContainer"
    >
      <Grid
        item
        md={9}
        sm={12}
        component="section"
      >
        <Typography
          variant="h2"
        >
          <FormattedMessage id="parentApp.heading" />
        </Typography>
      </Grid>
      <Grid
        item
        md={3}
        sm={12}
        component="section"
      >
        {holeRefId && (
          <>
            <Typography
              variant="h2"
            >
              <FormattedMessage id="parentApp.subHeading" />
            </Typography>
            <BranchApp
              holeRefId={holeRefId}
              bogRefId={bogId}
            />
          </>
        )}
      </Grid>
    </Grid>
  );
};

Main.propTypes = {};

export default Main;
