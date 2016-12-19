
import { quadrants, rows, columns, valid } from './sudoku';

const inputRank2 = [
  1, 2, 3, 4,
  3, 4, 1, 2,
  2, 3, 4, 1,
  4, 1, 2, 3,
];

const rowsRank2 = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 3, 4, 1],
  [4, 1, 2, 3],
];

const columnsRank2 = [
  [1, 3, 2, 4],
  [2, 4, 3, 1],
  [3, 1, 4, 2],
  [4, 2, 1, 3],
];

const quadrantsRank2 = [
  [
    1, 2,
    3, 4,
  ],
  [
    3, 4,
    1, 2,
  ],
  [
    2, 3,
    4, 1,
  ],
  [
    4, 1,
    2, 3,
  ]
];

const badInputRank2 = [
  1, 1, 1, 1,
  3, 4, 1, 2,
  2, 3, 4, 1,
  4, 1, 2, 3,
];

const emptyInputRank2 = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0,
];

const inputRank3 = [
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

const rowsRank3 = [
  [2, 4, 1, 9, 8, 7, 3, 5, 6],
  [5, 8, 3, 2, 6, 4, 7, 1, 9],
  [7, 6, 9, 1, 5, 3, 8, 2, 4],
  [6, 1, 8, 7, 9, 5, 4, 3, 2],
  [9, 5, 7, 4, 3, 2, 1, 6, 8],
  [4, 3, 2, 6, 1, 8, 9, 7, 5],
  [1, 2, 4, 5, 7, 9, 6, 8, 3],
  [3, 7, 5, 8, 4, 6, 2, 9, 1],
  [8, 9, 6, 3, 2, 1, 5, 4, 7],
];

const columnsRank3 = [
  [2, 5, 7, 6, 9, 4, 1, 3, 8],
  [4, 8, 6, 1, 5, 3, 2, 7, 9],
  [1, 3, 9, 8, 7, 2, 4, 5, 6],
  [9, 2, 1, 7, 4, 6, 5, 8, 3],
  [8, 6, 5, 9, 3, 1, 7, 4, 2],
  [7, 4, 3, 5, 2, 8, 9, 6, 1],
  [3, 7, 8, 4, 1, 9, 6, 2, 5],
  [5, 1, 2, 3, 6, 7, 8, 9, 4],
  [6, 9, 4, 2, 8, 5, 3, 1, 7],
];

const quadrantsRank3 = [
  [
    2, 4, 1,
    5, 8, 3,
    7, 6, 9,
  ],
  [
    9, 8, 7,
    2, 6, 4,
    1, 5, 3,
  ],
  [
    3, 5, 6,
    7, 1, 9,
    8, 2, 4,
  ],
  [
    6, 1, 8,
    9, 5, 7,
    4, 3, 2,
  ],
  [
    7, 9, 5,
    4, 3, 2,
    6, 1, 8,
  ],
  [
    4, 3, 2,
    1, 6, 8,
    9, 7, 5,
  ],
  [
    1, 2, 4,
    3, 7, 5,
    8, 9, 6,
  ],
  [
    5, 7, 9,
    8, 4, 6,
    3, 2, 1,
  ],
  [
    6, 8, 3,
    2, 9, 1,
    5, 4, 7,
  ]
];

const badInputRank3 = [
  2, 4, 1, 9, 8, 7, 2, 2, 2,
  5, 8, 3, 2, 6, 4, 7, 1, 9,
  7, 6, 9, 1, 5, 3, 8, 2, 4,
  6, 1, 8, 7, 9, 5, 4, 3, 2,
  9, 5, 7, 4, 3, 2, 1, 6, 8,
  4, 3, 2, 6, 1, 8, 9, 7, 5,
  1, 2, 4, 5, 7, 9, 6, 8, 3,
  3, 7, 5, 8, 4, 6, 2, 9, 1,
  8, 9, 6, 3, 2, 1, 5, 4, 7,
];

const emptyInputRank3 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
];

it('arranges an array values into rows', () => {
  expect(rows(inputRank2)).toEqual(rowsRank2);
  expect(rows(inputRank3)).toEqual(rowsRank3);
});

it('arranges an array of values into columns', () => {
  expect(columns(inputRank2)).toEqual(columnsRank2);
  expect(columns(inputRank3)).toEqual(columnsRank3);
});

it('arranges an array of values into sudoku quadrants', () => {
  expect(quadrants(inputRank2)).toEqual(quadrantsRank2);
  expect(quadrants(inputRank3)).toEqual(quadrantsRank3);
});

it('validates the rows, columns and quadrants of a sudoku', () => {
  expect(valid(rows(emptyInputRank2))).toBe(true);
  expect(valid(rows(inputRank2))).toBe(true);
  expect(valid(columns(inputRank2))).toBe(true);
  expect(valid(quadrants(inputRank2))).toBe(true);

  expect(valid(rows(emptyInputRank3))).toBe(true);
  expect(valid(rows(inputRank3))).toBe(true);
  expect(valid(columns(inputRank3))).toBe(true);
  expect(valid(quadrants(inputRank3))).toBe(true);
});

it('detects bad rows,columns and quadrants of a sudoku', () => {
  expect(valid(rows(badInputRank2))).toBe(false);
  expect(valid(columns(badInputRank2))).toBe(false);
  expect(valid(quadrants(badInputRank2))).toBe(false);

  expect(valid(rows(badInputRank3))).toBe(false);
  expect(valid(columns(badInputRank3))).toBe(false);
  expect(valid(quadrants(badInputRank3))).toBe(false);
});
