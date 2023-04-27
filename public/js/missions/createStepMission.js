import sendMission from "./sendMission.js";
import handleCreateFunction from "./handleCreateFunction.js";
import createGpio from "./function/gpio/createGpio.js";
import createGpioModule from "./function/gpio/createGpioModule.js";
import createFootprint from "./function/footprint/createFootprint.js";
import gpio from "./function/gpio/gpio.js";
import footprint from "./function/footprint/footprint.js";
import marker from "./function/marker/marker.js";
import position from "./function/position/position.js";
import sleep from "./function/sleep/sleep.js";
import sound from "./function/sound/sound.js";
import variable from "./function/variable/variable.js";
import wakeUp from "./wakeUpStop/wakeUp.js";
import stop from "./wakeUpStop/stop.js";
import { handleShowWakeUpStop } from "./wakeUpStop/activeModule.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function start() {
    nextTabFunction();
    sendMission();

    handleCreateFunction();
    gpio();
    footprint();
    marker();
    position();
    sleep();
    sound();
    variable();
    
    handleShowWakeUpStop();
    wakeUp();
    stop();
}
start();

function nextTabFunction() {
    $(".type-mission-btn-wrapper").onclick = (e) => {
        const typeMissionBtn = e.target.closest(".type-mission-btn");
        if (!typeMissionBtn) return;
        $(".type-mission-btn.active").classList.remove("active");
        typeMissionBtn.classList.add("active");
        $(".type-mission-tab:not(.hidden)")?.classList.add("hidden");
        $$(".type-mission-tab")[typeMissionBtn.dataset.index].classList.remove(
            "hidden"
        );
    };

    $(".function-mission-btn-wrapper").onclick = (e) => {
        const functionMissionBtn = e.target.closest(".function-mission-btn");
        if (!functionMissionBtn) return;
        $(".function-mission-btn.active")?.classList.remove("active");
        functionMissionBtn.classList.add("active");
        $(".function-list-item:not(.hidden)")?.classList.add("hidden");
        $$(".function-list-item")[
            functionMissionBtn.dataset.index
        ].classList.remove("hidden");
    };
}
