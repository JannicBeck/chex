const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const concat = (...fns) => (...args) => fns.reduce((y, f) => y.concat(f(...args)), [])

// the board width equals the width of a
// chess board (8) + 2 files for the knight problem
const boardWidth = 10

const move = steps => pos => steps + pos

const moveNorth = move(boardWidth)
const moveSouth = move(-boardWidth)
const moveWest = move(-1)
const moveEast = move(1)
const moveNorthWest = compose(moveNorth, moveWest)
const moveNorthEast = compose(moveNorth, moveEast)
const moveSouthWest = compose(moveSouth, moveWest)
const moveSouthEast = compose(moveSouth, moveEast)

const jump = x => y => compose(compose(x, x), y)
const jumpNorth = jump(moveNorth)
const jumpSouth = jump(moveSouth)
const jumpWest  = jump(moveWest)
const jumpEast  = jump(moveEast)

const jumpNorthWest = jumpNorth(moveWest)
const jumpNorthEast = jumpNorth(moveEast)
const jumpSouthWest = jumpSouth(moveWest)
const jumpSouthEast = jumpSouth(moveEast)
const jumpWestNorth = jumpWest (moveNorth)
const jumpWestSouth = jumpWest (moveSouth)
const jumpEastNorth = jumpEast (moveNorth)
const jumpEastSouth = jumpEast (moveSouth)

const moveDiagonal = concat(moveNorthWest,
                            moveSouthEast,
                            moveNorthEast,
                            moveSouthWest)

const movePerpendicular = concat(moveNorth,
                                 moveSouth,
                                 moveWest,
                                 moveEast)

// const walkNorth = walk(moveNorth)
// const walkSouth = walk(moveSouth)
// const walkWest = walk(moveWest)
// const walkEast = walk(moveEast)
// const walkNorthWest = walk(moveNorthWest)
// const walkNorthEast = walk(moveNorthEast)
// const walkSouthWest = walk(moveSouthWest)
// const walkSouthEast = walk(moveSouthEast)

// const walkDiagonal = concat(walkNorthWest,
//                             walkSouthEast,
//                             walkNorthEast,
//                             walkSouthWest)

// const walkStraight = concat(walkNorth, walkSouth)
// const walkSideways = concat(walkWest, walkEast)

// const walkPerpendicular = concat(walkStraight, walkSideways)

// // const calculatePossibleKnightMoves = safeJump
// const calculatePossiblePawnMoves = walkStraight
// const calculatePossibleRookMoves = walkPerpendicular
// const calculatePossibleBishopMoves = walkDiagonal
// const calculatePossibleKingMoves = concat(movePerpendicular, moveDiagonal)
// const calculatePossibleQueenMoves = concat(walkPerpendicular, walkDiagonal)

// const FIGURE_MAPPING = {
//   [Figure.Pawn]: calculatePossiblePawnMoves,
//   [Figure.Bishop]: calculatePossibleBishopMoves,
//   [Figure.Knight]: calculatePossibleKnightMoves,
//   [Figure.King]: calculatePossibleKingMoves,
//   [Figure.Queen]: calculatePossibleQueenMoves,
//   [Figure.Rook]: calculatePossibleRookMoves
// }


// type Square = Maybe Piece
type Square = Piece

interface Piece {
  color: PColor,
  type: PType
}

enum PColor {
  White,
  Black
}

enum PType {
  Pawn, Knight, Bishop, Rook, Queen, King
}

type Board = Square[][]

const unlines = <T>(x: T) => x
const lines = <T>(x: T) => x

const initialBoardStr = unlines(['rnbqkbnr'
                                ,'pppppppp'
                                ,'        '
                                ,'        '
                                ,'        '
                                ,'        '
                                ,'PPPPPPPP'
                                ,'RNBQKBNR'
                                ])

// | Shows a piece using FEN notation
//
// * White pices are "PNBRQK"
// * Black pieces are "pnbrqk"
type ReadPiece = (x: string) => PType
const readPiece: ReadPiece = x => {
  switch(x) {
    case 'p': return PType.Pawn
    case 'k': return PType.Knight
    case 'b': return PType.Bishop
    case 'r': return PType.Rook
    case 'q': return PType.Queen
    case 'k': return PType.King
  }
}

// // | Read a square using FEN notation or ' ' for an empty square
type ReadSquare = (x: string) => Square
const readSquare = (x: string) => x === ' ' ? null : readPiece(x)

type ReadBoard = (x: string) => Board
const readRow = Array.prototype.map(readSquare)
const readBoard = Array.prototype.map(compose(readRow, lines))

// | Shows a piece using FEN notation
//
// * White pices are "PNBRQK"
// * Black pieces are "pnbrqk"
type ShowPiece = (p: Piece) => string
const showPiece: ShowPiece = p => {
  switch(p.type) {
    case PType.Pawn   : return 'p'
    case PType.Knight : return 'k'
    case PType.Bishop : return 'b'
    case PType.Rook   : return 'r'
    case PType.Queen  : return 'q'
    case PType.King   : return 'k'
  }
}

// // | Show a square using FEN notation or ' ' for an empty square
type ShowSquare = (s: Square) => string
const showSquare = showPiece

type ShowBoard = (b: Board) => string
const showRow = Array.prototype.map(showSquare)
const showBoard = compose(unlines, Array.prototype.map)(showRow)
