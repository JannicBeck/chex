type Move = (p: Pos) => number
type BoardSideLength = 8
type NegativeBoardSideLength = -8
type Steps = 1 | -1 | BoardSideLength | NegativeBoardSideLength
type Empty = ' '

// | White pices are "PNBRQK"
// | Black pieces are "pnbrqk"
enum Piece {
  p = 'p', n = 'n', b = 'b', r = 'r', q = 'q', k = 'k',
  P = 'P', N = 'N', B = 'B', R = 'R', Q = 'Q', K = 'K'
}

const EMPTY: Empty = ' '

const compose = <R1, R2, R3>(f: (x: R2) => R3, g: (x: R1) => R2) => (x: R1) => f(g(x))
const map = <T, R>(mapper: (x: T) => R) => (a: ReadonlyArray<T>) => a.map(mapper)

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

const PIECE_SYMBOLS = {
  [Piece.p]: '♙', [Piece.n]: '♘', [Piece.b]: '♗', [Piece.r]: '♖', [Piece.q]: '♕', [Piece.k]: '♔',
  [Piece.P]: '♟', [Piece.N]: '♞', [Piece.B]: '♝', [Piece.R]: '♜', [Piece.Q]: '♛', [Piece.K]: '♚',
}

// TODO add 2 files for the knight problem
const boardSideLength: BoardSideLength = 8
const negativeBoardSideLength: NegativeBoardSideLength = -8

const move = (s: Steps) => (p: Pos) => s + p

const moveNorth = move(boardSideLength)
const moveSouth = move(negativeBoardSideLength)
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

type Square = Piece | Empty

enum PlayerColor {
  White,
  Black
}

type Board = ReadonlyArray<ReadonlyArray<Square>>

const lines = <T>(x: ReadonlyArray<T>) => x
const unlines = <T>(x: ReadonlyArray<T>) => x

const initialBoardStr = `rnbqkbnr`
                      + `pppppppp`
                      + `        `
                      + `        `
                      + `        `
                      + `        `
                      + `PPPPPPPP`
                      + `RNBQKBNR`

// | Read a square using FEN notation or ' ' for an empty square
type ReadSquare = (x: string) => Square
const readSquare: ReadSquare = x => Object.keys(PIECE_SYMBOLS).find(key => PIECE_SYMBOLS[key] === x) as Piece || EMPTY

type ReadBoard = (x: string) => Board
const readRow = map(readSquare)
const readBoard = map(compose(readRow, lines))

// | Shows a piece using FEN notation
type ShowPiece = (p: Piece) => string
const showPiece: ShowPiece = p => PIECE_SYMBOLS[p]

// | Show a square using FEN notation or ' ' for an empty square
type ShowSquare = (s: Square) => string
const showSquare = showPiece

type ShowBoard = (b: Board) => string
const showRow = map(showSquare)
const showBoard = compose(unlines, map)(showRow)
