import publishTopic from "../rosModule/topicString.js";
import { $, toggerMessage } from "../main.js";

const robotSelect = $(".choose_robot.public-topic");
const publicInput = $("#public-data");

$("#public-btn").onclick = () => {
    if (robotSelect.value === "") {
        robotSelect.style.borderColor = "#DC0000";
    } else if (publicInput.value === "") {
        publicInput.style.borderColor = "#DC0000";
    } else {
        publishTopic(`${robotSelect.value}/set_config`, publicInput.value);
        publicInput.value = "";
        publicInput.focus();
        toggerMessage("success", `Public topic success`);
    }
    setTimeout(() => {
        robotSelect.style.borderColor = "transparent";
        publicInput.style.borderColor = "transparent";
    }, 2000);
};
