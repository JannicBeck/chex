const virtualBoard = require('./board.js').virtualBoard;
const initialBoard = require('./board.js').initialBoard;
const Figure = require('./figure.js');

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

module.exports = function calculatePossibleMoves (position, figure) {
  return FIGURE_MAPPING[figure](position);
}

function calculatePossbilePawnMoves (position) {
  return position + BOARDSIDELENGTH;
}

function calculatePossbileKnightMoves (position) {
  const from = calculatePositionOnVirtualBoard(position);
}

function calculatePossbileRookMoves (position) {
  let possibleMoves = [];
  const from = calculatePositionOnVirtualBoard(position);
  // calculate how many squares are to the left and to the right
  // e.g. position 3 -> 0,1,2 to the left 4,5,6,7 to the right
  // slice those
  let pos = from + 1;
  while (virtualBoard[pos]) {
    possibleMoves.push(pos);
    pos++;
  }
  pos = virtualBoard[from - 1];
  while (virtualBoard[pos]) {
    possibleMoves.push(pos);
    pos--;
  }
  return possibleMoves;
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
