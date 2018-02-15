type Move = (p: Pos) => number
type Steps = number

const compose = <R1, R2, R3>(f: (x: R2) => R3, g: (x: R1) => R2) => (x: R1) => f(g(x))

const map = Array.prototype.map

enum Pos {
  A8, B8, C8, D8, E8, F8, G8, H8,
  A7, B7, C7, D7, E7, F7, G7, H7,
  A6, B6, C6, D6, E6, F6, G6, H6,
  A5, B5, C5, D5, E5, F5, G5, H5,
  A4, B4, C4, D4, E4, F4, G4, H4,
  A3, B3, C3, D3, E3, F3, G3, H3,
  A2, B2, C2, D2, E2, F2, G2, H2,
  A1, B1, C1, D1, E1, F1, G1, H1
}

const FIGURE_SYMBOLS = {
  p: '♙', b: '♗', k: '♔', q: '♕', r: '♖', n: '♘',
  P: '♟', B: '♝', K: '♚', Q: '♛', R: '♜', N: '♞'
}

// TODO add 2 files for the knight problem
const boardSideLength = 8

const move = (s: Steps) => (p: Pos) => s + p

const moveNorth = move(boardSideLength)
const moveSouth = move(-boardSideLength)
const moveWest = move(-1)
const moveEast = move(1)
const moveNorthWest = compose(moveNorth, moveWest)
const moveNorthEast = compose(moveNorth, moveEast)
const moveSouthWest = compose(moveSouth, moveWest)
const moveSouthEast = compose(moveSouth, moveEast)

const jump = (f: Move) => (g: Move) => compose(compose(f, f), g)
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
type ReadPiece = (x: string) => Piece
const readPiece: ReadPiece = x => {
  switch(x) {
    case FIGURE_SYMBOLS.p: return { type: PType.Pawn,   color: PColor.White }
    case FIGURE_SYMBOLS.k: return { type: PType.Knight, color: PColor.White }
    case FIGURE_SYMBOLS.b: return { type: PType.Bishop, color: PColor.White }
    case FIGURE_SYMBOLS.r: return { type: PType.Rook,   color: PColor.White }
    case FIGURE_SYMBOLS.q: return { type: PType.Queen,  color: PColor.White }
    case FIGURE_SYMBOLS.k: return { type: PType.King,   color: PColor.White }
    case FIGURE_SYMBOLS.p: return { type: PType.Pawn,   color: PColor.Black }
    case FIGURE_SYMBOLS.k: return { type: PType.Knight, color: PColor.Black }
    case FIGURE_SYMBOLS.b: return { type: PType.Bishop, color: PColor.Black }
    case FIGURE_SYMBOLS.r: return { type: PType.Rook,   color: PColor.Black }
    case FIGURE_SYMBOLS.q: return { type: PType.Queen,  color: PColor.Black }
    case FIGURE_SYMBOLS.k: return { type: PType.King,   color: PColor.Black }
  }
}

// | Read a square using FEN notation or ' ' for an empty square
type ReadSquare = (x: string) => Square
const readSquare = (x: string) => x === ' ' ? null : readPiece(x)

type ReadBoard = (x: string) => Board
const readRow = map.bind(null, readSquare)
const readBoard = map.bind(null, (compose(readRow, lines)))

// | Shows a piece using FEN notation
//
// * White pices are "PNBRQK"
// * Black pieces are "pnbrqk"
type ShowPiece = (p: Piece) => string
const showPiece: ShowPiece = p => FIGURE_SYMBOLS[p.type]

// | Show a square using FEN notation or ' ' for an empty square
type ShowSquare = (s: Square) => string
const showSquare = showPiece

type ShowBoard = (b: Board) => string
const showRow = map.bind(null, showSquare)
const showBoard = compose(unlines, map)(showRow)
