const Player = require('./player.js');
const chalk = require('chalk');
const Figure = require('./figure.js');

const EMPTY = 'EMPTY';

const FIGURE_SYMBOLS = {
  [Player.White]: {
    [Figure.Pawn]: '♙',
    [Figure.Bishop]: '♗',
    [Figure.King]: '♔',
    [Figure.Queen]: '♕',
    [Figure.Rook]: '♖',
    [Figure.Knight]: '♘'
  },
  [Player.Black]: {
    [Figure.Pawn]: '♟',
    [Figure.Bishop]: '♝',
    [Figure.King]: '♚',
    [Figure.Queen]: '♛',
    [Figure.Rook]: '♜',
    [Figure.Knight]: '♞'
  }
};

module.exports = (board) => {

  const sideLength = Math.sqrt(board.length);
  let output = '';
  let formattedBoard = board.map(formatBoard);
  for (let i = 0; i < formattedBoard.length; i++) {
    output += formattedBoard[i];
    if ((i + 1) % 8 === 0) output += '\n';
  }
  console.log(output)

  function formatBoard(square, index) {
    let figure;
    if (square) {
      if (square !== EMPTY) {
        figure = FIGURE_SYMBOLS[square.player][square.type] + ' ';
      } else {
        figure = '\u0020\u0020';
      }
      let rowIndex = Math.floor(index / sideLength);
      let squareEven = index % 2 === 0;
      let rowEven = rowIndex % 2 !== 0;
      if ((!squareEven && rowEven) || (squareEven && !rowEven)) {
        return chalk.bgWhite(figure);
      } else {
        return chalk.bgBlack(figure);
      }
    } else {
      return chalk.bgCyan.white('XX');
    }
  }
};