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
                x => funcs.reduce(
                  (res, f) => res.concat(f(x)), [])

const move = (increment) =>
               pos => pos + increment

const step = (moveInDirection) => {
  return (from) => {
    let player = virtualBoard[from].player
    from = moveInDirection(from)
    return !checkSquare(virtualBoard[from], player)
  }
}

const checkSquare = (square, player) => {
  if (square === EMPTY) {
    return 0
  } else if (square.player !== player) {
    return -1
  } else {
    return 1
  }
}

// const walk = (moveInDirection) => {
//   return (from) => {
//     let player = virtualBoard[from].player
//     let result = []
//     do {
//       from = moveInDirection(from)
//     } while (virtualBoard[from]) {
//       switch (checkSquare(virtualBoard[from], player)) {
//         case 0:
//           result.push(from)
//         case -1:
//           result.push(from)
//           break
//         case 1:
//           break
//       }
//     }
//     return result
//   }
// }

const walk = (moveInDirection) => {
  return (from) => {
    let player = virtualBoard[from].player
    let result = []
    do {
      from = moveInDirection(from)
      if (virtualBoard[from] === EMPTY) {
        result.push(from)
      } else if (virtualBoard[from].player !== player) {
        result.push(from);
        break
      } else {
        break
      }
    } while (virtualBoard[from])
    return result
  }
}


// const walk = (moveInDirection) => {
//   return (from) => {
//     let player = virtualBoard[from].player
//     let result = []
//     do {
//       from = moveInDirection(from)
//     } while (virtualBoard[from]) {
//       if (virtualBoard[from] === EMPTY) {
//         result.push(from)
//       } else if (virtualBoard[from].player !== player) {
//         result.push(from)
//         break
//       } else {
//         break
//       }
//     }
//     return result
//   }
// }

const moveNorth = move(BOARDSIDELENGTH)
const moveSouth = move(-BOARDSIDELENGTH)
const moveWest = move(-1)
const moveEast = move(1)
const moveNorthWest = compose(moveNorth, moveWest)
const moveNorthEast = compose(moveNorth, moveEast)
const moveSouthWest = compose(moveSouth, moveWest)
const moveSouthEast = compose(moveSouth, moveEast)

const jumpNorthWest = compose(moveNorth, moveNorth, moveWest)
const jumpNorthEast = compose(moveNorth, moveNorth, moveEast)
const jumpSouthWest = compose(moveSouth, moveSouth, moveWest)
const jumpSouthEast = compose(moveSouth, moveSouth, moveEast)
const jumpWestNorth = compose(moveWest, moveWest, moveNorth)
const jumpWestSouth = compose(moveWest, moveWest, moveSouth)
const jumpEastNorth = compose(moveEast, moveEast, moveNorth)
const jumpEastSouth = compose(moveEast, moveEast, moveSouth)

const jump = compose(jumpNorthWest,
                     jumpNorthEast,
                     jumpSouthWest,
                     jumpSouthEast,
                     jumpWestNorth,
                     jumpWestSouth,
                     jumpEastNorth,
                     jumpEastSouth)

const moveDiagonal = concat(moveNorthWest,
                            moveSouthEast,
                            moveNorthEast,
                            moveSouthWest)

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
                            walkSouthEast,
                            walkNorthEast,
                            walkSouthWest)

const walkPerpendicular = concat(walkNorth,
                                 walkSouth,
                                 walkWest,
                                 walkEast)

module.exports = function calculatePossibleMoves (position) {
  let figure = store.getState().board[position].type
  let player = store.getState().board[position].player
  const from = calculatePositionOnVirtualBoard(position)
  const possibleMoves = FIGURE_MAPPING[figure](position)
  return possibleMoves
}

const calculatePossibleKnightMoves = jump
const calculatePossiblePawnMoves = concat(moveNorth, moveSouth)
const calculatePossibleRookMoves = walkPerpendicular
const calculatePossibleBishopMoves = walkDiagonal
const calculatePossibleKingMoves = concat(movePerpendicular, moveDiagonal)
const calculatePossibleQueenMoves = concat(walkPerpendicular, walkDiagonal)

const FIGURE_MAPPING = {
  [Figure.Pawn]: calculatePossiblePawnMoves,
  [Figure.Bishop]: calculatePossibleBishopMoves,
  [Figure.Knight]: calculatePossibleKnightMoves,
  [Figure.King]: calculatePossibleKingMoves,
  [Figure.Queen]: calculatePossibleQueenMoves,
  [Figure.Rook]: calculatePossibleRookMoves
}
