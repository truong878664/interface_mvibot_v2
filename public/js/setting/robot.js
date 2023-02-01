import { showRobotActive } from "../mainLayout.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

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
