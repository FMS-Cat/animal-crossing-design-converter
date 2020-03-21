import { App } from './view/components/App';
import { Designer } from './Designer';
import React from 'react';
import ReactDOM from 'react-dom';

const designer = new Designer();

ReactDOM.render(
  <App designer={ designer } />,
  document.getElementById( 'app' )
);
