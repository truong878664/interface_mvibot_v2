import { $ } from "../../main.js";
import handleResetMission from "./resetMission.js";
import sendMultiMission from "./sendMultiMission.js";
import selectMission from "./selectMission.js";
import handleCloneMission from "./cloneMission.js";
import handleDeleteMultiMission from "./deleteMultiMission.js";
import handleDeleteMission from "./deleteMission.js";
import handleEditNameMission from "./editMission.js";

const missionCreateBtn = $(".create-missions-btn");
const mission = $("#name-mission");

handleEditNameMission();
handleDeleteMission();
handleDeleteMultiMission();
handleCloneMission();
handleResetMission();
selectMission();
sendMultiMission();

missionCreateBtn?.addEventListener("click", () =>
    requestAnimationFrame(() => mission.focus()),
);
