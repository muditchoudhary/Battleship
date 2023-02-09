const Menu = () => {
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

    const createGameHeaading = (parent) => {
        const h1 = document.createElement("h1");
        h1.textContent = "Battleship";
        h1.classList.add("heading");

        parent.appendChild(h1);
    };

    const createNameField = (parent) => {
        const box = document.createElement("div");
        const inputFiledBox = document.createElement("div");

        const formGroupField = document.createElement("div");
        formGroupField.classList.add("form__group", "field");

        const nameInput = document.createElement("input");
        nameInput.classList.add("form__field");
        nameInput.placeholder = "Name";
        nameInput.name = "name";
        nameInput.id = "name";
        nameInput.required = true;
        const nameLabel = document.createElement("label");
        nameLabel.for = "name";
        nameLabel.classList.add("form__label");
        nameLabel.textContent = "Name";
        formGroupField.append(nameInput, nameLabel);

        const playBtn = document.createElement("a");
        playBtn.textContent = "Play";
        for (let i = 0; i < 4; i += 1) {
            playBtn.append(document.createElement("span"));
        }
        playBtn.classList.add("button");
        playBtn.style.setProperty("--color", "#6eff3e");

        box.classList.add("box");
        inputFiledBox.classList.add("input-box");

        inputFiledBox.append(formGroupField, playBtn);
        box.append(inputFiledBox);
        parent.appendChild(box);
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

    return { createBackgroundVideo, createGameHeaading, createNameField, createBackgroundAudio };
};

export default Menu;
