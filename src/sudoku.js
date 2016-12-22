import {
  slice, flatten, range, map, flatMap, reduce, every, uniq, compact, concat, includes, identity, shuffle, filter, sortBy
} from 'lodash';

const rank2Symbols = [ 1, 2, 3, 4 ];
const rank3Symbols = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

// Convert a linear repsentation of sudoku
// values into an array of arrays representing
// rows.
function rows(values) {
  const cellsPerRow = Math.sqrt(values.length);
  return reduce(range(0, values.length, cellsPerRow), (retval, row) => {
          retval.push(slice(values, row, row + cellsPerRow)); return retval; }, []);
}

// Convert a linear reprentation of sudoku
// values into an array of arrays representing
// columns.
function columns(values) {
  const numberOfColumns = Math.sqrt(values.length);
  return map(range(0, numberOfColumns), row =>
          flatten(reduce(range(row, values.length, numberOfColumns), (c, ci) => {
            c.push(slice(values, ci, ci + 1)); return c; }, [])));
}

// Convert a linear repsentation of sudoku
// values into an array of arrays representing
// quadrants.
//
// There are "rank" number of rows of quadrants,
// and every row has "rank" number of quadrants
//
// qri: quadrant row index
// qi: quadrant index
// q: quadrant
// ci: cell index
function quadrants(values) {
  const cellsPerQuadrant = Math.sqrt(values.length), rank = Math.sqrt(cellsPerQuadrant);
  return flatMap(range(0, values.length, cellsPerQuadrant * rank), qri =>
          map(range(qri, qri + cellsPerQuadrant, rank), qi =>
            flatten(reduce(range(qi, qi + cellsPerQuadrant * rank, cellsPerQuadrant), (q, ci) => {
              q.push(slice(values, ci, ci + rank)); return q; }, []))));
}

// A set of values is complete if it doesn't have zeroes
function complete(values) {
  return compact(values).length === values.length;
}

// A valid set of values has unique elements after
// removing empties
//
// This method is polymorphic: it can receive a full soduku
// as an array of values, or sets of values as in rows,
// columns or quadrants
function valid(values) {
  if (typeof(values[0]) === "number")
    return valid(rows(values)) && valid(rows(values)) && valid(quadrants(values))
  else
    return Boolean(values.length) && every(map(values, set => compact(set)), set => set.length === uniq(set).length);
}

// Returns the indexes of the ampty
// positions in the board
function vacants(values) {
  return reduce(values, (result, value, index) => {
    if (!value) result.push(index); return result; }, []);
}

// Return an array with the row, column and quadrant indexes of the index passed
function locate(values, index) {
  const cellsPerQuadrant = Math.sqrt(values.length),
        rank = Math.sqrt(cellsPerQuadrant),
        ri = parseInt(index / cellsPerQuadrant, 10),
        ci = index % cellsPerQuadrant,
        qi = parseInt(ci / rank, 10) + parseInt(ri / rank, 10) * rank;
  return [ ri, ci, qi ];
}

// Returns an array with the possible values
// available for the index.
function candidates(values, symbols, index) {
  if (values[index]) return [];
  const [ ri,  ci, qi ] = locate(values, index);
  return filter(symbols, sym =>
    !includes(uniq(compact(concat(rows(values)[ri], columns(values)[ci], quadrants(values)[qi]))), sym));
}

function move(board, index, value) {
  return concat(slice(board, 0, index), [value], slice(board, index + 1));
}

function rankByCandidateCount(vacants, values, symbols) {
  return sortBy(vacants, v => candidates(values, symbols, v).length);
}

function solve(board, symbols, rankCandidates = shuffle, rankVacants = rankByCandidateCount) {
  let btCount = 0, slides = [];

  const reducer = (board, symbols) =>
    reduce(rankVacants(vacants(board), board, symbols), (state, v) => {
      if (complete(state)) return state;
      const c = rankCandidates(candidates(state, symbols, v));
      // console.log("solving ", quadrants(state));
      // console.log(`for ${v} with ${c}`);
      while(c.length)
        try {
          const m = c.pop(), newState = move(state, v, m);
          slides.push(newState);
          return reducer(newState, symbols);
        } catch (e) {
          // console.log("backtraking");
          btCount++;
        }
      throw new Error(`no more candidates for position ${v}`);
    }, board);

  try {
    console.time('finished in');
    const result = reducer(board, symbols);
    console.timeEnd('finished in');
    return [ result, slides, btCount ];
  } catch (e) {
  console.timeEnd('finished in');
    return [ null, slides, btCount ];
  }
}

export { rank2Symbols, rank3Symbols, quadrants, rows, columns, complete, valid, vacants, locate,
  candidates, move, solve, shuffle, identity, rankByCandidateCount };
