import { range } from 'lodash';

import { rank2Symbols, rank3Symbols, quadrants, rows, columns, valid, complete, vacants, locate, candidates, move,
  solve, rankByCandidateCount} from './sudoku';

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

const unsolvedInputRank2 = [
  1, 0, 0, 4,
  0, 0, 0, 0,
  0, 0, 0, 0,
  4, 0, 0, 3,
];

const unsolvedInputRank2_2 = [
   1, 2, 0, 4,
   0, 0, 0, 0,
   0, 0, 0, 0,
   4, 0, 0, 3
];

const unsolvedInputRank2_3 = [
  1, 3, 2, 4,
  2, 4, 3, 1,
  3, 2, 0, 0,
  4, 0, 0, 3
];

const vacantsRank2 = [
  1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14
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

const badUnsolvedExtremeRank3 = [
  0, 0, 7, 0, 9, 0, 4, 0, 0,
  0, 4, 0, 1, 0, 2, 0, 3, 0,
  3, 0, 0, 0, 7, 0, 0, 0, 9,
  0, 9, 0, 0, 0, 0, 0, 7, 0,
  6, 0, 8, 0, 0, 0, 5, 0, 2,
  0, 1, 0, 0, 0, 0, 0, 8, 0,
  1, 0, 0, 7, 0, 0, 0, 0, 6,
  0, 5, 0, 3, 0, 9, 0, 2, 0,
  0, 0, 9, 0, 2, 0, 8, 0, 7,
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

const unsolvedInputRank3 = [
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

const vacantsRank3 = [
  10, 11, 12, 13, 14, 15, 16,
  19,                     25,
  28,     30, 31, 32,     34,
  37,     39,     41,     43,
  46,     48, 49, 50,     52,
  55,                     61,
  64, 65, 66, 67, 68, 69, 70
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

  expect(valid(rows(badInputRank2))).toBe(false);
  expect(valid(columns(badInputRank2))).toBe(false);
  expect(valid(quadrants(badInputRank2))).toBe(false);

  expect(valid(rows(emptyInputRank3))).toBe(true);
  expect(valid(rows(inputRank3))).toBe(true);
  expect(valid(columns(inputRank3))).toBe(true);
  expect(valid(quadrants(inputRank3))).toBe(true);

  expect(valid(rows(badInputRank3))).toBe(false);
  expect(valid(columns(badInputRank3))).toBe(false);
  expect(valid(quadrants(badInputRank3))).toBe(false);
});

it('validates a whole sudoku', () => {
  expect(valid(inputRank2)).toBe(true);
  expect(valid(inputRank3)).toBe(true);
  expect(valid(emptyInputRank2)).toBe(true);
  expect(valid(emptyInputRank3)).toBe(true);

  expect(valid(badInputRank2)).toBe(false);
  expect(valid(badInputRank3)).toBe(false);

  expect(valid(unsolvedInputRank2_2)).toBe(true);
  expect(valid(unsolvedInputRank2_3)).toBe(true);
});

it('validate edge cases', () => {
  expect(valid([])).toBe(false);
})

it('detects complete sudokus', () => {
  expect(complete(inputRank2)).toBe(true);
  expect(complete(inputRank3)).toBe(true);
  expect(complete(badInputRank2)).toBe(true);
  expect(complete(badInputRank3)).toBe(true);
  expect(complete(unsolvedInputRank2)).toBe(false);
  expect(complete(unsolvedInputRank3)).toBe(false);
});

it('collects vacant positions on the board', () => {
  expect(vacants(emptyInputRank2)).toEqual(range(0, 2 * 2 * 2 * 2));
  expect(vacants(emptyInputRank3)).toEqual(range(0, 3 * 3 * 3 * 3));
  expect(vacants(unsolvedInputRank2)).toEqual(vacantsRank2);
  expect(vacants(unsolvedInputRank3)).toEqual(vacantsRank3);
});

it('locates the row, column and quadrant of any given index in the board', () => {
  expect(locate(inputRank2, 0)).toEqual([0, 0, 0]);
  expect(locate(inputRank2, 3)).toEqual([0, 3, 1]);
  expect(locate(inputRank2, 5)).toEqual([1, 1, 0]);
  expect(locate(inputRank2, 6)).toEqual([1, 2, 1]);
  expect(locate(inputRank2, 9)).toEqual([2, 1, 2]);
  expect(locate(inputRank2, 10)).toEqual([2, 2, 3]);
  expect(locate(inputRank2, 12)).toEqual([3, 0, 2]);
  expect(locate(inputRank2, 15)).toEqual([3, 3, 3]);

  expect(locate(inputRank3, 0)).toEqual([0, 0, 0]);
  expect(locate(inputRank3, 8)).toEqual([0, 8, 2]);
  expect(locate(inputRank3, 72)).toEqual([8, 0, 6]);
  expect(locate(inputRank3, 80)).toEqual([8, 8, 8]);
  expect(locate(inputRank3, 40)).toEqual([4, 4, 4]);
});

it('determines the list of possible moves, called candidates, for a given index', () =>{
  for (let i = 0; i < 2 * 2; i++) {
    expect(candidates(emptyInputRank2, rank2Symbols, i)).toEqual(rank2Symbols);
  }
  for (let i = 0; i < 3 * 3; i++) {
    expect(candidates(emptyInputRank3, rank3Symbols, i)).toEqual(rank3Symbols);
  }
  expect(candidates(unsolvedInputRank2, rank2Symbols, 0)).toEqual([]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 1)).toEqual([2, 3]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 2)).toEqual([2, 3]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 3)).toEqual([]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 4)).toEqual([2, 3]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 5)).toEqual([2, 3, 4]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 6)).toEqual([1, 2, 3]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 7)).toEqual([1, 2]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 8)).toEqual([2, 3]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 9)).toEqual([1, 2, 3]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 10)).toEqual([1, 2, 4]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 11)).toEqual([1, 2]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 12)).toEqual([]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 13)).toEqual([1, 2]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 14)).toEqual([1, 2]);
  expect(candidates(unsolvedInputRank2, rank2Symbols, 15)).toEqual([]);

  // extra cases
  expect(candidates(unsolvedInputRank2_2, rank2Symbols, 2)).toEqual([3]);
  expect(candidates(unsolvedInputRank2_3, rank2Symbols, 10)).toEqual([1, 4]);
  expect(candidates(unsolvedInputRank2_3, rank2Symbols, 11)).toEqual([]);
})

it('makes a move on a board', () => {
  const answer1 = [
    1, 0, 0, 4,
    0, 0, 0, 0,
    0, 0, 2, 0,
    4, 0, 0, 3,
  ], answer2 = [
    1, 0, 0, 4,
    0, 1, 0, 0,
    0, 0, 0, 0,
    4, 0, 0, 3,
  ];

  expect(move(unsolvedInputRank2, 10, 2)).toEqual(answer1);
  expect(move(unsolvedInputRank2, 5, 1)).toEqual(answer2);

  expect(valid(move(unsolvedInputRank2, 10, 2))).toBe(true);
  expect(valid(move(unsolvedInputRank2, 5, 1))).toBe(false);
});

it('solves an unsolved sudoku using several strategies', () =>  {
  const inputs = [
    ['unsolvedInputRank2', unsolvedInputRank2, rank2Symbols],
    ['unsolvedInputRank3', unsolvedInputRank3, rank3Symbols],
    ['unsolvedExtremeRank3', unsolvedExtremeRank3, rank3Symbols],
  ];

  for (const [name, board, symbols] of inputs) {
    const [result, slides, bts, time] = solve(board, symbols);
    console.warn(`solved ${name}: ${bts} bts, ${slides.length} slides in ${time} ms.`);
    expect(complete(result)).toBe(true);
    expect(valid(result)).toBe(true);
  }
});

it('fails to solve an impossible sudoku', () => {
  const [result, slides, bts, time] = solve(badUnsolvedExtremeRank3, rank3Symbols);
  console.warn(`failed solving: ${bts} bts, ${slides.length} slides in ${time} ms.`);
  expect(result).toBe(null);
})
