import publishTopic from "../rosModule/topicString.js";
import { $, toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";

export default function power() {
    const robotAction = (action) => {
        const robotSelect = robotActive();
        !robotSelect
            ? toggerMessage("error", "Please choose robot!")
            : publishTopic(`${robotSelect}/robot_shutdown`, action);
    };

    $("#shutdown-btn").onclick = () => robotAction("1");
    $("#reboot-btn").onclick = () => robotAction("2");
}
