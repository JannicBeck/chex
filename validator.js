const virtualBoard = require('./board.js').virtualBoard;
const board = require('./board.js').board;
const Figure = require('./figure.js');

const VIRTUALBOARDSIDELENGTH = Math.sqrt(virtualBoard.length);
const BOARDSIDELENGTH = Math.sqrt(board.length);
  const FIRSTVALIDSQUARE = VIRTUALBOARDSIDELENGTH * 2 + 2;

function calculatePositionOnVirtualBoard(position) {
  const rowNumber = (Math.floor(position / BOARDSIDELENGTH));
  return (FIRSTVALIDSQUARE + position) + (rowNumber * 4);
}

// this should be calculatePositionOnVirtualBoard^-1
function calculatePositionOnBoard(position) {
  const rowNumber = (Math.floor((position - FIRSTVALIDSQUARE) / BOARDSIDELENGTH));
  return (position - (FIRSTVALIDSQUARE + rowNumber * 4));
}

module.exports = function isValidMove(position, figure) {
  return figureMap[figure](position);
}

function possbilePawnMoves (position) {
  return position + BOARDSIDELENGTH;
}

function possbileKnightMoves (position) {
  const from = calculatePositionOnVirtualBoard(position.from);
  const to = calculatePositionOnVirtualBoard(position.to);
}

const figureMapping = {
  [Figure.Pawn]: possbilePawnMoves,
  [Figure.Bishop]: possbileBishopMoves,
  [Figure.Knight]: possbileKnightMoves,
  [Figure.King]: possbileKingMoves,
  [Figure.Queen]: possbileQueenMoves,
  [Figure.Rook]: possbileRookMoves
}
