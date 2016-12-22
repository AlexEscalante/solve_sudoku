import {
  slice, flatten, range, map, flatMap, reduce, every, uniq, compact, concat, includes, filter, sortBy
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
    return valid(rows(values)) && valid(columns(values)) && valid(quadrants(values))
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

// Returns a board which is the same as the received
// but with the index set to the given value
function move(board, index, value) {
  return concat(slice(board, 0, index), [value], slice(board, index + 1));
}

// Returns an array of vacant cells with their candidate values,
// ordered ascendingly by the number of candidates
function vacantsByCandidateCount(state, symbols) {
  const vacantsWithCandidates = map(vacants(state), v => [v, candidates(state, symbols, v)]);
  const ordered = sortBy(vacantsWithCandidates, ([v, candidates]) => candidates.length);
  // console.log('vacantsWithCandidates', ordered);
  return ordered;

}

function solve(board, symbols) {
  let btCount = 0, slides = [board];

  function solver(state) {
    const vcs = vacantsByCandidateCount(state, symbols)
    if (vcs.length < 1) return state; // done

    const [v, candidates] = vcs.shift();
    while (candidates.length) {
      try {
        const newState = move(state, v, candidates.shift());
        slides.push(newState);
        return solver(newState);
      } catch(e) {
        btCount++;
      }
    }
    throw v;
  }

  const startTime = new Date().getTime()
  try {
    const result = solver(board, symbols);
    const finishTime = new Date().getTime();
    return [result, slides, btCount, finishTime - startTime];
  } catch (v) {
    const finishTime = new Date().getTime();
    return [null, slides, btCount, finishTime - startTime, v];
  }
}

export { rank2Symbols, rank3Symbols, quadrants, rows, columns, complete, valid, vacants, locate,
  candidates, move, solve};
