import React  from 'react';
import chunk from 'lodash/chunk';
import map from 'lodash/map';

import{ quadrants } from './sudoku';
import './App.css';

const Cell = (qi, value, index, onChange) => {
  return <td key={index} className={`sudoku-cell c-${index}`}>
          <input key={index} value={value ? value : ""} onChange={e => onChange(index, e.target.value)}/>
         </td>;
}

const Row = (qi, row, ri, onChange) =>
  <tr key={ri}>
    {map(row, (value, i) => {
      const rank = row.length, cellsPerQuadrant = rank * rank;
      const ci = parseInt(qi / rank, 10) * rank * cellsPerQuadrant + (qi % rank * rank) + ri * cellsPerQuadrant + i % rank;
      return Cell(qi, value, ci, onChange);
    })}
  </tr>;

const Quadrant = (values, qi, onChange) =>
  <table className={`sudoku-quadrant q-${qi}`}>
    <tbody>
      {map(chunk(values, Math.sqrt(values.length)), (row, i) => Row(qi, row, i, onChange))}
    </tbody>
  </table>;

function Board(props) {
  const cellsPerRow = Math.sqrt(props.values.length);
  const root = Math.sqrt(cellsPerRow);
  return <table className="sudoku-board">
            <tbody>
              {map(chunk(quadrants(props.values), root), (row, rowIndex) =>
                <tr key={rowIndex}>
                  {map(row, (q, i) => <td key={i}>{Quadrant(q, rowIndex * root + i, props.onChange)}</td>)}
                </tr>)}
            </tbody>
          </table>
}

export default Board;
