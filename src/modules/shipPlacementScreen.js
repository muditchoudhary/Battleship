import AIRCRAFT from "../assets/imgs/aircraft-carrier.svg";
import BATTLESHIP from "../assets/imgs/battleship.svg";
import CRUISER from "../assets/imgs/cruiser.svg";
import DESTROYER from "../assets/imgs/destroyer.svg";
import SUBMARINE from "../assets/imgs/submarine.svg";

const ship = require("./ship");
const board = require("./gameBoard");

const ShipPlacementScreen = () => {
    const GRIDSIZE = 10;
    const TOTALSHIPS = 5;
    const shipsImgs = [AIRCRAFT, BATTLESHIP, CRUISER, DESTROYER, SUBMARINE];
    const PLAYERSHIPS = [];
    const LASTGRIDPOS = 9;
    let currentShip = 0;
    let plyerBoard;

    const isGridPosValid = (targetGrid) => {
        const pos = targetGrid.getAttribute("data-pos")[1];
        const row = Number(targetGrid.getAttribute("data-pos")[0]);
        const col = Number(targetGrid.getAttribute("data-pos")[1]);
        let relatedGrids = plyerBoard.board[row];
        const currentShipLen = PLAYERSHIPS[currentShip].length;
        relatedGrids = relatedGrids.slice(col, currentShipLen + col);

        if (LASTGRIDPOS - Number(pos) + 1 >= currentShipLen && !relatedGrids.includes(1))
            return true;
        return false;
    };

    const getRelatedGrids = (targetGrid) => {
        const allGrids = [targetGrid];
        if (isGridPosValid(targetGrid)) {
            let n = PLAYERSHIPS[currentShip].length;
            let pos = targetGrid.getAttribute("data-pos"); // eg: "00"
            while (n - 1 > 0) {
                if (pos[0] === "0") {
                    pos = Number(pos); // eg: 0
                    pos += 1; // eg: 1
                    pos = `0${pos}`; // eg: "01"
                } else {
                    pos = Number(pos); // eg: 11
                    pos += 1; // eg: 12
                    pos = String(pos);
                }
                allGrids.push(document.querySelector(`[data-pos="${pos}"]`));
                n--;
            }
            return allGrids;
        }
        return "gridNotValid";
    };

    const placeShipOnGrid = (event) => {
        if (currentShip < 5) {
            const targetGrid = event.target;
            if (isGridPosValid(targetGrid)) {
                const allGrids = getRelatedGrids(targetGrid);
                const row = Number(targetGrid.getAttribute("data-pos")[0]);
                const col = Number(targetGrid.getAttribute("data-pos")[1]);
                plyerBoard.placeShip(PLAYERSHIPS[currentShip], row, col);
                for (const grid of allGrids) {
                    grid.classList.add("ship-placed-on-grid");
                }
                currentShip += 1;
                console.log(plyerBoard.board);
            }
        }
    };

    const placementMouseHoverExit = (event) => {
        if (currentShip < 5) {
            const targetGrid = event.target;
            const allGrids = getRelatedGrids(event.target);
            if (allGrids === "gridNotValid") {
                targetGrid.classList.remove("grid-not-valid");
            } else {
                for (const grid of allGrids) {
                    grid.classList.remove("grid-hover");
                }
            }
        }
    };
    const placementMouseHover = (event) => {
        if (currentShip < 5) {
            const targetGrid = event.target;
            const allGrids = getRelatedGrids(event.target);
            if (allGrids === "gridNotValid") {
                targetGrid.classList.add("grid-not-valid");
            } else {
                for (const grid of allGrids) {
                    grid.classList.add("grid-hover");
                }
            }
        }
    };

    const initializePlayerGrid = () => {
        plyerBoard = board();
    };

    const initializePlayerShips = () => {
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

    const createBackgroundVideo = (parent, src) => {
        const bgVideo = document.createElement("video");
        bgVideo.src = src;
        bgVideo.controls = false;
        bgVideo.autoplay = true;
        bgVideo.muted = true;
        bgVideo.loop = true;
        bgVideo.classList.add("bg-video");
        parent.appendChild(bgVideo);
    };

    const createGrid = (parent) => {
        const container = document.createElement("div");
        for (let i = 0; i < GRIDSIZE; i++) {
            const row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < GRIDSIZE; j++) {
                const grid = document.createElement("div");
                grid.setAttribute("data-pos", String(i) + String(j));
                grid.addEventListener("mouseover", placementMouseHover);
                grid.addEventListener("mouseleave", placementMouseHoverExit);
                grid.addEventListener("click", placeShipOnGrid);
                grid.classList.add("grid");
                row.appendChild(grid);
            }
            container.appendChild(row);
        }
        container.classList.add("container");
        parent.appendChild(container);
    };

    const createShipSelector = (parent) => {
        const container = document.createElement("div");
        container.classList.add("ship-table");
        for (let i = 0; i < TOTALSHIPS; i++) {
            const row = document.createElement("img");
            row.classList.add("ship-talbe-row");
            row.src = shipsImgs[i];
            container.appendChild(row);
        }
        parent.appendChild(container);
    };

    const createScreen = (parent, src) => {
        initializePlayerShips();
        initializePlayerGrid();
        const container = document.createElement("div");
        container.classList.add("main-container");
        createBackgroundVideo(container, src);
        createGrid(container);
        createShipSelector(container);
        parent.appendChild(container);
    };

    return { createScreen };
};

export default ShipPlacementScreen;