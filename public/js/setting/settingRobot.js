import { $, $$, toggerMessage } from "../main.js";
import { robotActive } from "../mainLayout.js";
import publishTopic from "../rosModule/topicString.js";

const oldParam = {};
let oldMode;



function settingRobotStart(robot) {
    fetch(`/api/config-status?name_seri=${robot}`)
        .then((res) => res.json())
        .then((data) => {
            oldMode = data.mode;
            renderParameter(data);
            handleChangeModeRobot();
            handleChangeParam();
            handleSaveParam(robot);
        });
}
$('.refresh-param-btn').onclick = () => {
    settingRobotStart(robotActive())
    toggerMessage('success', "Updated all parameters")
}


function renderParameter(data) {
    for (const para in data) {
        if ($(`input[name=${para}]`)) {
            $(`input[name=${para}]`).value = data[para];
            para === "robot_volume" &&
                ($(".number-volume").innerText = data[para]);
        }
        if (para === "mode") {
            $(".mode-item.active")?.classList.remove("active");
            $(`.mode-item[value=${data[para]}]`).classList.add("active");
        }
    }
}

function handleChangeParam() {
    $$(".input-param").forEach((element) => {
        oldParam[element.name] = element.value;
        element.oninput = (e) => {
            if (e.target.value === oldParam[e.target.name]) {
                e.target.style.backgroundColor = "#fff";
                e.target.classList.remove("param-change");

                if (
                    !e.target
                        .closest(".setting-param-item")
                        .querySelector(".param-change")
                ) {
                    e.target
                        .closest(".setting-param-item")
                        .querySelector(".save-para-btn")
                        .classList.add("hidden");
                }
            } else {
                e.target.style.backgroundColor = "#0f6cbd30";
                e.target.classList.add("param-change");
                e.target
                    .closest(".setting-param-item")
                    .querySelector(".save-para-btn")
                    .classList.remove("hidden");
            }
            e.target.name === "robot_volume" &&
                ($(".number-volume").innerText = e.target.value);
        };
    });
}

function handleChangeModeRobot() {
    $$(".mode-item").forEach((item) => {
        item.onclick = (e) => {
            $(".mode-item.active")?.classList.remove("active");
            e.target.classList.add("active");
            const mode = e.target.getAttribute("value");

            if (oldMode === mode) {
                e.target
                    .closest(".setting-param-item")
                    .querySelector(".save-para-btn")
                    .classList.add("hidden");
            } else {
                e.target
                    .closest(".setting-param-item")
                    .querySelector(".save-para-btn")
                    .classList.remove("hidden");
            }
        };
    });
}

function handleSaveParam(robot) {
    $$(".save-para-btn").forEach((element) => {
        element.onclick = (e) => {
            const settingPram = e.target.closest(".setting-param-item");
            const paramChange = settingPram.querySelectorAll(".param-change");

            const dataParamChange = [];
            if (settingPram.classList.contains("mode-setting")) {
                const modeActive = $(".mode-item.active").getAttribute("value");
                dataParamChange.push(`(mode|${modeActive})`);
                oldMode = modeActive;
            } else {
                Array.from(paramChange).map((item) => {
                    dataParamChange.push(`(${item.name}|${item.value})`);
                    oldParam[item.name] = item.value;
                    return dataParamChange;
                });
            }

            publishTopic(`/${robot}/set_config`, dataParamChange.join(""));

            e.target.classList.add("hidden");
            paramChange.forEach((item) => {
                item.classList.remove("param-change");
                item.style.backgroundColor = "#fff";
            });
        };
    });
}
