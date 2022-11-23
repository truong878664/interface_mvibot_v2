import { $ } from "../main.js";

const missionCreateBtn = $(".create-missions-btn");
const mission = $("#name-mission");

missionCreateBtn.addEventListener("click", () => {
    setTimeout(() => {
        mission.focus();
    }, 1);
});
