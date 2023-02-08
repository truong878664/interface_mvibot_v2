import { settingRobotStart } from "./settingRobot.js";
import { $,$$ } from "../main.js";
// export const $ = document.querySelector.bind(document);
// export const $$ = document.querySelectorAll.bind(document);


showSettingRobot()

$$(".setting-item").forEach((element, index) => {
    element.onclick = (e) => {
        $(".setting-item.active").classList.remove("active");
        e.target.classList.add("active");
        $$(".setting-detail").forEach((element) => {
            element.classList.add("hidden");
        });
        $$(".setting-detail")[index].classList.remove("hidden");
    };
});

export function showSettingRobot() {
    const robotActive = localStorage.getItem("robotActive");
    if (robotActive) {
        settingRobotStart(robotActive)
        $$(".setting-item:not(.robot-choose)").forEach((element) => {
            element.classList.remove("hidden");
        });
    } else {
        $$(".setting-item:not(.robot-choose)").forEach((element) => {
            element.classList.add("hidden");
        });
    }
}
