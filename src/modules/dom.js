import mainMenu from "./mainMenu";
import BGVIDEO from "../assets/ocean-waves.mp4";
import "../styles/menu.css";

const DOM = () => {
    const BODY = document.querySelector("body");

    const initalizeUI = () => {
        const menu = mainMenu();
        menu.createBackgroundVideo(BODY, BGVIDEO);
        menu.createGameHeaading(BODY);
        menu.createNameField(BODY);
    };

    return { initalizeUI };
};

export default DOM;
