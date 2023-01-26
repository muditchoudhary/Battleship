const Gameboard = () => {

    let assertRowInRange = (row) => {
        if (row >= boardSize) throw new Error("Row must be less than 10");
    }

    let assertColInRange = (col) => {
        if (col >= boardSize) throw new Error("Col must be less than 10");
    }

    let assertBlocksLength = (row, col, shipLength) => {
        const subRowArr = board[row].slice(col);
        if (subRowArr.length < shipLength) throw new Error("Choose coordinates where total blocks equal or greater than ship's length");
    }

    let assertShipsOverlap = (row, col, shipLength)  => {
        const subRowArr = board[row].slice(col);
        for (let block of subRowArr) {
            if (block === 1) throw new Error("Choose coordinates where a ship should not be placed already");
        }
    }

    let placeShip = (newShip, row, col) => {
        let shipLength = newShip.length;
        assertRowInRange(row);
        assertColInRange(col);
        assertBlocksLength(row, col, shipLength);
        assertShipsOverlap(row, col, shipLength);
        while (shipLength > 0) {
            board[row][col++] = 1;
            shipLength--;
        }
    }

    let board = new Array(10);
    const boardSize = 10;

    // Declaration of Grid array
    for (let i = 0; i < boardSize; i++) {
        board[i] = new Array(10);
    }
    // Initilization of Grid array
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = 0;
        }
    }


    let airCraft = ship(7);
    let airCraftCoordinates = {row: 4, col: 7};
    let battleship = ship(6);
    let cruiser = ship(5);
    let submarine = ship(4);
    let destroyer = ship(3);

    return {board, placeShip}
    
}

const ship = require('./ship');

module.exports = Gameboard;