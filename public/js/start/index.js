import configStart from "./config.js";
import getMultiMission from "../missions/createMission/getMultiMission.js";
import toMissionRobot from "./toMissionRobot.js";
import { toggerMessage } from "../main.js";
import amclSet from "../rosModule/amclSet.js";
import { publishMission } from "../rosModule/handleMission.js";
import confirmationForm from "../functionHandle/confirmationForm.js";

configStart();

const startBtn = document.querySelector("[data-name='start']");
const robotActive = document.querySelector("#robot-navigation");

startBtn.onclick = () => {
    confirmationForm({
        message: "Do you want to start robot?",
        callback: handleStart,
    });
};

async function handleStart() {
    try {
        const isWithToollift = JSON.parse(
            document.querySelector("[name='toollift']:checked").dataset.toollift
        );
        const nameRobot = robotActive.value;
        if (!nameRobot) {
            toggerMessage("error", "Choose robot please!");
            return;
        }
        const res = await fetch("/api/start/get-detail-start");
        const dataStart = await res.json();
        if (!dataStart.error) {
            const data = dataStart.data;
            const positionInit = isWithToollift
                ? data.positionWithToollift
                : data.positionNoToollift;
            console.log(isWithToollift);
            amclSet(
                nameRobot,
                positionInit.x,
                positionInit.y,
                positionInit.z,
                positionInit.w
            );

            const missions = [];

            if (!isWithToollift) {
                const missionGoToToolliftRobot = toMissionRobot(
                    data.missionGotoToollift
                );
                missions.push(missionGoToToolliftRobot);
            }

            data.dataMissionSendToRobot.map((missionItem) => {
                missions.push(toMissionRobot(missionItem));
                return missions;
            });

            const topic = `/${nameRobot}/mission_normal`;
            publishMission(topic, missions.join(""));
        } else {
            toggerMessage("error", dataStart.message);
        }
    } catch (error) {
        toggerMessage("error", "ERROR!" + error);
    }
}
