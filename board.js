const Player = require('./player.js')
const Pos = require('./position.js')
const Figure = require('./figure.js')

const EMPTY = 'EMPTY'

let initialBoard = []

initialBoard[Pos.A8] = {
  type: Figure.Rook,
  player: Player.Black
}
initialBoard[Pos.B8] = {
  type: Figure.Knight,
  player: Player.Black
}
initialBoard[Pos.C8] = {
  type: Figure.Bishop,
  player: Player.Black
}
initialBoard[Pos.D8] = {
  type: Figure.King,
  player: Player.Black
}
initialBoard[Pos.E8] = {
  type: Figure.Queen,
  player: Player.Black
}
initialBoard[Pos.F8] = {
  type: Figure.Bishop,
  player: Player.Black
}
initialBoard[Pos.G8] = {
  type: Figure.Knight,
  player: Player.Black
}
initialBoard[Pos.H8] = {
  type: Figure.Rook,
  player: Player.Black
}

for (let i = Pos.A7; i <= Pos.H7; i++) {
  initialBoard[i] = generatePawn(Player.Black)
}

for (let i = Pos.A2; i <= Pos.H2; i++) {
  initialBoard[i] = generatePawn(Player.White)
}

for (let i = Pos.A6; i <= Pos.H3; i++) {
  initialBoard[i] = EMPTY
}

initialBoard[Pos.A1] = {
  type: Figure.Rook,
  player: Player.White
}
initialBoard[Pos.B1] = {
  type: Figure.Knight,
  player: Player.White
}
initialBoard[Pos.C1] = {
  type: Figure.Bishop,
  player: Player.White
}
initialBoard[Pos.D1] = {
  type: Figure.King,
  player: Player.White
}
initialBoard[Pos.E1] = {
  type: Figure.Queen,
  player: Player.White
}
initialBoard[Pos.F1] = {
  type: Figure.Bishop,
  player: Player.White
}
initialBoard[Pos.G1] = {
  type: Figure.Knight,
  player: Player.White
}
initialBoard[Pos.H1] = {
  type: Figure.Rook,
  player: Player.White
}

function generatePawn(player) {
  return {
    type: Figure.Pawn,
    player,
  }
}

// 12x12 board that solves the Knight problem
function createVirtualBoard () {
  let virtualBoard = []
  const SIDELENGTH = 12

  // add two rows on top
  for (let i = 0; i < 2 * SIDELENGTH; i++) {
    virtualBoard.push(null)
  }

  // add two columns left and two columns right
  for (let i = 0; i < initialBoard.length; i += Math.sqrt(initialBoard.length)) {
    let row = initialBoard.slice(i, i + Math.sqrt(initialBoard.length))
    row.unshift(null)
    row.unshift(null)
    row.push(null)
    row.push(null)
    virtualBoard = virtualBoard.concat(row)
  }

  // prepend two rows on bottom
  for (let i = 0; i < 2 * SIDELENGTH; i++) {
    virtualBoard.push(null)
  }
  return virtualBoard
}

module.exports = {
  initialBoard,
  virtualBoard: createVirtualBoard()
}