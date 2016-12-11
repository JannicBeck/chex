const Rx = require('redux');

const logger = require('./logger.js');

const Player = require('./player.js');
const Pos = require('./position.js');
const Figure = require('./figure.js');
const board = require('./board.js').board;
const virtualBoard = require('./board.js').virtualBoard;
const chalk = require('chalk');
const repl = require('repl');

const EMPTY = 'EMPTY';

const MOVE = 'MOVE';

// const actionReducerMapping = {
//   MOVE: reducer
// };

// const move = (state = board, action) => {
//   actionReducerMapping[type](state, action);
// }

const reducer = (state = board, { type, payload }) => {
  switch (type) {
    case MOVE:
      if (payload.from < payload.to) {
        return [
          ...state.slice(0, payload.from),
          EMPTY,
          ...state.slice(payload.from + 1, payload.to),
          state[payload.from], 
          ...state.slice(payload.to + 1)
        ];
      } else if (payload.from > payload.to) {
        return [
          ...state.slice(0, payload.to),
          state[payload.from],
          ...state.slice(payload.to + 1, payload.from),
          EMPTY,
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

logger(store.getState());

store.subscribe(() => {
  logger(store.getState());
});

let timeout = 1000;

function move (input) {
  let inputList = input.toUpperCase().replace('\n', '').split('-');
  let from = inputList[0];
  let to = inputList[1];
  store.dispatch({
    type: MOVE,
    payload: {
      from: Pos[from],
      to: Pos[to]
    }
  });
}

repl.start({prompt: '> ', eval: move});


// const validateMove = require('./validator.js')
// console.log(validateMove({
//   from: Pos.D2,
//   to: Pos.D4,
//   type: Figure.Rook
// }));