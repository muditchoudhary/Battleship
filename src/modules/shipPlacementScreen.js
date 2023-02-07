import AIRCRAFT from "../assets/imgs/aircraft-carrier.svg";
import BATTLESHIP from "../assets/imgs/battleship.svg";
import CRUISER from "../assets/imgs/cruiser.svg";
import DESTROYER from "../assets/imgs/destroyer.svg";
import SUBMARINE from "../assets/imgs/submarine.svg";

const ShipPlacementScreen = () => {
    const GRIDSIZE = 10;
    const TOTALSHIPS = 5;
    const shipsImgs = [AIRCRAFT, BATTLESHIP, CRUISER, DESTROYER, SUBMARINE];

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
