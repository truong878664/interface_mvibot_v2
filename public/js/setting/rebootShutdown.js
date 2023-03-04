import publishTopic from "../rosModule/topicString.js";
import { $, toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";
// import { $ } from "./setting.js";

// const robotSelect = $(".choose_robot.reboot-shutdown");

$("#shutdown-btn").onclick = () => {
    const robotSelect = robotActive();
    
    if (!robotSelect) {
        toggerMessage("error", "Please choose robot!");
    } else {
        publishTopic(`${robotSelect}/robot_shutdown`, "1");
    }
};

$("#reboot-btn").onclick = () => {
    const robotSelect = robotActive();

    if (!robotSelect) {
        toggerMessage("error", "Please choose robot!");
    } else {
        publishTopic(`${robotSelect}/robot_shutdown`, "2");
    }
};
