import { showRobotActive } from "../mainLayout.js";
import { $, $$ } from "./setting.js";
import publishTopic from "../rosModule/topicString.js";
import { toggerMessage } from "../main.js";

const robotActive = localStorage.getItem("robotActive");

if (robotActive) {
    $(`.robot-${robotActive}`).classList.add("active");
    $(".name-robot-active").innerText = robotActive;
    setModeRobot(robotActive);
} else {
    $(".name-robot-active").innerText = "No robots choose";
}
$$(".robot-item").forEach((element) => {
    element.onclick = (e) => {
        $(".robot-item.active")?.classList.remove("active");
        element.classList.add("active");
        const nameRobot = element.querySelector(".name-robot").value;

        localStorage.setItem("robotActive", nameRobot);

        showRobotActive();
        setModeRobot(nameRobot);

        $(".name-robot-active").innerText = nameRobot;
    };
});

$(".add-robot-btn").onclick = (e) => {
    $(".name-new-robot").classList.toggle("hidden");
    $(".name-new-robot:not(.hidden)")?.focus();

    const nameRobotAdd = $(".name-new-robot.hidden")?.value;

    nameRobotAdd && publishTopic("/name_seri", nameRobotAdd);
    nameRobotAdd && toggerMessage("success", "Add robot success!");
};

function setModeRobot(nameRobot) {
    $(".mode-item.active")?.classList.remove("active");
    fetch(`/api/status-robot/${nameRobot}`)
        .then((res) => res.json())
        .then((data) => {
            $$(".mode-item").forEach((item) => {
                item.getAttribute("value") == data.mode &&
                    item.classList.add("active");
            });
        })
        .then(() => {
            changeModeRobot()
        })
}

function changeModeRobot() {
    let oldMode = $(".mode-item.active")?.getAttribute("value");
    $$(".mode-item").forEach((item) => {
        item.onclick = (e) => {
            $(".mode-item.active").classList.remove("active");
            e.target.classList.add("active");
            const mode = e.target.getAttribute("value");
            mode != oldMode && publishTopic("/mode", mode);
            oldMode = mode;
        };
    });
}
