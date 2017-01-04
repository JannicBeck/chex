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
const walkWest = walk(moveWest)
const walkNorth = walk(moveNorth)
const walkSouth = walk(moveSouth)
const walkEast = walk(moveEast)
const walkNorthWest = walk(moveNorthWest)
const walkNorthEast = walk(moveNorthEast)
const walkSouthWest = walk(moveSouthWest)
const walkSouthEast = walk(moveSouthEast)

const walkHorizontal = compose(moveWest, moveEast)
const walkVertical = compose(moveNorth, moveSouth)
const walkDiagonal = compose(moveNorthWest, 
                             moveSoutWest, 
                             moveNorthEast, 
                             moveSoutEast)

module.exports = function calculatePossibleMoves (position) {
  let figure = store.getState().board[position].type
  let player = store.getState().board[position].player
  const from = calculatePositionOnVirtualBoard(position)

  return FIGURE_MAPPING[figure](position)
}

function calculatePossbilePawnMoves (position) {

}

function calculatePossbileKnightMoves (position) {
}

function calculatePossbileRookMoves (position) {
  return walkEast(position)
    .concat(walkWest(position))
    .concat(walkSouth(position))
    .concat(walkNorth(position))
    .map(x => calculatePositionOnBoard(x))
}

const walk = (direction) => {
  return (pos) => {
    let result = []
    while (virtualBoard[pos]) {
      if (virtualBoard[pos] === EMPTY) {
        result.push(pos)
      } else if (virtualBoard[pos].player === player) {
        break
      } else {
        result.push(pos)
        break
      }
      pos = direction(pos)
    }
    return result
  }
}

function calculatePossbileBishopMoves (position) {
  return walkEast(position)
    .concat(walkWest(position))
    .concat(walkSouth(position))
    .concat(walkNorth(position))
    .map(x => calculatePositionOnBoard(x))
}

function calculatePossbileKingMoves (position) {
}

function calculatePossbileQueenMoves (position) {
}

const FIGURE_MAPPING = {
  [Figure.Pawn]: calculatePossbilePawnMoves,
  [Figure.Bishop]: calculatePossbileBishopMoves,
  [Figure.Knight]: calculatePossbileKnightMoves,
  [Figure.King]: calculatePossbileKingMoves,
  [Figure.Queen]: calculatePossbileQueenMoves,
  [Figure.Rook]: calculatePossbileRookMoves
}
