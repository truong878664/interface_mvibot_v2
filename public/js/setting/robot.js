import { showRobotActive } from "../mainLayout.js";
import { $, $$ } from "./setting.js";
import publishTopic from "../rosModule/topicString.js";
import { toggerMessage } from "../main.js";

const robotActive = localStorage.getItem("robotActive");
if (robotActive) {
    $(`.robot-${robotActive}`).classList.add("active");
}
$$(".robot-item").forEach((element) => {
    element.onclick = (e) => {
        $(".robot-item.active")?.classList.remove("active");
        element.classList.add("active");
        const nameRobot = element.querySelector(".name-robot").value;

        localStorage.setItem("robotActive", nameRobot);
        showRobotActive();
    };
});

$(".add-robot-btn").onclick = (e) => {
    $(".name-new-robot").classList.toggle("hidden");
    $(".name-new-robot:not(.hidden)")?.focus();
    
    const nameRobotAdd = $(".name-new-robot.hidden")?.value;
    
    nameRobotAdd && publishTopic("/name_seri", nameRobotAdd);
    nameRobotAdd && toggerMessage("success", 'Add robot success!')
};
