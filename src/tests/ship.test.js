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