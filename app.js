const createStore = require('redux').createStore
const combineReducers = require('redux').combineReducers

const logger = require('./logger.js')

const Player = require('./player.js')
const Pos = require('./position.js')
const Figure = require('./figure.js')
const initialBoard = require('./board.js').initialBoard
const virtualBoard = require('./board.js').virtualBoard
const chalk = require('chalk')
const repl = require('repl')

const EMPTY = 'EMPTY'

// actions
const MOVE = 'MOVE'
const ROTATE = 'ROTATE'

// const actionReducerMapping = {
//   MOVE: board,
//   ROTATE: whiteToMove
// }

// const reducer = (state = board, action) => {
//   actionReducerMapping[type](state, action)
// }

const whiteToMove = (state = true, { type }) => {
  switch (type) {
    case ROTATE: return !state
    default: return state
  }
}

const board = (state = initialBoard, { type, payload }) => {
  switch (type) {
    case MOVE:
      if (payload.from < payload.to) {
        return [
          ...state.slice(0, payload.from),
          EMPTY,
          ...state.slice(payload.from + 1, payload.to),
          state[payload.from], 
          ...state.slice(payload.to + 1)
        ]
      } else if (payload.from > payload.to) {
        return [
          ...state.slice(0, payload.to),
          state[payload.from],
          ...state.slice(payload.to + 1, payload.from),
          EMPTY,
          ...state.slice(payload.from + 1)
        ]
      } else {
        return state
      }
    default:
      return state
  }
}

let store = createStore(combineReducers({
  board,
  whiteToMove
}))

module.exports = store

const calculatePossibleMoves = require('./validator.js')

logger(store.getState().board)
logger(virtualBoard)

store.subscribe(() => {
  logger(store.getState().board)
  let whiteToMove = store.getState().whiteToMove
  console.log(`${whiteToMove ? "White" : "Black"} to move \n`)
})

function isValidMove (from, to) {
  return calculatePossibleMoves(Pos[from]).indexOf(Pos[to]) > -1
}

function move (input) {
  let inputList = input.replace('\n', '').toUpperCase().split('-')
  let from = inputList[0]
  let to = inputList[1]
  if (typeof Pos[from] === 'undefined' 
    || typeof Pos[to] === 'undefined'
    || !isValidMove(from, to)) {
    console.log(chalk.red('Invalid Move!'))
    console.log('Possible Moves: ', calculatePossibleMoves(Pos[from]))
  } else {
    store.dispatch({
      type: MOVE,
      payload: {
        from: Pos[from],
        to: Pos[to]
      }
    })
    store.dispatch({
      type: ROTATE
    })
  }
}

move('a7-a6')

console.log(`${whiteToMove ? "White" : "Black"} to move \n`)
repl.start({prompt: `> `, eval: move})