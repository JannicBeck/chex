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
  let output = board.reduce(reduceBoardToString, '');
  console.log(output);

  function reduceBoardToString (prev, curr, index) {
    if (curr) {
      if (curr !== EMPTY) {
        curr = FIGURE_SYMBOLS[curr.player][curr.type] + '\u0020';
      } else {
        curr = '\u0020\u0020';
      }
      let rowIndex = Math.floor(index / sideLength);
      let squareEven = index % 2 === 0;
      let rowEven = rowIndex % 2 !== 0;
      if ((!squareEven && rowEven) || (squareEven && !rowEven)) {
        curr = chalk.bgWhite(curr);
      } else {
        curr = chalk.bgBlack(curr);
      }
    } else {
      curr = chalk.bgCyan.white('XX');
    }
    if ((index + 1) % sideLength === 0) {
      curr += '\n';
    }
    return prev += curr;
  }
};

