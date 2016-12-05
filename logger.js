const Player = require('./player.js');
const chalk = require('chalk');

module.exports = (board) => {
  const sideLength = Math.sqrt(board.length);
  let coloredBoard = board
    .map(colorText)
    .map(colorBg);
  for (let i = 0; i <= coloredBoard.length; i += sideLength) {
    let row = coloredBoard.slice(i, i + sideLength);
    console.log(chalk.black(row));
  }
  console.log('\n');
};

const colorText = (square) => {
  if (square) {
    if (square !== 'EMPTY') {
      let isWhite = square.player === Player.White;
      let figure = (isWhite ? 'W' : 'B') + square.type.charAt(0);
      if (isWhite) {
        return chalk.white(figure);
      } else {
        return chalk.grey(figure);
      }
    } else {
      return '\u0020\u0020';
    }
  } else {
    return chalk.red('XX');
  }
};

const colorBg = (square, index) => {
  let rowIndex = Math.floor(index / 8);
  let squareEven = index % 2 === 0;
  let rowEven = rowIndex % 2 !== 0;
  if ((!squareEven && rowEven) || (squareEven && !rowEven)) {
    return chalk.bgWhite(square);
  } else {
    return chalk.bgBlack(square);
  }
};