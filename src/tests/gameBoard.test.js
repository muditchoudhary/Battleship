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

test("recieveAttack(1, 3) should attack the Battleship ship", () => {
    const airCraft = ship(7);
    const battleship = ship(6);
    const cruiser = ship(5);
    const submarine = ship(4);
    const destroyer = ship(3);

    const myBoard = board();
    // Placing the ships
    myBoard.placeShip(airCraft, 0, 2);
    myBoard.placeShip(battleship, 1, 0);
    myBoard.placeShip(cruiser, 3, 2);
    myBoard.placeShip(submarine, 9, 2);
    myBoard.placeShip(destroyer, 5, 1);

    myBoard.recieveAttack(1, 3);

    expect(myBoard.board[1][3]).toBe(3);
    expect(battleship.hitCount).toBe(1);
})

test("recieveAttack(1, 6) should miss the attack on Battleship Ship", () => {
    const airCraft = ship(7);
    const battleship = ship(6);
    const cruiser = ship(5);
    const submarine = ship(4);
    const destroyer = ship(3);

    const myBoard = board();
    // Placing the ships
    myBoard.placeShip(airCraft, 0, 2);
    myBoard.placeShip(battleship, 1, 0);
    myBoard.placeShip(cruiser, 3, 2);
    myBoard.placeShip(submarine, 9, 2);
    myBoard.placeShip(destroyer, 5, 1);

    myBoard.recieveAttack(1, 6);

    expect(myBoard.board[1][6]).toBe(2);
    expect(battleship.hitCount).toBe(0);
})

test("haveShipsSunk() should return true when all ships have been sunk", () => {
    const airCraft = ship(7);
    const battleship = ship(6);
    const cruiser = ship(5);
    const submarine = ship(4);
    const destroyer = ship(3);

    const myBoard = board();

    // Placing the ships
    myBoard.placeShip(airCraft, 0, 2);
    myBoard.placeShip(battleship, 1, 0);
    myBoard.placeShip(cruiser, 3, 2);
    myBoard.placeShip(submarine, 9, 2);
    myBoard.placeShip(destroyer, 5, 1);

    // Changing ships sunk value to true for testing
    airCraft.sunk = true;
    battleship.sunk = true;
    cruiser.sunk = true;
    submarine.sunk = true;
    destroyer.sunk = true;

    expect(myBoard.haveShipsSunk()).toBeTruthy();

})