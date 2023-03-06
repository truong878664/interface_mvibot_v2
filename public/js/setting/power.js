import publishTopic from "../rosModule/topicString.js";
import { $, toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";

export default function power() {
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
}

