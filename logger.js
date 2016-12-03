const Player = require('./player.js');
const chalk = require('chalk');

module.exports = (board) => {
  let coloredBoard = board
    .map(colorText)
    .map(colorBg);
  for (let i = 8; i <= coloredBoard.length; i += 8) {
    let row = coloredBoard.slice(i - 8, i);
    console.log(chalk.black(row));
  }
  console.log('\n');
};

const colorText = (square) => {
  if (square) {
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