import publishTopic from "../rosModule/topicString.js";
import { $, toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";

// const robotSelect = $(".choose_robot.reboot-shutdown");
const robotSelect = robotActive();



$("#shutdown-btn").onclick = () => {
    if (!robotSelect) {
        toggerMessage('error', 'Please choose robot!')
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
