const Rx = require('redux');

const Pos = {
  A8: 0, B8: 1, C8: 2, D8: 3, E8: 4, F8: 5, G8: 6, H8: 7,
  A7: 8, B7: 9, C7: 10, D7: 11, E7: 12, F7: 13, G7: 14, H7: 15,
  A6: 16, B6: 17, C6: 18, D6: 19, E6: 20, F6: 21, G6: 22, H6: 23,
  A5: 24, B5: 25, C5: 26, D5: 27, E5: 28, F5: 29, G5: 30, H5: 31,
  A4: 32, B4: 33, C4: 34, D4: 35, E4: 36, F4: 37, G4: 38, H4: 39,
  A3: 40, B3: 41, C3: 42, D3: 43, E3: 44, F3: 45, G3: 46, H3: 47,
  A2: 48, B2: 49, C2: 50, D2: 51, E2: 52, F2: 53, G2: 54, H2: 55,
  A1: 56, B1: 57, C1: 58, D1: 59, E1: 60, F1: 61, G1: 62, H1: 63
}

const FigureType = {
  King: 'King',
  Queen: 'Queen',
  Bishop: 'Bishop',
  Knight: 'Knight',
  Rook: 'Rook',
  Pawn: 'Pawn'
}

const Player = {
  White: 'White',
  Black: 'Black'
}

let board = [];

board[Pos.A8] = {
  type: FigureType.Rook,
  player: Player.Black
};
board[Pos.B8] = {
  type: FigureType.Knight,
  player: Player.Black
};
board[Pos.C8] = {
  type: FigureType.Bishop,
  player: Player.Black
};
board[Pos.D8] = {
  type: FigureType.King,
  player: Player.Black
};
board[Pos.E8] = {
  type: FigureType.Queen,
  player: Player.Black
};
board[Pos.F8] = {
  type: FigureType.Bishop,
  player: Player.Black
};
board[Pos.G8] = {
  type: FigureType.Knight,
  player: Player.Black
};
board[Pos.H8] = {
  type: FigureType.Rook,
  player: Player.Black
};

board[Pos.A7] = pawn(Player.Black);
board[Pos.B7] = pawn(Player.Black);
board[Pos.C7] = pawn(Player.Black);
board[Pos.D7] = pawn(Player.Black);
board[Pos.E7] = pawn(Player.Black);
board[Pos.F7] = pawn(Player.Black);
board[Pos.G7] = pawn(Player.Black);
board[Pos.H7] = pawn(Player.Black);

board[Pos.A6] = null;
board[Pos.B6] = null;
board[Pos.C6] = null;
board[Pos.D6] = null;
board[Pos.E6] = null;
board[Pos.F6] = null;
board[Pos.G6] = null;
board[Pos.H6] = null;

board[Pos.A5] = null;
board[Pos.B5] = null;
board[Pos.C5] = null;
board[Pos.D5] = null;
board[Pos.E5] = null;
board[Pos.F5] = null;
board[Pos.G5] = null;
board[Pos.H5] = null;

board[Pos.A4] = null;
board[Pos.B4] = null;
board[Pos.C4] = null;
board[Pos.D4] = null;
board[Pos.E4] = null;
board[Pos.F4] = null;
board[Pos.G4] = null;
board[Pos.H4] = null;

board[Pos.A3] = null;
board[Pos.B3] = null;
board[Pos.C3] = null;
board[Pos.D3] = null;
board[Pos.E3] = null;
board[Pos.F3] = null;
board[Pos.G3] = null;
board[Pos.H3] = null;

board[Pos.A2] = pawn(Player.White);
board[Pos.B2] = pawn(Player.White);
board[Pos.C2] = pawn(Player.White);
board[Pos.D2] = pawn(Player.White);
board[Pos.E2] = pawn(Player.White);
board[Pos.F2] = pawn(Player.White);
board[Pos.G2] = pawn(Player.White);
board[Pos.H2] = pawn(Player.White);

board[Pos.A1] = {
  type: FigureType.Rook,
  player: Player.White
};
board[Pos.B1] = {
  type: FigureType.Knight,
  player: Player.White
};
board[Pos.C1] = {
  type: FigureType.Bishop,
  player: Player.White
};
board[Pos.D1] = {
  type: FigureType.King,
  player: Player.White
};
board[Pos.E1] = {
  type: FigureType.Queen,
  player: Player.White
};
board[Pos.F1] = {
  type: FigureType.Bishop,
  player: Player.White
};
board[Pos.G1] = {
  type: FigureType.Knight,
  player: Player.White
};
board[Pos.H1] = {
  type: FigureType.Rook,
  player: Player.White
};

function pawn(player) {
  return {
    type: FigureType.Pawn,
    player,
  };
}

const MOVE = 'MOVE';

const reducer = (state = board, { type, payload }) => {
  switch (type) {
    case MOVE:
      return [
        ...state.slice(0, payload.from),
        null,
        ...state.slice(payload.from, payload.to),
        state[payload.from], 
        ...state.slice(payload.to + 1)
      ];
    default:
      return state;
  }
};

let store = Rx.createStore(reducer);

console.log(store.getState());
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: MOVE,
  payload: {
    from: Pos.D7,
    to: Pos.D6
  }
});

