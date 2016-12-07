const Player = require('./player.js');
const chalk = require('chalk');

module.exports = (board) => {

  const formatOutput = (square) => {
    if (square) {
      if (square !== 'EMPTY') {
        let isWhite = square.player === Player.White;
        return (isWhite ? 'W' : 'B') + square.type.charAt(0);
      } else {
        return '\u0020\u0020';
      }
    } else {
      return 'XX';
    }
  };

  function colorOutput (square, index) {
    if (square === 'XX') {
      return chalk.bgCyan.white(square);
    }

    let isWhite = square.charAt(0) === 'W';
    if (isWhite) {
      square = chalk.red(square);
    } else {
      square = chalk.blue(square);
    }

    const sideLength = Math.sqrt(board.length);
    let rowIndex = Math.floor(index / sideLength);
    let squareEven = index % 2 === 0;
    let rowEven = rowIndex % 2 !== 0;
    if ((!squareEven && rowEven) || (squareEven && !rowEven)) {
      return chalk.bgWhite(square);
    } else {
      return chalk.bgBlack(square);
    }
  };

  const sideLength = Math.sqrt(board.length);

  let output = board
    .map(formatOutput)
    .map(colorOutput);

  for (let i = 0; i <= output.length; i += sideLength) {
    let row = output.slice(i, i + sideLength);
    console.log(chalk.black(row));
  }
  console.log('\n');
};

