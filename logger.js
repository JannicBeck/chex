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
  let output = '';
  const sideLength = Math.sqrt(board.length);

  for (let i = 0; i < board.length; i++) {
    let square = board[i];
    if (square) {
      if (square !== EMPTY) {
        square = FIGURE_SYMBOLS[square.player][square.type] + ' ';
      } else {
        square = '\u0020\u0020';
      }

      let rowIndex = Math.floor(i / sideLength);
      let squareEven = i % 2 === 0;
      let rowEven = rowIndex % 2 !== 0;
      if ((!squareEven && rowEven) || (squareEven && !rowEven)) {
        square = chalk.bgWhite(square);
      } else {
        square = chalk.bgBlack(square);
      }
    } else {
      square = chalk.bgCyan.white('XX');
    }

    output += square;
    if ((i + 1) % sideLength === 0) output += '\n';
  }
  console.log(output)

};