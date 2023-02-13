import mainMenu from "./mainMenu";
import ShipPlacementScreen from "./shipPlacementScreen";
import MainGame from "./mainGame";
import RobotShipPlacement from "./robotShipPlacement";
import BGVIDEO from "../assets/ocean-waves.mp4";
import BGMUSIC from "../assets/music/naval-battle-music.mp3";
import BGOCEAN from "../assets/music/sea_waves.mp3";
import "../styles/menu.css";
import "../styles/shipPlacement.css";
import "../styles/mainGame.css";

const player = require("./player");
const board = require("./gameBoard");

const DOM = () => {
    const BODY = document.querySelector("body");
    const playerBoard = board();
    const enemyBoard = board();
    const playerObj = player.Player(playerBoard, enemyBoard);
    const robotObj = player.Robot(enemyBoard, playerBoard);

    const initializeMainGameScreen = () => {
        const robotShipPlacement = RobotShipPlacement(enemyBoard);
        const mainGame = MainGame(playerBoard, enemyBoard, playerObj, robotObj);
        mainGame.createBackgroundAudio(BODY, BGOCEAN, 0.8);
        mainGame.createBackgroundVideo(BODY, BGVIDEO);
        robotShipPlacement.placeShips();
        mainGame.createScreen(BODY);
    };

    /**
     * Removes all the child nodes from the
     * parent Dom element.
     * @param {DOM element} parent
     */
    const clearParent = (parent) => {
        parent.replaceChildren();
    };

    const isInputFiledValid = () => {
        let inputFieldValue = document.querySelector("#name").value;
        inputFieldValue = inputFieldValue.trim();

        if (inputFieldValue !== "") {
            return true;
        }
        return false;
    };

    const switchToMaingame = (haveShipsPlaced) => {
        if (haveShipsPlaced) {
            clearParent(BODY);
            initializeMainGameScreen();
        } else {
            alert("Please place ships!!");
        }
    };

    const initalizeShipPlacementScreen = () => {
        const shipScreen = ShipPlacementScreen(playerBoard, switchToMaingame);
        shipScreen.createScreen(BODY, BGVIDEO);
        shipScreen.createBackgroundAudio(BODY, BGOCEAN, 0.8);
    };

    const switchToShipSelectionScreen = () => {
        if (isInputFiledValid()) {
            playerObj.name = document.querySelector("#name").value;
            clearParent(BODY);
            initalizeShipPlacementScreen();
        } else {
            alert("Please enter a name!!");
        }
    };

    const initalizeMainMenu = () => {
        const menu = mainMenu();
        menu.createBackgroundVideo(BODY, BGVIDEO);
        menu.createGameHeaading(BODY);
        menu.createNameField(BODY, switchToShipSelectionScreen);
        menu.createBackgroundAudio(BODY, BGMUSIC, 0.3);
        menu.createBackgroundAudio(BODY, BGOCEAN, 0.6);
    };

    return { initalizeMainMenu };
};

export default DOM;
