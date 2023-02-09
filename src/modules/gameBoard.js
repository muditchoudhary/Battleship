const Gameboard = () => {
    /**
     * Check if all the ships have sunk
     * @returns boolean
     */
    const haveShipsSunk = () => {
        let allShipsSunk = 0;
        for (const ship of ships) {
            if (ship.isSunk()) allShipsSunk++;
        }

        if (allShipsSunk >= 5) return true;
        return false;
    };

    /**
     * Find the ship which has been attacked
     * @param {number} row
     * @param {number} col
     * @returns that ship where given coordinates lies inside that ship's coordinates range
     */
    const whichShip = (row, col) => {
        for (const ship of ships) {
            if (ship.row !== row) {
                continue;
            } else if (ship.colEnd >= col >= ship.colStart) return ship;
        }
    };

    /**
     * Attack on the given coordinates
     * @param {number} row
     * @param {number} col
     */
    const recieveAttack = (row, col) => {
        if (board[row][col] === 1) {
            const ship = whichShip(row, col);
            ship.hit();
            board[row][col] = 3;
        } else {
            board[row][col] = 2;
        }
    };

    const assertRowInRange = (row) => {
        if (row >= boardSize) throw new Error("Row must be less than 10");
    };

    const assertColInRange = (col) => {
        if (col >= boardSize) throw new Error("Col must be less than 10");
    };

    const assertBlocksLength = (row, col, shipLength) => {
        const subRowArr = board[row].slice(col, shipLength + col);
        if (subRowArr.length < shipLength)
            throw new Error(
                "Choose coordinates where total blocks equal or greater than ship's length"
            );
    };

    const assertShipsOverlap = (row, col, shipLength) => {
        const subRowArr = board[row].slice(col, shipLength + col);
        for (const block of subRowArr) {
            if (block === 1)
                throw new Error("Choose coordinates where a ship should not be placed already");
        }
    };

    /**
     * Place the Ship object on the board grid array
     * @param {object} newShip
     * @param {number} row
     * @param {number} col
     */
    const placeShip = (newShip, row, col) => {
        const shipLength = newShip.length;
        assertRowInRange(row);
        assertColInRange(col);
        assertBlocksLength(row, col, shipLength);
        assertShipsOverlap(row, col, shipLength);
        let n = shipLength;
        const r = row;
        let c = col;
        while (n > 0) {
            board[r][c++] = 1;
            n--;
        }
        // Seting ship coordinates in ship object
        newShip.setShipCoordinates(row, col, shipLength);
        ships.push(newShip);
    };

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

    let ships = [];

    return {
        get board() {
            return board;
        },
        placeShip,
        recieveAttack,
        haveShipsSunk,
    };
};

const ship = require("./ship");

module.exports = Gameboard;
