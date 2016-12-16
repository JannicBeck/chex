const virtualBoard = require('./board.js').virtualBoard;
const initialBoard = require('./board.js').initialBoard;
const Figure = require('./figure.js');
const Player = require('./player.js');

const store = require('./app.js');

const EMPTY = 'EMPTY';
const VIRTUALBOARDSIDELENGTH = Math.sqrt(virtualBoard.length);
const BOARDSIDELENGTH = Math.sqrt(initialBoard.length);
const FIRSTVALIDSQUARE = VIRTUALBOARDSIDELENGTH * 2 + 2;

function calculatePositionOnVirtualBoard (position) {
  const rowNumber = (Math.floor(position / BOARDSIDELENGTH));
  return (FIRSTVALIDSQUARE + position) + (rowNumber * 4);
}

// this should be calculatePositionOnVirtualBoard^-1
function calculatePositionOnBoard (position) {
  const rowNumber = (Math.floor((position - FIRSTVALIDSQUARE) / BOARDSIDELENGTH));
  return (position - (FIRSTVALIDSQUARE + rowNumber * 4));
}

module.exports = function calculatePossibleMoves (position) {
  let figure = store.getState().board[position].type;
  return FIGURE_MAPPING[figure](position);
}

function calculatePossbilePawnMoves (position) {
  return position - BOARDSIDELENGTH;
}

function calculatePossbileKnightMoves (position) {
  const from = calculatePositionOnVirtualBoard(position);
}

function calculatePossbileRookMoves (position) {
  let player = store.getState().board[position].player;
  let otherPlayer;
  if (player === Player.White) {
    otherPlayer = Player.Black
  } else {
    otherPlayer = Player.White;
  }
  let possibleMoves = [];
  const from = calculatePositionOnVirtualBoard(position);
  let pos = from + 1;
  while (virtualBoard[pos]) {
    if (virtualBoard[pos] === EMPTY) {
      possibleMoves.push(pos);
    } else if (virtualBoard[pos].player === player) {
      break;
    } else if (virtualBoard[pos].player === otherPlayer) {
      possibleMoves.push(pos);
      break;
    }
    pos++;
  }
  pos = from - 1;
  while (virtualBoard[pos]) {
    if (virtualBoard[pos] === EMPTY) {
      possibleMoves.push(pos);
    } else if (virtualBoard[pos].player === player) {
      break;
    } else if (virtualBoard[pos].player === otherPlayer) {
      possibleMoves.push(pos);
      break;
    }
    pos--;
  }
  pos = from + VIRTUALBOARDSIDELENGTH;
  while (virtualBoard[pos]) {
    if (virtualBoard[pos] === EMPTY) {
      possibleMoves.push(pos);
    } else if (virtualBoard[pos].player === player) {
      break;
    } else if (virtualBoard[pos].player === otherPlayer) {
      possibleMoves.push(pos);
      break;
    }
    pos += VIRTUALBOARDSIDELENGTH;
  }
  pos = from - VIRTUALBOARDSIDELENGTH;
  while (virtualBoard[pos]) {
    if (virtualBoard[pos] === EMPTY) {
      possibleMoves.push(pos);
    } else if (virtualBoard[pos].player === player) {
      break;
    } else if (virtualBoard[pos].player === otherPlayer) {
      possibleMoves.push(pos);
      break;
    }
    pos -= VIRTUALBOARDSIDELENGTH;
  }
  return possibleMoves.map(x => calculatePositionOnBoard(x));
}

function calculatePossbileBishopMoves (position) {
  const from = calculatePositionOnVirtualBoard(position);
}

function calculatePossbileKingMoves (position) {
  const from = calculatePositionOnVirtualBoard(position);
}

function calculatePossbileQueenMoves (position) {
  const from = calculatePositionOnVirtualBoard(position);
}

const FIGURE_MAPPING = {
  [Figure.Pawn]: calculatePossbilePawnMoves,
  [Figure.Bishop]: calculatePossbileBishopMoves,
  [Figure.Knight]: calculatePossbileKnightMoves,
  [Figure.King]: calculatePossbileKingMoves,
  [Figure.Queen]: calculatePossbileQueenMoves,
  [Figure.Rook]: calculatePossbileRookMoves
}
