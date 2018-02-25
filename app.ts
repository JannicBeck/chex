type Move = (p: Pos) => number
type BoardSideLength = 8
// | This type is used in the FEN notation to represent a blank row
type EmptyRow = '8'
type NegativeBoardSideLength = -8
type Steps = 1 | -1 | BoardSideLength | NegativeBoardSideLength

// | White pices are "PNBRQK"
// * Black pieces are "pnbrqk"
enum Piece {
  p = 'p', n = 'n', b = 'b', r = 'r', q = 'q', k = 'k',
  P = 'P', N = 'N', B = 'B', R = 'R', Q = 'Q', K = 'K'
}

type Empty = ' '
const empty = ' '

type Square = Empty | Piece

enum PlayerColor {
  White,
  Black
}

type Board = ReadonlyArray<Square>

const identity = <T>(x: T) => x
const ifElse = <T>(c: (x: T) => boolean) => <R1>(f: (x: T) => R1) => <R2>(g: (x: T) => R2) => (x: T) => c(x) ? f(x): g(x)
const compose = <R1, R2, R3>(f: (x: R2) => R3, g: (x: R1) => R2) => (x: R1) => f(g(x))
const map = <T, R>(mapper: (x: T) => R) => (xs: ReadonlyArray<T>) => xs.map(mapper)
const split = (seperator: string | RegExp, limit?: number) => (s: string) => s.split(seperator, limit)
const join = (seperator: string) => <T>(xs: ReadonlyArray<T>) => xs.join(seperator)
const flatten = <T>(xs: ReadonlyArray<T>) => [].concat(...xs) as ReadonlyArray<T>
const complement = <T>(f: (x: T) => boolean) => (x: T) => !f(x)
const tail = <T>(xs: ReadonlyArray<T>) => xs.slice(0, xs.length - 1 - 1)
const head = <T>(xs: ReadonlyArray<T>) => xs[0]
const last = <T>(xs: ReadonlyArray<T>) => xs[xs.length - 1]
const init = <T>(xs: ReadonlyArray<T>) => xs.slice(1, xs.length - 1)
const range = (start: number, end: number, xs: ReadonlyArray<number> = []): ReadonlyArray<number> =>
  start === end
  ? xs
  : range(++start, end, xs.concat(start))

const isNumber = complement(Number.isNaN)

// | A1 is at 21 since there are two rows above the board
// * and one row on each side of the board, so we know when the knight
// * is jumping off the board
enum Pos {
  A8 = 21, B8, C8, D8, E8, F8, G8, H8,
  A7 = 31, B7, C7, D7, E7, F7, G7, H7,
  A6 = 41, B6, C6, D6, E6, F6, G6, H6,
  A5 = 51, B5, C5, D5, E5, F5, G5, H5,
  A4 = 61, B4, C4, D4, E4, F4, G4, H4,
  A3 = 71, B3, C3, D3, E3, F3, G3, H3,
  A2 = 81, B2, C2, D2, E2, F2, G2, H2,
  A1 = 91, B1, C1, D1, E1, F1, G1, H1
}

const PIECE_SYMBOLS = {
  'p': '♙', 'n': '♘', 'b': '♗', 'r': '♖', 'q': '♕', 'k': '♔',
  'P': '♟', 'N': '♞', 'B': '♝', 'R': '♜', 'Q': '♛', 'K': '♚',
  '♙': 'p', '♘': 'n', '♗': 'b', '♖': 'r', '♕': 'q', '♔': 'k',
  '♟': 'P', '♞': 'N', '♝': 'B', '♜': 'R', '♛': 'Q', '♚': 'K'
}

// TODO add 2 files for the knight problem
const boardSideLength: BoardSideLength = 8
const negativeBoardSideLength: NegativeBoardSideLength = -8
const emptyRow = boardSideLength.toString()

const move = (s: Steps) => (p: Pos) => s + p

const moveNorth = move(boardSideLength)
const moveSouth = move(negativeBoardSideLength)
const moveWest = move(-1)
const moveEast = move(1)
const moveNorthWest = compose(moveNorth, moveWest)
const moveNorthEast = compose(moveNorth, moveEast)
const moveSouthWest = compose(moveSouth, moveWest)
const moveSouthEast = compose(moveSouth, moveEast)

const jump = (f: Move) => (g: Move) => compose(g, compose(f, f))
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

// | The initial board in FEN notation, 8 stands for an empty row
const initialBoard = `rnbqkbnr/`
                   + `pppppppp/`
                   + `8/`
                   + `8/`
                   + `8/`
                   + `8/`
                   + `PPPPPPPP/`
                   + `RNBQKBNR`

const splitForwardSlash = split('/')
const splitChars= split('')
const joinChars = join('')

// | Maps the empty row from FEN notation '8' to a string of eight blanks: '8' -> '        '
const mapEmptyRow = compose(joinChars, (_: EmptyRow) => map(_ => empty)(range(0, boardSideLength)))

const isEmptyRow = (x: string | EmptyRow) => x === boardSideLength.toString()

const emptyRowMapper =
  ifElse(isEmptyRow)
    (mapEmptyRow)
    (identity)

const splitBoard = splitForwardSlash

const insertEmptyRows = map(emptyRowMapper)
const parseBoard = compose(insertEmptyRows, splitBoard)
const board = parseBoard(initialBoard)

board
