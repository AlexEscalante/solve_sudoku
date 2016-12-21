import React, { Component } from 'react';

import Board from './Board.js';
import { rank3Symbols, shuffle, rankByCandidateCount, solve } from './sudoku.js';

import logo from './logo.svg';
import './App.css';

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
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the React Sudoku Solver</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Board values={solve(unsolvedExtremeRank3, rank3Symbols, shuffle, rankByCandidateCount)[0]}/>
      </div>
    );
  }
}

export default App;
