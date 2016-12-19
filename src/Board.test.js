import React from 'react';
import {shallow} from 'enzyme';
import range from 'lodash/range';

import Board from './Board';
import { quadrants } from './sudoku';

// small sudokus

const goodOne =  [
  1, 2, 0, 4,
  0, 0, 0, 0,
  0, 0, 4, 0,
  4, 0, 0, 3,
];

const badOne = [
  1, 2, 0, 4,
  0, 0, 0, 0,
  0, 0, 0, 4,
  4, 0, 0, 3,
];

const goodCompleteOne = [
  1, 2, 3, 4,
  3, 4, 1, 2,
  2, 3, 4, 1,
  4, 1, 2, 3,
];

const badCompleteOne = [
 1, 2, 3, 4,
 3, 4, 1, 2,
 2, 1, 4, 1,
 4, 1, 2, 3,
];

// regular 9 digit sudoku

const goodTwo = [
  0, 5, 0, 4, 0, 0, 0, 6, 9,
  0, 0, 4, 0, 2, 0, 5, 8, 1,
  0, 0, 1, 0, 6, 7, 3, 0, 0,
  0, 0, 0, 0, 3, 6, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 8,
  1, 0, 0, 9, 7, 0, 6, 5, 3,
  0, 0, 9, 8, 0, 0, 0, 4, 7,
  0, 0, 5, 0, 0, 2, 0, 9, 0,
  0, 0, 0, 0, 0, 0, 2, 0, 0,
];

const goodCompleteTwo = [
  2, 4, 1, 9, 8, 7, 3, 5, 6,
  5, 8, 3, 2, 6, 4, 7, 1, 9,
  7, 6, 9, 1, 5, 3, 8, 2, 4,
  6, 1, 8, 7, 9, 5, 4, 3, 2,
  9, 5, 7, 4, 3, 2, 1, 6, 8,
  4, 3, 2, 6, 1, 8, 9, 7, 5,
  1, 2, 4, 5, 7, 9, 6, 8, 3,
  3, 7, 5, 8, 4, 6, 2, 9, 1,
  8, 9, 6, 3, 2, 1, 5, 4, 7,
];

it('renders a sudoku board with 9 rows and 81 cells', () => {
  const board = shallow(<Board values={goodCompleteTwo}/>);
  const cellsPerRow = Math.sqrt(goodCompleteTwo.length);
  const table = board.find('table.sudoku-board');
  expect(table.length).toBe(1);
  expect(table.find('table.sudoku-quadrant').length).toBe(cellsPerRow);
  expect(table.find('td.sudoku-cell').length).toBe(goodCompleteTwo.length);
});

it('renders a unique cell for every value', () => {
  const board = shallow(<Board values={goodCompleteTwo}/>);
  const qs = quadrants(goodCompleteTwo);
  const root = Math.sqrt(goodCompleteTwo.length);

  for (const q of range(root)) {
    const quadrant = board.find(`.sudoku-quadrant.q-${q}`);
    for (const c of range(root)) {
      expect(quadrant.find(`.sudoku-cell.c-${c}`).contains(qs[q][c])).toBe(true);
    }
  }
})
