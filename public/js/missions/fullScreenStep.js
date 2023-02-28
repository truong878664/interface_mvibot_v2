import { $ } from "../main.js";
const stepBlockWrapper = $(".step-block-wrapper");

let isFullscreen = localStorage.getItem("isFullscreen") || false;
JSON.parse(isFullscreen)
    ? stepBlockWrapper.classList.add("full-screen")
    : stepBlockWrapper.classList.remove("full-screen");

$(".full-screen-step-btn").onclick = (e) => {
    e.target.classList.toggle("is-full");
    isFullscreen = !JSON.parse(isFullscreen);
    JSON.parse(isFullscreen)
        ? stepBlockWrapper.classList.add("full-screen")
        : stepBlockWrapper.classList.remove("full-screen");
    localStorage.setItem("isFullscreen", isFullscreen);
};
