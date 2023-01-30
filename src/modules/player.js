const Player = (myBoard, enemyBoard) => {
    const attack = (row, col) => {
        enemyBoard.recieveAttack(row, col);
    }

    return {attack};
}

const Robot = (myBoard, enemyBoard) => {

    const moveLegal = (row, col) => {

    }

    const randomeCol = () => {

    }

    const randomeRow = () => {

    }

    const attack = () => {
        
    }

    const aPlayer = Player(myBoard, enemyBoard);

    return {
        ...aPlayer,
        attack
    }
}

module.exports = {Player, Robot};