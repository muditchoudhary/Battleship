const Player = (myBoard, enemyBoard) => {
    const attack = (row, col) => {
        enemyBoard.recieveAttack(row, col);
    };

    return { attack };
};

const Robot = (myBoard, enemyBoard) => {
    // Global Variables
    // Initializing an array for picking randome coordinates
    const boardCellsArr = [];
    for (let i = 0; i < myBoard.board.length; i += 1) {
        boardCellsArr[i] = i;
    }

    /**
     * @returns Number - random element from boardCellArr
     */
    const randomCoordinates = () => boardCellsArr[Math.floor(Math.random() * boardCellsArr.length)];

    /**
     * Attack on the enemey board by selecting random coordinate
     */
    const attack = () => {
        const coordToAttack = randomCoordinates();
        const row = Math.floor(coordToAttack / 10); // Seperating the number into row and col like 98; 9 > row | 8 > col
        const col = coordToAttack % 10;
        enemyBoard.recieveAttack(row, col);

        // Removing that coordinate from boardCellArr to prevent getting same coordinate
        const idx = boardCellsArr.indexOf(coordToAttack);
        boardCellsArr.splice(idx, idx !== -1 ? 1 : 0);
    };

    const aPlayer = Player(myBoard, enemyBoard);

    return {
        ...aPlayer,
        attack,
    };
};

module.exports = { Player, Robot };
