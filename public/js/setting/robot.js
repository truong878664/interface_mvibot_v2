import { showSettingRobot } from "./setting.js";
import { $, $$ } from "../main.js";
import dbDelete from "../missions/functionHandle/dbDelete.js";

export default function robot() {
    checkRobotActiveStart();
    selectRobot();
    handleDeleteRobot();
}

const robotActive = localStorage.getItem("robotActive");
function checkRobotActiveStart() {
    if (robotActive) {
        $(`.robot-${robotActive}`)?.classList.add("active");
        $(".name-robot-active").innerText = robotActive;
    } else {
        $(".name-robot-active").innerText = "No robots choose";
    }
}

function selectRobot() {
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
}

function handleDeleteRobot() {
    $$(".delete-robot-btn").forEach((item) => {
        item.onclick = (e) => {
            e.stopPropagation();
            dbDelete(e.target, () => deleteRobot(e));
        };
    });
}

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
