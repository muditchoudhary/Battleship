const board = require('../modules/gameBoard');
const ship = require('../modules/ship');

test("placeShip(battleship, 3, 0) should place battle ship at row 3 & col 0", () => {
    const battleship = ship(6);
    const myBoard = board();

    myBoard.placeShip(battleship, 3, 0);

    let boardArr = myBoard.board;

    expect(boardArr[3]).toStrictEqual([1, 1, 1, 1, 1, 1, 0, 0, 0, 0])
})

test("placeShip(battleship, 12, 0) should throw Row must be less than 10", () => {
    const battleship = ship(6);
    const myBoard = board();

    expect(() => {myBoard.placeShip(battleship, 12, 0)}).toThrow("Row must be less than 10");
})


test("placeShip(battleship, 5, 10) should throw Col must be less than 10", () => {
    const battleship = ship(6);
    const myBoard = board();

    expect(() => {myBoard.placeShip(battleship, 5, 10)}).toThrow("Col must be less than 10");
})

test("placeShip(battleship, 5, 5) should throw Choose coordinates where total blocks equal or greater than ship's length", () => {
    const battleship = ship(6);
    const myBoard = board();

    expect(() => {myBoard.placeShip(battleship, 5, 5)}).toThrow("Choose coordinates where total blocks equal or greater than ship's length");
})

test("placeShip(battleship, 6, 4) should throw Choose coordinates where a ship should not be placed already", () => {
    const submarine = ship(3);
    const battleship = ship(6);
    const myBoard = board();
    myBoard.placeShip(submarine, 6, 2);

    expect(() => {myBoard.placeShip(battleship, 6, 4)}).toThrow("Choose coordinates where a ship should not be placed already");
})