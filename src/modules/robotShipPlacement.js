const ship = require("./ship");

const RobotShipPlacement = (board) => {
    // Global Variables
    const PLAYERSHIPS = [];
    let currentShip = 0;
    const myBoard = board;
    const FIXEDROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const FIXEDCOLS = {
        airCraft: [0, 1, 2, 3, 4, 5],
        battleship: [0, 1, 2, 3, 4, 5],
        cruiser: [0, 1, 2, 3, 4, 5, 6],
        destroyer: [0, 1, 2, 3, 4, 5, 6, 7],
        submarine: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };
    const TOTALSHIPS = 5;

    const randomPlacementCoordinates = (whichShip) => {
        let coordinates = String(FIXEDROWS[Math.floor(Math.random() * FIXEDROWS.length)]);
        const idx = FIXEDROWS.indexOf(Number(coordinates));
        FIXEDROWS.splice(idx, 1);
        if (whichShip === 0) {
            coordinates += String(
                FIXEDCOLS.airCraft[Math.floor(Math.random() * FIXEDCOLS.airCraft.length)]
            );
        } else if (whichShip === 1) {
            coordinates += String(
                FIXEDCOLS.battleship[Math.floor(Math.random() * FIXEDCOLS.battleship.length)]
            );
        } else if (whichShip === 2) {
            coordinates += String(
                FIXEDCOLS.cruiser[Math.floor(Math.random() * FIXEDCOLS.cruiser.length)]
            );
        } else if (whichShip === 3) {
            coordinates += String(
                FIXEDCOLS.destroyer[Math.floor(Math.random() * FIXEDCOLS.destroyer.length)]
            );
        } else if (whichShip === 4) {
            coordinates += String(
                FIXEDCOLS.submarine[Math.floor(Math.random() * FIXEDCOLS.submarine.length)]
            );
        }

        return coordinates;
    };

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
                const coordinates = randomPlacementCoordinates(i);
                const row = Number(coordinates[0]);
                const col = Number(coordinates[1]);
                myBoard.placeShip(PLAYERSHIPS[currentShip], row, col);
                currentShip += 1;
                console.log(myBoard.board);
            }
        }
    };

    return { placeShips };
};

export default RobotShipPlacement;
