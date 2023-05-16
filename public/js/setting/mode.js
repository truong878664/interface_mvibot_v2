import confirmationForm from "../functionHandle/confirmationForm.js";
import { $, $$ } from "../main.js";
import { robotActive } from "../mainLayout.js";
import publishTopicString from "../rosModule/topicString.js";

export default function mode() {
    // $(".send-mode-btn").onclick = () => {
    //     const robot = robotActive();
    //     const valueMode = $("[name=mode-value]:checked").value;
    //     confirmationForm({
    //         message: `Do you want to set mode ${valueMode} for robot ${robot} ?`,
    //         callback: () => sendMode(robot, valueMode),
    //     });
    // }

    // function sendMode(robot, valueMode) {
    //     publishTopicString(`/${robot}/set_config`, `(mode|${valueMode})`);
    // }
}
