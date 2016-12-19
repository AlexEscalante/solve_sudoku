import { slice, flatten, range, map, flatMap, reduce, every, uniq, compact } from 'lodash';

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

// A valid set of values has unique elements after
// removing empties
//
// Receives an array of arrays of values
function valid(values) {
  return every(map(values, set => compact(set)), set => set.length === uniq(set).length);
}

// Returns the indexes of the ampty
// positions in the board
function emptyPositions(values) {
  return reduce(values, (result, value, index) => {
    if (!value) result.push(index); return result; }, []);
}

export { quadrants, rows, columns, valid, emptyPositions };
