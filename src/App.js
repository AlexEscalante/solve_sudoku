import React, { Component } from 'react';

import Board from './Board.js';
import { rank3Symbols, shuffle, rankByCandidateCount, solve, move, valid } from './sudoku.js';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: props.board,
      slides: [],
      valid: valid(props.board),
      message: "Your next move?"
    };
  }

  solve() {
    const [board, slides, bts] = solve(this.state.board, rank3Symbols, shuffle, rankByCandidateCount);
    if (board)
      this.setState({
        board: board,
        slides: slides,
        message: `Solved with ${bts} bts, ${slides.length} slides`
      });
    else
      this.setState({
        message: `Failed to solve with ${bts} bts`
      });
  }

  onChange(index, value) {
    const board = move(this.state.board, index, parseInt(value, 10));
    const v = valid(board);
    this.setState({
      board: board,
      valid: v,
      message: v? "Your next move?" : "Board is invalid"
    });
  }

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

       <Board values={this.state.board} editable={true} onChange={this.onChange.bind(this)}/>
       <div id="message">{this.state.message}</div>

        <table className="toolbar">
          <tbody>
            <tr>
              <td id="button-solve"><button disabled={!this.state.valid} onClick={this.solve.bind(this)}>Solve</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
