import 'jest'

// --- utils ---
// | Logic
type Identity = <T>(x: T) => T
const identity: Identity = x => x
type IfElse = <T>(c: (x: T) => boolean) => <R1>(f: (x: T) => R1) => <R2>(g: (x: T) => R2) => (x: T) => R1 | R2
const ifElse: IfElse = c => f => g => x => c(x) ? f(x): g(x)
type Compose = <R2, R3>(f: (x: R2) => R3) => <R1>(g: (x: R1) => R2) => (x: R1) => R3
const compose: Compose = f => g => x => f(g(x))
type Complement = <T>(f: (x: T) => boolean) => (x: T) => boolean
const complement: Complement = f => x => !f(x)

// | Arrays
const len = <T>(x: ReadonlyArray<T>) => x.length
const concat = <T>(x: ReadonlyArray<T>) => (y: ReadonlyArray<T> | T) => x.concat(y)
const map = <T, R>(mapper: (x: T) => R) => (xs: ReadonlyArray<T>) => xs.map(mapper)
const split = (seperator: string | RegExp) => (s: string) => s.split(seperator)
const join = (seperator: string) => <T>(xs: ReadonlyArray<T>) => xs.join(seperator)
const slice = (start: number) => (end: number) => <T>(x: ReadonlyArray<T>) => x.slice(start, end)
const tail = <T>(xs: ReadonlyArray<T>) => slice(0)(len(xs) - 1 - 1)(xs)
const head = <T>(xs: ReadonlyArray<T>) => xs[0]
const last = <T>(xs: ReadonlyArray<T>) => xs[len(xs) - 1]
const init = <T>(xs: ReadonlyArray<T>) => slice(1)(len(xs) - 1)(xs)
const range = (start: number) => (end: number) => (xs: ReadonlyArray<number>): ReadonlyArray<number> =>
  start === end
  ? xs
  : range(++start)(end)(concat(xs)(start))
const isNumber = complement(Number.isNaN)
const splitForwardSlash = split('/')
const splitChars= split('')
const joinChars = join('')
// --- utils ---



// --- Board representation ---
type BoardSize = 8
const boardSize: BoardSize = 8

// | This type is used in the FEN notation to represent a blank row
type FenEmptyRow = "8"
const fenEmptyRow: FenEmptyRow = "8"

type NegativeBoardSize = -8
const negativeBoardSize: NegativeBoardSize = -8

// | White pices are "PNBRQK"
// * Black pieces are "pnbrqk"
enum Piece {
  p = 'p', n = 'n', b = 'b', r = 'r', q = 'q', k = 'k',
  P = 'P', N = 'N', B = 'B', R = 'R', Q = 'Q', K = 'K'
}

type Empty = '0'
const empty: Empty = '0'

type EmptyRow = "00000000"
const emptyRow: EmptyRow = "00000000"

type OffBoard = 'X'
const offBoard: OffBoard = 'X'

type Square = Empty | Piece

type Board = ReadonlyArray<Square>

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
// --- Board representation ---



// --- Parsing the board ---
// | The initial board in FEN notation, 8 stands for an empty row
const initialBoard = `rnbqkbnr/`
                   + `pppppppp/`
                   + `8/`
                   + `8/`
                   + `8/`
                   + `8/`
                   + `PPPPPPPP/`
                   + `RNBQKBNR`

const generateRow = range(0)(boardSize)([])

type ToEmptyRow = (x: FenEmptyRow) => Empty[]
const toEmptyRow: ToEmptyRow = _ => map(_ => empty)(generateRow)

expect(toEmptyRow(fenEmptyRow)).toHaveLength(boardSize)
toEmptyRow(fenEmptyRow).map(x => expect(x).toBe(empty))


type JoinEmptys = (x: Empty[]) => EmptyRow
const joinEmptys: JoinEmptys = joinChars as JoinEmptys

// | Maps the empty row from FEN notation '8' to chex notation
type MapEmptyRow = (x: FenEmptyRow) => EmptyRow
const mapEmptyRow: MapEmptyRow = compose
  (joinEmptys)
  (toEmptyRow)

type IsFenEmptyRow = (x: Piece | FenEmptyRow) => boolean
const isFenEmptyRow: IsFenEmptyRow = x => x === fenEmptyRow

expect(isFenEmptyRow(fenEmptyRow)).toBe(true)
expect(isFenEmptyRow(Piece.k)).toBe(false)
expect(isFenEmptyRow(Piece.p)).toBe(false)

const emptyRowMapper =
  ifElse(isFenEmptyRow)
    (mapEmptyRow)
    (identity)


type SplitBoard = (b: string) => (Piece | FenEmptyRow)[]
const splitBoard: SplitBoard = splitForwardSlash as SplitBoard

const insertEmptyRows = map(emptyRowMapper)
const parseBoard = compose
  (insertEmptyRows)
  (splitBoard)
const board = parseBoard(initialBoard)
// --- Parsing the board ---



// --- Moving along the board ---
type Steps = 1 | -1 | BoardSize | NegativeBoardSize
type Move = (p: Pos) => number
const move = (s: Steps) => (p: Pos) => s + p

const moveNorth = move(boardSize)
const moveSouth = move(negativeBoardSize)
const moveWest = move(-1)
const moveEast = move(1)
const moveNorthWest = compose
  (moveNorth)
  (moveWest)
const moveNorthEast = compose
  (moveNorth)
  (moveEast)
const moveSouthWest = compose
  (moveSouth)
  (moveWest)
const moveSouthEast = compose
  (moveSouth)
  (moveEast)

const jump = (f: Move) => (g: Move) => compose
  (g)
  (compose(f)(f))
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
// --- Moving along the board ---
