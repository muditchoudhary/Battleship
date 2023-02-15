const Gameboard = () => {
    // Global Variables
    const ships = [];
    // eslint-disable-next-line prefer-const
    let board = new Array(10);
    const boardSize = 10;

    // Declaration of Grid array
    for (let i = 0; i < boardSize; i += 1) {
        board[i] = new Array(10);
    }
    // Initilization of Grid array
    for (let i = 0; i < boardSize; i += 1) {
        for (let j = 0; j < boardSize; j += 1) {
            board[i][j] = 0;
        }
    }

    /**
     * Check if all the ships have sunk
     * @returns boolean
     */
    const haveShipsSunk = () => {
        // let allShipsSunk = 0;
        // for (let i = 0; i < ships.length; i += 1) {
        //     if (ships[i].isSunk()) allShipsSunk += 1;
        // }

        // if (allShipsSunk >= 5) return true;
        // return false;
        if (ships.length === 0) return true;
        return false;
    };

    /**
     * Find the ship which has been attacked
     * @param {number} row
     * @param {number} col
     * @returns that ship where given coordinates lies inside that ship's coordinates range
     */
    const whichShip = (row, col) => {
        let attackedShip;
        for (let i = 0; i < ships.length; i += 1) {
            if (ships[i].row === row) {
                if (col >= ships[i].colStart && col <= ships[i].colEnd) {
                    attackedShip = ships[i];
                    break;
                }
            }
        }
        return attackedShip;
    };

    /**
     * Attack on the given coordinates. If attack is successfull chnage
     * the grid value to 3. If miss change the value to 2.
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
        for (let i = 0; i < subRowArr.length; i += 1) {
            if (subRowArr[i] === 1)
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
            board[r][c] = 1;
            c += 1;
            n -= 1;
        }
        // Seting ship coordinates in ship object
        newShip.setShipCoordinates(row, col, shipLength);
        ships.push(newShip);
    };

    return {
        get board() {
            return board;
        },
        get ships() {
            return ships;
        },
        placeShip,
        recieveAttack,
        haveShipsSunk,
    };
};

const ship = require("./ship");

module.exports = Gameboard;
