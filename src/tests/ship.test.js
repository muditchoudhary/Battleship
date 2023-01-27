const ship = require('../modules/ship');

test("hit() method is called", () => {
    const mockHit = jest.fn();
    const myShip = ship();
    myShip.hit = mockHit;
    myShip.hit();
    expect(mockHit).toHaveBeenCalled();
})

test("isSunk() returns true, when ship sunk", () => {
    const myShip = ship(3);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBeTruthy();

})

test("isSunk() returns false, when ship not sunk", () => {
    const myShip = ship(3);
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBeFalsy();
})

test("setShipCoordinates(3, 0, 6) should set ship coordinates", () => {
    const battleship = ship(6);
    battleship.setShipCoordinates(3, 0, battleship.length);
    expect(battleship.row).toBe(3);
    expect(battleship.colStart).toBe(0);
    expect(battleship.colEnd).toBe(5);
})