import { $$, toggerMessage } from "../main.js";
import { publishMission } from "../rosModule/handleMission.js";
import { currentMission } from "./handleStepMission.js";

export default function sendMission() {
    $(".send-mission-btn").onclick = (e) => {
        fetch(`/api/mi/${currentMission}`)
            .then((res) => res.json())

            .then((data) => {
                const type = e.target.getAttribute("type");

                const nameRobot = $("#select-robot-option").value.replaceAll(
                    " ",
                    ""
                );
                if (data.steps_mission !== null) {
                    if (!nameRobot) {
                        toggerMessage("error", "please choose robot");
                    } else {
                        const wake_up = data.wake_up ? data.wake_up : "";
                        const stop = data.stop ? data.stop : "";
                        const dataHeadMission = `${wake_up}${stop}`;
                        const dataBodyMission = `${data.steps_mission}`;

                        const dataFullMission = `[${dataHeadMission}*${dataBodyMission}]`;

                        let topic;

                        type === "normal" &&
                            (topic = `/${nameRobot}/data_coordinates`);

                        type === "error" &&
                            (topic = `/${nameRobot}/mission_error`);

                        type === "battery" &&
                            (topic = `/${nameRobot}/mission_battery`);

                        type === "gpio" &&
                            (topic = `/${nameRobot}/mission_gpio`);

                        console.log("Topic: ", topic);
                        publishMission(topic, dataFullMission);
                    }
                } else {
                    toggerMessage(
                        "error",
                        "Currently no data please reload the page and try again"
                    );
                }
            });
    };
}
