const player = require("../modules/player");
const board = require("../modules/gameBoard");

/* global test, expect */

test("attack(3, 0) should change the given coordinate cell's value to 2", () => {
    const playerBoard = board();
    const enemyBoard = board();
    const playerOne = player.Player(playerBoard, enemyBoard);

    playerOne.attack(3, 0);

    const boardArr = enemyBoard.board;

    expect(boardArr[3][0]).toStrictEqual(2);
});
