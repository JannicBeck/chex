import {
  createStore
} from 'redux';

import {
  Board,
  Figure,
  Player,
  FigureType,
  Position
} from './model';

let board = [];

board[Position.A8] = {
  type: FigureType.Rook,
  player: Player.Black,
  position: Position.A8
};
board[Position.B8] = {
  type: FigureType.Knight,
  player: Player.Black,
  position: Position.B8
};
board[Position.C8] = {
  type: FigureType.Bishop,
  player: Player.Black,
  position: Position.C8
};
board[Position.D8] = {
  type: FigureType.King,
  player: Player.Black,
  position: Position.D8
};
board[Position.E8] = {
  type: FigureType.Queen,
  player: Player.Black,
  position: Position.E8
};
board[Position.F8] = {
  type: FigureType.Bishop,
  player: Player.Black,
  position: Position.F8
};
board[Position.G8] = {
  type: FigureType.Knight,
  player: Player.Black,
  position: Position.G8
};
board[Position.H8] = {
  type: FigureType.Rook,
  player: Player.Black,
  position: Position.H8
};


/*setPawn(Player.Black, Position.A7);
setPawn(Player.Black, Position.B7);
setPawn(Player.Black, Position.C7);
setPawn(Player.Black, Position.D7);
setPawn(Player.Black, Position.E7);
setPawn(Player.Black, Position.F7);
setPawn(Player.Black, Position.G7);
setPawn(Player.Black, Position.H7);*/

/*
board[Position.A1] = {
  type: FigureType.Rook,
  player: Player.White,
  position: Position.A1
};
board[Position.B1] = {
  type: FigureType.Knight,
  player: Player.White,
  position: Position.B1
};
board[Position.C1] = {
  type: FigureType.Bishop,
  player: Player.White,
  position: Position.C1
};
board[Position.D1] = {
  type: FigureType.King,
  player: Player.White,
  position: Position.D1
};
board[Position.E1] = {
  type: FigureType.Queen,
  player: Player.White,
  position: Position.E1
};
board[Position.F1] = {
  type: FigureType.Bishop,
  player: Player.White,
  position: Position.F1
};
board[Position.G1] = {
  type: FigureType.Knight,
  player: Player.White,
  position: Position.G1
};
board[Position.H1] = {
  type: FigureType.Rook,
  player: Player.White,
  position: Position.H1
};
setPawn(Player.White, Position.A2);
setPawn(Player.White, Position.B2);
setPawn(Player.White, Position.C2);
setPawn(Player.White, Position.D2);
setPawn(Player.White, Position.E2);
setPawn(Player.White, Position.F2);
setPawn(Player.White, Position.G2);
setPawn(Player.White, Position.H2);*/

function setPawn (player: Player, position: Position) {
  board[position] = {
    type: FigureType.Pawn,
    player,
    position
  };
};


const MOVE = 'MOVE';

const reducer = (state = board, { type, payload }) => {
  switch (type) {
    case MOVE:
      return state;
/*      return [
        ...state.slice(0, payload.from),
        null,
        ...state.slice(payload.from, payload.to),
        Object.assign({}, state[payload.from], {
          position: payload.to
        }), 
        ...state.slice(payload.to + 1)
      ];*/
    default:
      return state;
  }
};

let store = createStore(reducer);

console.log(store.getState());
store.subscribe(() => {
  console.log(store.getState());
});

/*store.dispatch({
  type: MOVE,
  payload: {
    from: Position.D7,
    to: Position.D6
  }
});*/