const ship = require("./ship");

const RobotShipPlacement = (board) => {
    // Global Variables
    const PLAYERSHIPS = [];
    let currentShip = 0;
    const myBoard = board;
    const FIXEDROWS = [0, 3, 7, 9, 2];
    const FIXEDCOLS = [0, 3, 3, 4, 1];
    const TOTALSHIPS = 5;

    const initalizeShips = () => {
        const AIRCRAFTLEN = 6;
        const BATTLESHIPLEN = 5;
        const CRUISERLEN = 4;
        const DESTROYERLEN = 3;
        const SUBMARINELEN = 2;

        const airCraft = ship(AIRCRAFTLEN);
        const battleship = ship(BATTLESHIPLEN);
        const cruiser = ship(CRUISERLEN);
        const destroyer = ship(DESTROYERLEN);
        const submarine = ship(SUBMARINELEN);

        PLAYERSHIPS.push(airCraft);
        PLAYERSHIPS.push(battleship);
        PLAYERSHIPS.push(cruiser);
        PLAYERSHIPS.push(destroyer);
        PLAYERSHIPS.push(submarine);
    };

    const placeShips = () => {
        initalizeShips();
        for (let i = 0; i < TOTALSHIPS; i += 1) {
            if (currentShip < 5) {
                const row = FIXEDROWS[currentShip];
                const col = FIXEDCOLS[currentShip];
                myBoard.placeShip(PLAYERSHIPS[currentShip], row, col);
                currentShip += 1;
                console.log(myBoard.board);
            }
        }
    };

    return { placeShips };
};

export default RobotShipPlacement;
