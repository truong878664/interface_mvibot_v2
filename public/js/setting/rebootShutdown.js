import publishTopic from "../rosModule/topicString.js";
import { $, toggerMessage } from "../main.js";

const robotSelect = $(".choose_robot.reboot-shutdown");

$("#shutdown-btn").onclick = () => {
    if (robotSelect.value === "") {
        robotSelect.style.borderColor = "#DC0000";
    } else {
        publishTopic(`${robotSelect.value}/robot_shutdown`, "1");
        toggerMessage("success", `Shutdown success`);
    }
    setTimeout(() => {
        robotSelect.style.borderColor = "transparent";
    }, 2000);
};

$("#reboot-btn").onclick = () => {
    if (robotSelect.value === "") {
        robotSelect.style.borderColor = "#DC0000";
    } else {
        publishTopic(`${robotSelect.value}/robot_shutdown`, "2");
        toggerMessage("success", `Reboot success`);
    }
    setTimeout(() => {
        robotSelect.style.borderColor = "transparent";
    }, 2000);
};
