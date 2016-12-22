import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const unsolvedExtremeRank3 = [
  0, 0, 7, 0, 9, 0, 4, 0, 0,
  0, 4, 0, 1, 0, 2, 0, 3, 0,
  3, 0, 0, 0, 7, 0, 0, 0, 9,
  0, 9, 0, 0, 0, 0, 0, 7, 0,
  6, 0, 8, 0, 0, 0, 5, 0, 2,
  0, 1, 0, 0, 0, 0, 0, 8, 0,
  1, 0, 0, 0, 5, 0, 0, 0, 6,
  0, 5, 0, 3, 0, 9, 0, 2, 0,
  0, 0, 9, 0, 2, 0, 8, 0, 0,
];

ReactDOM.render(
  <App board={unsolvedExtremeRank3}/>,
  document.getElementById('root')
);
