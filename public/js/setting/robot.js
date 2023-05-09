import { showSettingRobot } from "./setting.js";
import { $, $$ } from "../main.js";
import dbDelete from "../missions/functionHandle/dbDelete.js";
import confirmationForm from "../functionHandle/confirmationForm.js";

export default function robot() {
    checkRobotActiveStart();
    selectRobot();
    handleDeleteRobot();
}

const robotActive = localStorage.getItem("robotActive");
function checkRobotActiveStart() {
    $(`.robot-${robotActive}`)?.classList.toggle("active", robotActive);
}

function selectRobot() {
    const inputRobotSelect = $("#robot-select");
    const robotItems = $$(".robot-item");
    robotItems.forEach((element) => {
        element.addEventListener("click", (e) => {
            $(".robot-item.active")?.classList.remove("active");
            const robotActive = localStorage.getItem("robotActive");
            const nameRobot = element.querySelector(".name-robot").value;
            const isActive = robotActive === nameRobot;

            isActive
                ? localStorage.removeItem("robotActive")
                : localStorage.setItem("robotActive", nameRobot);

            element.classList.toggle("active", !isActive);

            showSettingRobot();
            $(".name-robot-active").innerText = nameRobot;

            inputRobotSelect.value = nameRobot;

            const changeEvent = new Event('change');
            inputRobotSelect.dispatchEvent(changeEvent);
        });
    });
}

function handleDeleteRobot() {
    $$(".delete-robot-btn").forEach((item) => {
        item.onclick = (e) => {
            e.stopPropagation();
            
            confirmationForm({
                message: "Do you want to permanently delete this robot?",
                callback: () => deleteRobot(e),
            });
        };
    });
}

function deleteRobot(e) {
    const nameRobotDelete = e.target.closest(".robot-item").dataset.robot;

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
