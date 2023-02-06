import mainMenu from "./mainMenu";
import BGVIDEO from "../assets/ocean-waves.mp4";
import BGMUSIC from "../assets/music/naval-battle-music.mp3";
import BGOCEAN from "../assets/music/sea_waves.mp3";
import "../styles/menu.css";

const DOM = () => {
    const BODY = document.querySelector("body");

    const initalizeUI = () => {
        const menu = mainMenu();
        menu.createBackgroundVideo(BODY, BGVIDEO);
        menu.createGameHeaading(BODY);
        menu.createNameField(BODY);
        menu.createBackgroundAudio(BODY, BGMUSIC, 0.3);
        menu.createBackgroundAudio(BODY, BGOCEAN, 0.5);
    };

    return { initalizeUI };
};

export default DOM;
