const Player = (myBoard, enemyBoard) => {
    const attack = (row, col) => {
        enemyBoard.recieveAttack(row, col);
    }

    return {attack};
}

const Robot = (myBoard, enemyBoard) => {
    /**
     * @returns Number - random element from boardCellArr
     */
    const randomCoordinates = () => {
        return boardCellsArr[Math.floor(Math.random() * boardCellsArr.length)]
    }

    /**
     * Attack on the enemey board by selecting random coordinate 
     */
    const attack = () => {
        let coordToAttack = randomCoordinates();
        let row = Math.floor(coordToAttack / 10); // Seperating the number into row and col like 98; 9 > row | 8 > col
        let col = coordToAttack % 10;
        enemyBoard.recieveAttack(row, col);

        // Removing that coordinate from boardCellArr to prevent getting same coordinate
        const idx = boardCellsArr.indexOf(coordToAttack);
        boardCellsArr.splice(idx, idx !== -1 ? 1 : 0);
    }

    const aPlayer = Player(myBoard, enemyBoard);

    // Initializing an array for picking randome coordinates
    let boardCellsArr = [];
    for (let i = 0; i < myBoard.board.length; i++) {
        boardCellsArr[i] = i;
    }
    return {
        ...aPlayer,
        attack
    }
}

module.exports = {Player, Robot};