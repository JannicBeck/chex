export const FIGURES = {
  King: 'King',
  Queen: 'Queen',
  Bishop: 'Bishop',
  Knight: 'Knight',
  Rook: 'Rook',
  Pawn: 'Pawn'
}

export const FIGURE_SYMBOLS = {
  [Player.White]: {
    [Figure.Pawn]: '♙',
    [Figure.Bishop]: '♗',
    [Figure.King]: '♔',
    [Figure.Queen]: '♕',
    [Figure.Rook]: '♖',
    [Figure.Knight]: '♘'
  },
  [Player.Black]: {
    [Figure.Pawn]: '♟',
    [Figure.Bishop]: '♝',
    [Figure.King]: '♚',
    [Figure.Queen]: '♛',
    [Figure.Rook]: '♜',
    [Figure.Knight]: '♞'
  }
}
