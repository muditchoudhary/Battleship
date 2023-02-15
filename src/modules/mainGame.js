const MainGame = (playerBoard, robotBoard, Player, Robot) => {
    // Global Variables
    const GRIDSIZE = 10;
    const robotShipObjs = robotBoard.ships;
    const playerShipObjs = playerBoard.ships;

    const resetGame = () => {
        window.location.reload();
    };

    const createResetButton = (parent) => {
        const playBtn = document.createElement("a");
        playBtn.textContent = "Reset";
        for (let i = 0; i < 4; i += 1) {
            playBtn.append(document.createElement("span"));
        }
        playBtn.classList.add("button", "button-three");
        playBtn.addEventListener("click", resetGame);
        playBtn.style.setProperty("--color", "#6eff3e");
        parent.appendChild(playBtn);
    };

    const checkAnyShipSunk = (ships, gameBoard) => {
        let response;
        let loopBreak = false;
        for (let i = 0; i < ships.length; i += 1) {
            if (ships[i].isSunk()) {
                response = { ship: ships[i], index: i };
                loopBreak = true;
                break;
            }
        }

        if (loopBreak) {
            const { ship } = response;
            const { index } = response;
            const { row } = ship;
            const col = ship.colStart;
            const { colEnd } = ship;
            const boardRow = gameBoard.board[row];
            for (let j = col; j <= colEnd; j += 1) {
                boardRow[j] = 4;
            }
            ships.splice(index, 1);
        }
    };

    const displayWinner = (winnerName) => {
        const messageDisplayer = document.querySelector(".message-displayer");
        messageDisplayer.textContent = `Game Over!! Captain ${winnerName} has won!!`;
    };
    const removeAllEventsFromGridCells = () => {
        const containers = document.querySelectorAll(".container");
        const secondContainer = containers[1];
        for (let i = 0; i < GRIDSIZE; i += 1) {
            for (let j = 0; j < GRIDSIZE; j += 1) {
                const pos = String(i) + String(j);
                const grid = secondContainer.querySelector(`[data-pos="${pos}"]`);
                grid.classList.add("grid", "game-over");
                grid.removeEventListener("click", attackByRobot);
                grid.removeEventListener("mouseover", preAttackHover);
                grid.removeEventListener("mouseleave", preAttackHoverExit);
            }
        }
    };

    const gameOver = (haveShipsSunk, WhichPlayer) => {
        if (haveShipsSunk) {
            removeAllEventsFromGridCells();
            displayWinner(WhichPlayer.name);
        }
    };
    const checkPlayerAnyShipSunk = () => {
        checkAnyShipSunk(playerShipObjs, playerBoard);
    };
    const checkRobotAnyShipSunk = () => {
        checkAnyShipSunk(robotShipObjs, robotBoard);
    };

    const preAttackHoverExit = (event) => {
        const targetGrid = event.target;
        targetGrid.classList.remove("pre-attack-hover");
    };
    const preAttackHover = (event) => {
        const targetGrid = event.target;
        targetGrid.classList.add("pre-attack-hover");
    };
    const clearParent = (parent) => {
        parent.replaceChildren();
    };

    const attackByRobot = (event) => {
        const row = Number(event.target.getAttribute("data-pos")[0]);
        const col = Number(event.target.getAttribute("data-pos")[1]);
        const parent = document.querySelector(".game-main-sub-container");
        Player.attack(row, col);
        Robot.attack();
        checkPlayerAnyShipSunk();
        checkRobotAnyShipSunk();
        clearParent(parent);
        renderGrid(parent, "player", playerBoard);
        renderGrid(parent, "robot", robotBoard);
        gameOver(playerBoard.haveShipsSunk(), Robot);
        gameOver(robotBoard.haveShipsSunk(), Player);
    };

    const renderGrid = (parent, whoseBoard, board) => {
        const heading = document.createElement("h2");
        heading.textContent = whoseBoard === "player" ? "Friendly Waters" : "Enemy Waters";
        heading.classList.add("board-heading");
        const upperContainer = document.createElement("div");
        upperContainer.classList.add("upper-container");
        const container = document.createElement("div");
        const boardArr = board.board;
        for (let i = 0; i < GRIDSIZE; i += 1) {
            const row = document.createElement("div");
            row.classList.add("row");
            for (let j = 0; j < GRIDSIZE; j += 1) {
                const grid = document.createElement("div");
                if (whoseBoard === "player") {
                    if (boardArr[i][j] === 1) {
                        grid.classList.add("grid", "ship-placed-on-grid");
                    } else if (boardArr[i][j] === 2) {
                        grid.classList.add("grid", "attack-miss");
                    } else if (boardArr[i][j] === 3) {
                        grid.classList.add("grid", "attack-hit");
                    } else if (boardArr[i][j] === 4) {
                        grid.classList.add("grid", "ship-has-sunk");
                    }
                    grid.classList.add("grid");
                } else if (whoseBoard === "robot") {
                    grid.addEventListener("click", attackByRobot);
                    grid.addEventListener("mouseover", preAttackHover);
                    grid.addEventListener("mouseleave", preAttackHoverExit);
                    if (boardArr[i][j] === 2) {
                        grid.classList.add("grid", "attack-miss");
                        grid.removeEventListener("click", attackByRobot);
                        grid.removeEventListener("mouseover", preAttackHover);
                        grid.removeEventListener("mouseleave", preAttackHoverExit);
                    } else if (boardArr[i][j] === 3) {
                        grid.classList.add("grid", "attack-hit");
                        grid.removeEventListener("click", attackByRobot);
                        grid.removeEventListener("mouseover", preAttackHover);
                        grid.removeEventListener("mouseleave", preAttackHoverExit);
                    } else if (boardArr[i][j] === 4) {
                        grid.classList.add("grid", "ship-has-sunk");
                        grid.removeEventListener("click", attackByRobot);
                        grid.removeEventListener("mouseover", preAttackHover);
                        grid.removeEventListener("mouseleave", preAttackHoverExit);
                    }
                    grid.classList.add("grid", "grid-pointer");
                }
                grid.setAttribute("data-pos", String(i) + String(j));
                row.appendChild(grid);
            }
            container.appendChild(row);
        }
        container.classList.add("container");
        upperContainer.appendChild(heading);
        upperContainer.appendChild(container);
        parent.appendChild(upperContainer);
    };

    const createScreen = (parent) => {
        const gameMaincontainer = document.createElement("div");
        gameMaincontainer.classList.add("game-main-container");
        const gameMainSubContainer = document.createElement("div");
        const messageDisplayer = document.createElement("div");
        messageDisplayer.classList.add("message-displayer");
        renderGrid(gameMainSubContainer, "player", playerBoard);
        renderGrid(gameMainSubContainer, "robot", robotBoard);
        gameMainSubContainer.classList.add("game-main-sub-container");
        gameMaincontainer.appendChild(gameMainSubContainer);
        gameMaincontainer.appendChild(messageDisplayer);
        createResetButton(gameMaincontainer);
        parent.appendChild(gameMaincontainer);
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

    const createBackgroundAudio = (parent, src, volume) => {
        const bgAudio = document.createElement("audio");
        bgAudio.src = src;
        bgAudio.controls = false;
        bgAudio.autoplay = true;
        bgAudio.loop = true;
        bgAudio.volume = volume;
        parent.appendChild(bgAudio);
    };

    return { createBackgroundAudio, createBackgroundVideo, createScreen };
};

export default MainGame;
