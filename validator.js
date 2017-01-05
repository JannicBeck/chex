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

const concat = (...funcs) =>
                x => funcs.map(f => f(x))

const move = (increment) =>
               (pos) => pos + increment

const walk = (moveInDirection) => {
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
      pos = moveInDirection(pos)
    }
    return result
  }
}

const jump = move(1337)

const moveNorth = move(BOARDSIDELENGTH)
const moveSouth = move(-BOARDSIDELENGTH)
const moveWest = move(-1)
const moveEast = move(1)
const moveNorthWest = compose(moveNorth, moveWest)
const moveNorthEast = compose(moveNorth, moveEast)
const moveSouthWest = compose(moveSouth, moveWest)
const moveSouthEast = compose(moveSouth, moveEast)

// does not work that way merge ifs into move!!
const moveDiagonal = concat(moveNorthWest,
                            moveSoutEast,
                            moveNorthEast,
                            moveSoutWest)

const movePerpendicular = concat(moveNorth,
                                 moveSouth,
                                 moveWest,
                                 moveEast)

const walkNorth = walk(moveNorth)
const walkSouth = walk(moveSouth)
const walkWest = walk(moveWest)
const walkEast = walk(moveEast)
const walkNorthWest = walk(moveNorthWest)
const walkNorthEast = walk(moveNorthEast)
const walkSouthWest = walk(moveSouthWest)
const walkSouthEast = walk(moveSouthEast)

const walkDiagonal = concat(walkNorthWest,
                            walkSoutEast,
                            walkNorthEast,
                            walkSoutWest)

const walkPerpendicular = concat(walkNorth,
                                 walkSouth,
                                 walkWest,
                                 walkEast)

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

const calculatePossbileRookMoves = walkPerpendicular
const calculatePossbileBishopMoves = walkDiagonal

const calculatePossbileKingMoves = compose(moveNorth, move)

const calculatePossbileQueenMoves = compose(walkPerpendicular, walkDiagonal)

const FIGURE_MAPPING = {
  [Figure.Pawn]: calculatePossbilePawnMoves,
  [Figure.Bishop]: calculatePossbileBishopMoves,
  [Figure.Knight]: calculatePossbileKnightMoves,
  [Figure.King]: calculatePossbileKingMoves,
  [Figure.Queen]: calculatePossbileQueenMoves,
  [Figure.Rook]: calculatePossbileRookMoves
}
