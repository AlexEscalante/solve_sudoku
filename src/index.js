import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createBoard } from './sudoku';

const trivial = [
  2, 4, 1, 9, 8, 7, 3, 5, 6,
  5, 0, 0, 0, 0, 0, 0, 0, 9,
  7, 0, 9, 1, 5, 3, 8, 0, 4,
  6, 0, 8, 0, 0, 0, 4, 0, 2,
  9, 0, 7, 0, 3, 0, 1, 0, 8,
  4, 0, 2, 0, 0, 0, 9, 0, 5,
  1, 0, 4, 5, 7, 9, 6, 0, 3,
  3, 0, 0, 0, 0, 0, 0, 0, 1,
  8, 9, 6, 3, 2, 1, 5, 4, 7,
];

const extreme = [
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

var boards = [
    {label: 'empty',   value: createBoard(3)},
    {label: 'trivial', value: trivial},
    {label: 'extreme', value: extreme},
];

ReactDOM.render(
  <App boards={boards}/>,
  document.getElementById('root')
);
