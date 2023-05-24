import { $$, toggerMessage } from "../main.js";
import { publishMission } from "../rosModule/handleMission.js";
import requestTranslateMissionEnd from "./blockStep/requestTranslateMissionEnd.js";

export default function sendMission() {
    $(".send-mission-btn").onclick = async (e) => {
        const data = await requestTranslateMissionEnd()
        const type = e.target.getAttribute("type");
        const nameRobot = $("#select-robot-option").value.replaceAll(" ", "");
        if (data.steps_mission !== null) {
            if (!nameRobot) {
                toggerMessage("error", "please choose robot");
            } else {
                const dataFullMission = translateDataMission(data);
                let topic;

                type === "normal" && (topic = `/${nameRobot}/mission_normal`);

                (type === "error-robot" || type === "error-gpio") &&
                    (topic = `/${nameRobot}/mission_error`);

                type === "battery" && (topic = `/${nameRobot}/mission_battery`);

                type === "gpio" && (topic = `/${nameRobot}/mission_normal`);

                console.log("Topic: ", topic);
                publishMission(topic, dataFullMission);
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
