import { showSettingRobot } from "./setting.js";
import { $, $$ } from "../main.js";
import publishTopic from "../rosModule/topicString.js";
// import { toggerMessage } from "../main.js";
import dbDelete from "../missions/functionHandle/dbDelete.js";

export const robotActive = localStorage.getItem("robotActive");

if (robotActive) {
    $(`.robot-${robotActive}`)?.classList.add("active");
    $(".name-robot-active").innerText = robotActive;

} else {
    $(".name-robot-active").innerText = "No robots choose";
}
$$(".robot-item").forEach((element) => {
    element.onclick = (e) => {
        $(".robot-item.active")?.classList.remove("active");
        const robotActive2 = localStorage.getItem("robotActive");
        const nameRobot = element.querySelector(".name-robot").value;

        if (robotActive2 == nameRobot) {
            element.classList.remove("active");
            localStorage.removeItem("robotActive");
            showSettingRobot();
            console.log(nameRobot);
        } else {
            element.classList.add("active");
            localStorage.setItem("robotActive", nameRobot);
            showSettingRobot();
            console.log(nameRobot);
        }
        

        $(".name-robot-active").innerText = nameRobot;
    };
});

// $(".add-robot-btn").onclick = (e) => {
//     $(".name-new-robot").classList.toggle("hidden");
//     $(".name-new-robot:not(.hidden)")?.focus();

//     const nameRobotAdd = $(".name-new-robot.hidden")?.value;

//     nameRobotAdd && publishTopic("/name_seri", nameRobotAdd);
//     nameRobotAdd && toggerMessage("success", "Add robot success!");
// };

$$(".delete-robot-btn").forEach((item) => {
    item.onclick = (e) => {
        e.stopPropagation();
        dbDelete(e.target, () => deleteRobot(e));
    };
});

function deleteRobot(e) {
    const nameRobotDelete = e.target
        .closest(".robot-item")
        .querySelector(".name-robot").value;

    fetch(`/api/robot/${nameRobotDelete}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((data) => {
            data.status == 200 && e.target.closest(".robot-item").remove();
        });
}
