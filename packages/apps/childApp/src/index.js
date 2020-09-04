import React from 'react';
import ReactDom from 'react-dom';
import singleSpaReact from 'single-spa-react';
import LimbsComponent from './component/App';

export const LimbsParcel = singleSpaReact({
  React,
  ReactDom,
  rootComponent: LimbsComponent,
});
