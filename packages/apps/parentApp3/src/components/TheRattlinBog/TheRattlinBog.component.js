import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Main from './Main';
import HeaderArea from './HeaderArea';
import { fetchBogDetails, clearReduxStore } from '../../actions/index';

const TheRattlinBogContainer = () => {
  const params = useParams();
  const { bogId, holeId, referer } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBogDetails(bogId, holeId));
  }, [fetchBogDetails, bogId, holeId]);

  useEffect(() => {
    return () => {
      dispatch(clearReduxStore());
    };
  }, []);

  return (
    <>
      <HeaderArea
        referer={referer}
      />
      <Main />
    </>
  );
};

export default TheRattlinBogContainer;
