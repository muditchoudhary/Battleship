const Player = (myBoard, enemyBoard) => {
    let name;

    const attack = (row, col) => {
        enemyBoard.recieveAttack(row, col);
    };

    return {
        attack,
        get name() {
            return name;
        },
        set name(v) {
            name = v;
        },
    };
};

const Robot = (myBoard, enemyBoard) => {
    // Global Variables
    // Initializing an array for picking randome coordinates
    const boardCellsArr = [];
    const GRIDLENGTH = myBoard.board.length;
    for (let i = 0; i < GRIDLENGTH * GRIDLENGTH; i += 1) {
        boardCellsArr[i] = i;
    }
    const name = "Wolly";

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
        get name() {
            return name;
        },
    };
};

module.exports = { Player, Robot };
