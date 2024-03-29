import { $$, toggerMessage } from "../main.js";
import { publishMission } from "../rosModule/handleMission.js";
import requestTranslateMissionEnd from "./blockStep/requestTranslateMissionEnd.js";
import send from "../functionHandle/sendMission.js";

export default function sendMission() {
    $(".send-mission-btn").onclick = async (e) => {
        const data = await requestTranslateMissionEnd();
        const type = e.target.getAttribute("type");
        const nameRobot = $("#select-robot-option").value.replaceAll(" ", "");
        if (data.steps_mission !== null) {
            if (!nameRobot) {
                toggerMessage("error", "please choose robot");
            } else {
                const dataFullMission = translateDataMission(data);
                send({
                    nameRobot: nameRobot,
                    data: dataFullMission,
                    typeMission: type,
                });
            }
        } else {
            toggerMessage("error", "Current mission is empty");
        }
    };
}
export function translateDataMission(data) {
    const wake_up = data.wake_up ? data.wake_up : "";
    const stop = data.stop ? data.stop : "";
    const dataHeadMission = `${wake_up}${stop}`;
    const dataBodyMission = `${data.steps_mission}`;

    const dataFullMission = `[${dataHeadMission}*${dataBodyMission}]`;
    return dataFullMission;
}
