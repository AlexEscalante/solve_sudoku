import React, { Component } from 'react';
// import FontAwesome from 'react-fontawesome';
var FontAwesome = require('react-fontawesome');

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
      slideIndex: -1,
      valid: valid(props.board),
      message: "Your next move?"
    };
  }

  solve() {
    const [board, slides, bts, time, lastCell] = solve(this.state.board, rank3Symbols, shuffle, rankByCandidateCount);
    if (board)
      this.setState({
        board: board,
        slides: slides,
        slideIndex: slides.length - 1,
        message: `Solved with ${bts} backtracks in ${time} ms`
      });
    else
      this.setState({
        board: slides[slides.length - 1],
        slides: slides,
        slideIndex: slides.length - 1,
        message: `Failed after last attempt at position ${lastCell} with ${bts} backtracks in ${time} ms`,
      });
  }

  onChange(index, value) {
    const board = move(this.state.board, index, parseInt(value, 10));
    const v = valid(board);
    this.setState({
      board: board,
      slides: [],
      slideIndex: -1,
      valid: v,
      message: v? "Your next move?" : "Board is invalid"
    });
  }

  firstSlide() {
    this.setState({
      board: this.state.slides[0],
      slideIndex: 0
    });
  }

  previousSlide() {
    const newIndex = this.state.slideIndex - 1;
    this.setState({
      board: this.state.slides[newIndex],
      slideIndex: newIndex
    });
  }

  nextSlide() {
    const newIndex = this.state.slideIndex + 1;
    this.setState({
      board: this.state.slides[newIndex],
      slideIndex: newIndex
    });
  }

  lastSlide() {
    const newIndex = this.state.slides.length - 1;
    this.setState({
      board: this.state.slides[newIndex],
      slideIndex: newIndex
    });
  }

  render() {
    const slideCount = this.state.slides.length;
    const slideIndex = this.state.slideIndex;
    const slideStats = slideCount? `Showing ${slideIndex + 1} of ${slideCount} slides` :"";

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the React Sudoku Solver</h2>
        </div>
        <p className="App-intro">
          You can solve the game by yourself or you can ask the computer to solve it for you and
          review the solution step by step
        </p>

        <Board values={this.state.board} editable={true} onChange={this.onChange.bind(this)}/>
        <div className="messages">
          <p>{this.state.message}</p>
          <p>{slideStats}</p>
        </div>
        <table className="toolbar">
          <tbody>
            <tr>
              <td id="button-first">
                <button disabled={slideIndex < 1} onClick={this.firstSlide.bind(this)}>
                  <FontAwesome name='fast-backward'/>
                </button>
              </td>
              <td id="button-prev">
                <button disabled={slideIndex < 1} onClick={this.previousSlide.bind(this)}>
                  <FontAwesome name='backward'/>
                </button>
              </td>
              <td id="button-solve">
                <button disabled={!this.state.valid} onClick={this.solve.bind(this)}>
                  Solve
                </button>
              </td>
              <td id="button-next">
                <button disabled={slideIndex > slideCount - 2} onClick={this.nextSlide.bind(this)}>
                  <FontAwesome name='forward'/>
                </button>
              </td>
              <td id="button-last">
                <button disabled={slideIndex === slideCount - 1} onClick={this.lastSlide.bind(this) }>
                  <FontAwesome name='fast-forward'/>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
