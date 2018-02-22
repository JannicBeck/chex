// Event: the name of the tournament or match event.
// Site: the location of the event. This is in City, Region COUNTRY format, where COUNTRY is the three-letter International Olympic Committee code for the country. An example is New York City, NY USA.
// Date: the starting date of the game, in YYYY.MM.DD form. ?? is used for unknown values.
// Round: the playing round ordinal of the game within the event.
// White: the player of the white pieces, in Lastname, Firstname format.
// Black: the player of the black pieces, same format as White.
// Result: the result of the game. This can only have four possible values: 1-0 (White won), 0-1 (Black won), 1/2-1/2 (Draw), or * (other, e.g., the game is ongoing).

// [Event "IBM Kasparov vs. Deep Blue Rematch"]
// [Site "New York, NY USA"]
// [Date "1997.05.11"]
// [Round "6"]
// [White "Deep Blue"]
// [Black "Kasparov, Garry"]
// [Opening "Caro-Kann: 4...Nd7"]
// [ECO "B17"]
// [Result "1-0"]

// 1. [Event "?"]	the name of the tournament or match event
// 2. [Site "www.myChess.de"]	the location of the event
// 3. [Date "YYYY.MM.TT"]	the starting date of the game
// 4. [Round "?"]	the playing round ordinal of the game
// 5. [Board "?"]	the board number in a team event
// 6. [White "Churchill, Winston"]	the player of the white pieces
// 7. [Black "Smith, Norma"]	the player of the black pieces
// 8. [Result "*"]	the result of the game
// 9. [ECO "C70"]	ECO-Opening-Key (ECO = "Encyclopaedia of Chess Openings")
// 10. [WhitemyELO "1550"]	myELO-score white (at the beginning of the game)
// 11. [BlackmyELO "1361"]	myELO-score black (at the beginning of the game)
// 12. [TimeControl "10/2592000"]	This tag describes the time control used with the game. The first digit shows the number of moves and the second the time-limit.
// 10 days = 864000 seconds
// 20 days = 1728000 seconds
// 30 days = 2592000 seconds
// 40 days = 3456000 seconds
// 13. [WhiteDays "31"]	rate in days for white
// 14. [BlackDays "25"]	rate in days for black
// 15. [myChessNo "123"]	identification-no. of the game on the myChess.de - server
//
// 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 h6
// 8.Nxe6 Qe7 9.O-O fxe6 10.Bg6+ Kd8 {Kasparov schüttelt kurz den Kopf}
// 11.Bf4 b5 12.a4 Bb7 13.Re1 Nd5 14.Bg3 Kc8 15.axb5 cxb5 16.Qd3 Bc6
// 17.Bf5 exf5 18.Rxe7 Bxe7 19.c4 1-0

// http://www.mychess.de/ChessNotation.htm

type Move = (p: Pos) => number
type BoardSideLength = 8
// | This type is used in the FEN notation to represent a blank row
type EmptyRow = '8'
type NegativeBoardSideLength = -8
type Steps = 1 | -1 | BoardSideLength | NegativeBoardSideLength
type Empty = ' '

// | White pices are "PNBRQK"
// * Black pieces are "pnbrqk"
enum Piece {
  p = 'p', n = 'n', b = 'b', r = 'r', q = 'q', k = 'k',
  P = 'P', N = 'N', B = 'B', R = 'R', Q = 'Q', K = 'K'
}

const EMPTY: Empty = ' '

const identity = <T>(x: T) => x
const ifElse = <T, R1, R2>(c: (x: T) => boolean) => (f: (x: T) => R1) => (g: (x: T) => R2) => (x: T) => c(x) ? f(x): g(x)
const compose = <R1, R2, R3>(f: (x: R2) => R3, g: (x: R1) => R2) => (x: R1) => f(g(x))
const map = <T, R>(mapper: (x: T) => R) => (xs: ReadonlyArray<T>) => xs.map(mapper)
const split = <T>(seperator: string | RegExp, limit?: number) => (s: string) => s.split(seperator, limit)
const join = <T>(seperator: string) => (xs: ReadonlyArray<T>) => xs.join(seperator)
const flatten = <T> (xs: ReadonlyArray<T>) => [].concat(...xs) as ReadonlyArray<T>
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
  '♙': [Piece.p], '♘': [Piece.n], '♗': [Piece.b], '♖': [Piece.r], '♕': [Piece.q], '♔': [Piece.k],
  '♟': [Piece.P], '♞': [Piece.N], '♝': [Piece.B], '♜': [Piece.R], '♛': [Piece.Q], '♚': [Piece.K]
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

type Square = Piece | Empty

enum PlayerColor {
  White,
  Black
}

type Board = ReadonlyArray<Square>

const initialBoard = `rnbqkbnr/`
                   + `pppppppp/`
                   + `${boardSideLength}/`
                   + `${boardSideLength}/`
                   + `${boardSideLength}/`
                   + `${boardSideLength}/`
                   + `PPPPPPPP/`
                   + `RNBQKBNR`

const splitForwardSlash = split('/')
const splitChars= split('')
const joinChars = join('')

type MapToEmpty = <T>(xs: ReadonlyArray<T>) => Empty[]
const mapToEmpty = map(_ => EMPTY) as MapToEmpty

const mapEmptyRow = _ => mapToEmpty(range(0, boardSideLength)).join('')

const isEmptyRow = (x: string | EmptyRow) => x === boardSideLength.toString()

const emptyRowMapper =
  ifElse(isEmptyRow)
    (mapEmptyRow)
    (identity)

const splitBoard = splitForwardSlash

const insertEmptyRows = map(emptyRowMapper)
const parseBoard = compose(flatten, compose(insertEmptyRows, splitBoard))
const board = parseBoard(initialBoard)
board
// | The FEN consists of 6 sections seperated by blanks
// * {Piece placement} {Active colour} {Castling availability} {En passant target square} {Halfmove clock} {Fullmove number}
//
// | Piece placement (from white's perspective)
// * Each rank is described, starting with rank 8 and ending with rank 1.
// * Within each rank, the contents of each square are described from file "a" through file "h".
// * Following the Standard Algebraic Notation (SAN), each piece is identified by a single letter taken from the standard
// * English names (pawn = "P", knight = "N", bishop = "B", rook = "R", queen = "Q" and king = "K").
// * White pieces are designated using upper-case letters ("PNBRQK") while black pieces use lowercase ("pnbrqk").
// * Empty squares are noted using digits 1 through 8 (the number of empty squares), and "/" separates ranks.
//
// | Active colour
// * "w" means White moves next, "b" means Black.
//
// | Castling availability
// * If neither side can castle, this is "-".
// * Otherwise, this has one or more letters: "K" (White can castle kingside),
// * "Q" (White can castle queenside), "k" (Black can castle kingside),
// * and/or "q" (Black can castle queenside).
//
// | En passant target square in algebraic notation
// * If there's no en passant target square, this is "-".
// * If a pawn has just made a two-square move, this is the position "behind" the pawn.
// * This is recorded regardless of whether there is a pawn in position to make an en passant capture.
//
// | Halfmove clock
// * This is the number of halfmoves since the last capture or pawn advance.
// * This is used to determine if a draw can be claimed under the fifty-move rule.
//
// | Fullmove number
// * The number of the full move. It starts at 1, and is incremented after Black's move.


// | Read a square using FEN notation or ' ' for an empty square
type ReadSquare = (x: string) => Square
const readSquare: ReadSquare = x => PIECE_SYMBOLS[x] || EMPTY

// | Shows a piece using FEN notation
type ShowPiece = (p: Piece) => string
const showPiece: ShowPiece = p => PIECE_SYMBOLS[p]

// | Show a square using FEN notation or ' ' for an empty square
type ShowSquare = (s: Square) => string
const showSquare = showPiece

type ShowBoard = (b: Board) => string
const showBoard = map(showSquare)

