const virtualBoard = require('./board.js').virtualBoard
const initialBoard = require('./board.js').initialBoard
const Figure = require('./figure.js')
const Player = require('./player.js')

const store = require('./app.js')

const EMPTY = 'EMPTY'
const VIRTUALBOARDSIDELENGTH = Math.sqrt(virtualBoard.length)
const BOARDSIDELENGTH = Math.sqrt(initialBoard.length)
const FIRSTVALIDSQUARE = VIRTUALBOARDSIDELENGTH * 2 + 2

function calculatePositionOnVirtualBoard (position) {
  const rowNumber = (Math.floor(position / BOARDSIDELENGTH))
  return (FIRSTVALIDSQUARE + position) + (rowNumber * 4)
}

// this should be calculatePositionOnVirtualBoard^-1
function calculatePositionOnBoard (position) {
  const rowNumber = (Math.floor((position - FIRSTVALIDSQUARE) / BOARDSIDELENGTH))
  return (position - (FIRSTVALIDSQUARE + rowNumber * 4))
}

const compose = (f, g) =>
                  x => f(g(x))

const move = (increment) =>
               (pos) => pos + increment

const moveNorth = move(BOARDSIDELENGTH)
const moveSouth = move(-BOARDSIDELENGTH)
const moveWest = move(-1)
const moveEast = move(1)
const moveNorthWest = compose(moveNorth, moveWest)
const moveNorthEast = compose(moveNorth, moveEast)
const moveSouthWest = compose(moveSouth, moveWest)
const moveSouthEast = compose(moveSouth, moveEast)

module.exports = function calculatePossibleMoves (position) {
  let figure = store.getState().board[position].type
  return FIGURE_MAPPING[figure](position)
}

function calculatePossbilePawnMoves (position) {
  let possibleMoves = []
  possibleMoves.push(position + BOARDSIDELENGTH)
  console.log(possibleMoves)
  return possibleMoves
}

function calculatePossbileKnightMoves (position) {
  const from = calculatePositionOnVirtualBoard(position)
}

function calculatePossbileRookMoves (position) {
  let player = store.getState().board[position].player
  let otherPlayer
  if (player === Player.White) {
    otherPlayer = Player.Black
  } else {
    otherPlayer = Player.White
  }
  const from = calculatePositionOnVirtualBoard(position)

  return walk(from + 1, moveEast)
    .concat(walk(from - 1, moveWest))
    .concat(walk(from + VIRTUALBOARDSIDELENGTH, moveSouth))
    .concat(walk(from - VIRTUALBOARDSIDELENGTH, moveNorth))
    .map(x => calculatePositionOnBoard(x))
}

function walk (pos, direction) {
  let result = [];
  while (virtualBoard[pos]) {
    if (virtualBoard[pos] === EMPTY) {
      result.push(pos)
    } else if (virtualBoard[pos].player === player) {
      break
    } else if (virtualBoard[pos].player === otherPlayer) {
      result.push(pos)
      break
    }
    pos = direction(pos)
  }
  return result;
}

function calculatePossbileBishopMoves (position) {
  const from = calculatePositionOnVirtualBoard(position)
}

function calculatePossbileKingMoves (position) {
  const from = calculatePositionOnVirtualBoard(position)
}

function calculatePossbileQueenMoves (position) {
  const from = calculatePositionOnVirtualBoard(position)
}

const FIGURE_MAPPING = {
  [Figure.Pawn]: calculatePossbilePawnMoves,
  [Figure.Bishop]: calculatePossbileBishopMoves,
  [Figure.Knight]: calculatePossbileKnightMoves,
  [Figure.King]: calculatePossbileKingMoves,
  [Figure.Queen]: calculatePossbileQueenMoves,
  [Figure.Rook]: calculatePossbileRookMoves
}
