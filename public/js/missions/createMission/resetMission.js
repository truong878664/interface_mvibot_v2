import { $, toggerMessage } from "../../main.js";
import publishTopicString from "../../rosModule/topicString.js";

export default function handleResetMission() {
    const resetMissionBtn = $(".reset-mission-btn");
    resetMissionBtn.onclick = (e) => {
        const type = e.target.dataset.type;
        const typeTranslate = type === "gpio" ? "normal" : type;
        const robotReset = $("#robot-reset")?.value;
        if (!robotReset) {
            toggerMessage("error", "Please choose robot to reset!");
            return;
        }
        
        publishTopicString(`/${robotReset}/mission_${typeTranslate}`, "");

        $("#reset-mission").checked = false;

        toggerMessage(
            "success",
            `Reset mission "${type.toUpperCase()}" for robot "${robotReset}" successfully!`
        );
    };
}