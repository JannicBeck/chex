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

let blackKing: Figure = {
  type: FigureType.King,
  player: Player.Black,
  position: Position.D8
};

let blackQueen: Figure = {
  type: FigureType.Queen,
  player: Player.Black,
  position: Position.E8
}

let whiteKing: Figure = {
  type: FigureType.King,
  player: Player.White,
  position: Position.D1
}

let whiteQueen: Figure = {
  type: FigureType.Queen,
  player: Player.White,
  position: Position.E1
}

board[blackKing.position] = blackKing;
board[whiteKing.position] = whiteKing;
board[blackQueen.position] = blackQueen;
board[whiteQueen.position] = whiteQueen;

const MOVE = 'MOVE';

const reducer = (state = board, action) => {
  switch (action.type) {
    case MOVE:
      return state;
    default:
      return state;
  }
};

let store = createStore(reducer);

console.log(store.getState());
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: MOVE,
  payload: {
    from: Position.D8,
    to: Position.D1
  }
});