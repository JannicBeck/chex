const Rx = require('redux');

const logger = require('./logger.js');

const Player = require('./player.js');
const Pos = require('./position.js');
const Figure = require('./figure.js');
const board = require('./board.js');

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

store.subscribe(() => {
  logger(store.getState());
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


