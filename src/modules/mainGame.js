const MainGame = (playerBoard, robotBoard) => {
    // Global Variables
    const GRIDSIZE = 10;

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
                    }
                    grid.classList.add("grid");
                } else {
                    grid.classList.add("grid");
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
        messageDisplayer.textContent = "Here I will display the message";
        messageDisplayer.classList.add("message-displayer");

        renderGrid(gameMainSubContainer, "player", playerBoard);
        renderGrid(gameMainSubContainer, "robot", robotBoard);
        gameMainSubContainer.classList.add("game-main-sub-container");
        gameMaincontainer.appendChild(gameMainSubContainer);
        gameMaincontainer.appendChild(messageDisplayer);
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
