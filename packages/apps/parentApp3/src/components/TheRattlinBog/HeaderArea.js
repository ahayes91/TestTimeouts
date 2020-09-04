import React from 'react';
import { string } from 'prop-types';
import Button from '@material-ui/core/Button';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getBogName } from '../../reducers/bog.selector';
import { getHoleTitle } from '../../reducers/hole.selector';

const HeaderArea = props => {
  const { referer } = props;

  const bogName = useSelector(getBogName);
  const holeTitle = useSelector(getHoleTitle);
  const fakeUrl = `/fakeUrl/`;

  return (
    <section data-testid="TheRattlinBogPage">
      {referer !== '' && (
          <Button
            variant="contained" 
            role="link" 
            onClick={() =>
              window.location.assign(fakeUrl)
            }>
            <FormattedMessage id="parentApp.goBack" />
          </Button>
      )}
      {bogName !== null && holeTitle !== '' ? (
        <>
          <Typography variant="h1" component="h1">
            {holeTitle}
          </Typography>
          {bogName && (
            <Typography variant="subtitle1" component="p" noWrap>
              {`${bogName.firstName} ${bogName.lastName}`}
            </Typography>
          )}
        </>
      ) : (
        <section data-testid="BogSkeleton" aria-label="Bog is loading">
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
          <Skeleton variant="rect" />
        </section>
      )}
    </section>
  );
};

HeaderArea.propTypes = {
  referer: string,
};

HeaderArea.defaultProps = {
  referer: '',
};

export default HeaderArea;
