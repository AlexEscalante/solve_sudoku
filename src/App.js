import React, { Component } from 'react';

import Board from './Board.js';

import logo from './logo.svg';
import './App.css';

const inputRank2 = [
  1, 2, 3, 4,
  3, 4, 1, 2,
  2, 3, 4, 1,
  4, 1, 2, 3,
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
        <Board values={inputRank2}/>
        <Board values={inputRank3}/>
      </div>
    );
  }
}

export default App;
