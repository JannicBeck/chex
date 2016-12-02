const Rx = require('redux');

const Pos = {
  A1: 0, B1: 1, C1: 2, D1: 3, E1: 4, F1: 5, G1: 6, H1: 7,
  A2: 8, B2: 9, C2: 10, D2: 11, E2: 12, F2: 13, G2: 14, H2: 15,
  A3: 16, B3: 17, C3: 18, D3: 19, E3: 20, F3: 21, G3: 22, H3: 23,
  A4: 24, B4: 25, C4: 26, D4: 27, E4: 28, F4: 29, G4: 30, H4: 31,
  A5: 32, B5: 33, C5: 34, D5: 35, E5: 36, F5: 37, G5: 38, H5: 39,
  A6: 40, B6: 41, C6: 42, D6: 43, E6: 44, F6: 45, G6: 46, H6: 47,
  A7: 48, B7: 49, C7: 50, D7: 51, E7: 52, F7: 53, G7: 54, H7: 55,
  A8: 56, B8: 57, C8: 58, D8: 59, E8: 60, F8: 61, G8: 62, H8: 63
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

for (let i = Pos.A7; i <= Pos.H7; i++) {
  board[i] = pawn(Player.Black);
}

for (let i = Pos.A2; i <= Pos.H2; i++) {
  board[i] = pawn(Player.White);
}

for (let i = Pos.A3; i <= Pos.H6; i++) {
  board[i] = null;
}

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
      if (payload.from < payload.to) {
        return [
          ...state.slice(0, payload.from),
          null,
          ...state.slice(payload.from + 1, payload.to),
          state[payload.from], 
          ...state.slice(payload.to + 1)
        ];
      } else if (payload.from > payload.to) {
        return [
          ...state.slice(0, payload.to),
          state[payload.from],
          ...state.slice(payload.to + 1, payload.from),
          null,
          ...state.slice(payload.from + 1)
        ];
      } else {
        return state;
      }
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

store.dispatch({
  type: MOVE,
  payload: {
    from: Pos.D2,
    to: Pos.D4
  }
});