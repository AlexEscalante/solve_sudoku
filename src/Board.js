import React  from 'react';
import chunk from 'lodash/chunk';
import map from 'lodash/map';

import{ quadrants } from './sudoku';
import './App.css';

const Cell = (value, index) => <td key={index} className={`sudoku-cell c-${index}`}>{value}</td>;

const Row = (row, index) => <tr key={index}>{map(row, (value, i) => Cell(value, index * row.length + i))}</tr>;

const Quadrant = (values, quadrantIndex) =>
  <table className={`sudoku-quadrant q-${quadrantIndex}`}>
    <tbody>
      {map(chunk(values, Math.sqrt(values.length)), (row, i) => Row(row, i))}
    </tbody>
  </table>;

function Board(props) {
  const cellsPerRow = Math.sqrt(props.values.length);
  const root = Math.sqrt(cellsPerRow);

  return <table className="sudoku-board"><tbody>
      {map(chunk(quadrants(props.values), root), (row, rowIndex) =>
        <tr key={rowIndex}>
          {map(row, (q, i) =>
            <td key={i}>
              {Quadrant(q, rowIndex * root + i)}
            </td>)}
        </tr>)}
    </tbody></table>;
}

export default Board;
