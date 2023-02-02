import { toggerMessage } from "../main.js";
import { publishMission } from "../rosModule/handleMission.js";
import { currentMission } from "./handleStepMission.js";

export default function sendMission() {
    $(".send-mission-btn").onclick = () => {
        fetch(`/api/mi/${currentMission}`)
            .then((res) => res.json())

            .then((data) => {

                const nameRobot = $("#select-robot-option").value;
                if (nameRobot == "Choose Robot") {
                    toggerMessage("error", "please choose robot");
                } else {
                    const dataBodyMission = `${data.steps_mission}`;
                    // console.log(data.steps_mission)
                    publishMission(nameRobot, dataBodyMission);
                    toggerMessage("success", "send data to robot successfully");
                }
            });
    };
}
