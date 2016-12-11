const Player = require('./player.js');
const Pos = require('./position.js');
const Figure = require('./figure.js');

const EMPTY = 'EMPTY';

let board = [];

board[Pos.A8] = {
  type: Figure.Rook,
  player: Player.Black
};
board[Pos.B8] = {
  type: Figure.Knight,
  player: Player.Black
};
board[Pos.C8] = {
  type: Figure.Bishop,
  player: Player.Black
};
board[Pos.D8] = {
  type: Figure.King,
  player: Player.Black
};
board[Pos.E8] = {
  type: Figure.Queen,
  player: Player.Black
};
board[Pos.F8] = {
  type: Figure.Bishop,
  player: Player.Black
};
board[Pos.G8] = {
  type: Figure.Knight,
  player: Player.Black
};
board[Pos.H8] = {
  type: Figure.Rook,
  player: Player.Black
};

for (let i = Pos.A7; i <= Pos.H7; i++) {
  board[i] = generatePawn(Player.Black);
}

for (let i = Pos.A2; i <= Pos.H2; i++) {
  board[i] = generatePawn(Player.White);
}

for (let i = Pos.A3; i <= Pos.H6; i++) {
  board[i] = EMPTY;
}

board[Pos.A1] = {
  type: Figure.Rook,
  player: Player.White
};
board[Pos.B1] = {
  type: Figure.Knight,
  player: Player.White
};
board[Pos.C1] = {
  type: Figure.Bishop,
  player: Player.White
};
board[Pos.D1] = {
  type: Figure.King,
  player: Player.White
};
board[Pos.E1] = {
  type: Figure.Queen,
  player: Player.White
};
board[Pos.F1] = {
  type: Figure.Bishop,
  player: Player.White
};
board[Pos.G1] = {
  type: Figure.Knight,
  player: Player.White
};
board[Pos.H1] = {
  type: Figure.Rook,
  player: Player.White
};

function generatePawn(player) {
  return {
    type: Figure.Pawn,
    player,
  };
}

// 12x12 board that solves the Knight problem
let virtualBoard = [];
const SIDELENGTH = 12;

// add two rows on top
for (let i = 0; i < 2 * SIDELENGTH; i++) {
  virtualBoard.push(null);
}

// add two columns left and two columns right
for (let i = 0; i < board.length; i += Math.sqrt(board.length)) {
  let row = board.slice(i, i + Math.sqrt(board.length));
  row.push(null);
  row.push(null);
  row.unshift(null);
  row.unshift(null);
  virtualBoard = virtualBoard.concat(row);
}

// prepend two rows on bottom
for (let i = 0; i < 2 * SIDELENGTH; i++) {
  virtualBoard.push(null);
}

module.exports = {
  board,
  virtualBoard
};