import publishTopic from "../rosModule/topicString.js";
import { toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";
import { $ } from "./setting.js";



// const robotSelect = $(".choose_robot.public-topic");

const robotSelect = robotActive();
const publicInput = $("#public-data");

$("#public-btn").onclick = () => {
    if (!robotSelect) {
        toggerMessage('error', 'Please choose robot!')
    } else if (publicInput.value == "") {
        publicInput.style.borderColor = "#DC0000";
    } else {
        publishTopic(`${robotSelect}/set_config`, publicInput.value);
        publicInput.value = "";
        publicInput.focus();
        toggerMessage("success", `Public topic success`);
    }
    setTimeout(() => {
        publicInput.style.borderColor = "transparent";
    }, 2000);
};
