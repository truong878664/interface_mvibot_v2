import publishTopic from "../rosModule/topicString.js";
import { $, toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";
import confirmationForm from "../functionHandle/confirmationForm.js";

export default function power() {
    
    $("#shutdown-btn").onclick = () =>  confirmationForm({message: 'Do you want to shutdown Robot?', callback: shutdown});
    $("#reboot-btn").onclick = () => confirmationForm({message: 'Do you want to reboot Robot?', callback: reboot});
    
    function shutdown() {
        robotAction("1")
    }
    function reboot() {
        robotAction("2")
    }
    const robotAction = (action) => {
        const robotSelect = robotActive();
        !robotSelect
            ? toggerMessage("error", "Please choose robot!")
            : publishTopic(`${robotSelect}/robot_shutdown`, action);
    };

}
