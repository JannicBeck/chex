const virtualBoard = require('./board.js').virtualBoard;
const board = require('./board.js').board;

function calculatePositionOnVirtualBoard (position) {
    const VIRTUALBOARDSIDELENGTH = Math.sqrt(virtualBoard.length);
    const BOARDSIDELENGTH = Math.sqrt(board.length);
    // two rows on top and two columns on the left side
    const FIRSTVALIDSQUARE = VIRTUALBOARDSIDELENGTH * 2 + 2;
    const rowNumber = (Math.floor(position / BOARDSIDELENGTH));
    // 2 columns left, 2 columns right -> 4 columns total
    return (FIRSTVALIDSQUARE + position) + (rowNumber * 4);
}

module.exports = function validateMove (position) {
    const positionOnVirtualBoard = calculatePositionOnVirtualBoard(position);
    if (virtualBoard[positionOnVirtualBoard]) {
        return true;
    } else {
        return false;
    }
}