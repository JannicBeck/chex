const assert = require('assert')
const Player = require('./player.js')
const calculatePossibleMoves = require('./validator.js')
const Pos = require('./position.js')
const board = require('./board.js').initialBoard
const virtualBoard = require('./board.js').virtualBoard
const logger = require('./logger.js')

logger(board)
logger(virtualBoard)

const validator = calculatePossibleMoves.bind(null, board)

const genMsg = (pos, actual, expected) => {
  const figureType = board[pos].type
  const player = Player[board[pos].player]
  const posCode = Pos[pos]
  const actualPos = actual.map(p => Pos[p])
  const expectedPos = expected.map(p => Pos[p])
  return `${player} ${figureType} on ${posCode} expected to have moves ${expectedPos} but actually has ${actualPos}`
}

(function() {
  const pos = Pos.A8
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.A1
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.H8
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.H1
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.B8
  const actual = validator(pos)
  const expected = [Pos.A6, Pos.C6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.B1
  const actual = validator(pos)
  const expected = [Pos.A3, Pos.C3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.G8
  const actual = validator(pos)
  const expected = [F6, H6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.G1
  const actual = validator(pos)
  const expected = [F3, H3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.C1
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.D1
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.E1
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.F1
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.C8
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.D8
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.E8
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.F8
  const actual = validator(pos)
  const expected = []
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.A2
  const actual = validator(pos)
  const expected = [Pos.A3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.B2
  const actual = validator(pos)
  const expected = [Pos.B3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.C2
  const actual = validator(pos)
  const expected = [Pos.C3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.D2
  const actual = validator(pos)
  const expected = [Pos.D3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.E2
  const actual = validator(pos)
  const expected = [Pos.E3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.F2
  const actual = validator(pos)
  const expected = [Pos.F3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.G2
  const actual = validator(pos)
  const expected = [Pos.G3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.H2
  const actual = validator(pos)
  const expected = [Pos.H3]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.A7
  const actual = validator(pos)
  const expected = [Pos.A6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.B7
  const actual = validator(pos)
  const expected = [Pos.B6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.C7
  const actual = validator(pos)
  const expected = [Pos.C6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.D7
  const actual = validator(pos)
  const expected = [Pos.D6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.E7
  const actual = validator(pos)
  const expected = [Pos.E6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.F7
  const actual = validator(pos)
  const expected = [Pos.F6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.G7
  const actual = validator(pos)
  const expected = [Pos.G6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();

(function() {
  const pos = Pos.H7
  const actual = validator(pos)
  const expected = [Pos.H6]
  assert.deepEqual(actual, expected, genMsg(pos, actual, expected))
})();
