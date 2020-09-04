import React from 'react';
import { Route } from 'react-router-dom';
import TheRattlinBog from '../TheRattlinBog/TheRattlinBog.component';

function Routes() {
  return (
    <Route
      path="/theRattlinBog/:bogId/:holeId/:referer?"
      render={() => {
        return <TheRattlinBog />;
      }}
    />
  );
}

export default Routes;
