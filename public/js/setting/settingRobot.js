import { $, $$ } from "../main.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";
import publishTopic from "../rosModule/topicString.js";

const oldParam = {};
let oldMode = $(".mode-item.active")?.getAttribute("value");

export function settingRobotStart(robot) {
    getConfigAll(robot);
}

// function setIp(robotActive) {
//     $(".set-ip-master-btn").onclick = () => {
//         const ipMaster = $(".address-ip-master").value;
//         publishTopic(`/${robotActive}/set_config`, `(ip_master|${ipMaster})`);
//     };

//     $(".set-ip-node-btn").onclick = () => {
//         const ipNode = $(".address-ip-node").value;
//         publishTopic(`/${robotActive}/set_config`, `(ip_node|${ipNode})`);
//     };
// }
// function setModeIp(robotActive) {
//     robotActive && setModeRobot(robotActive);
//     function setModeRobot(nameRobot) {
//         $(".mode-item.active")?.classList.remove("active");
//         fetch(`/api/robot/${nameRobot}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 $$(".mode-item").forEach((item) => {
//                     item.getAttribute("value") == data.mode &&
//                         item.classList.add("active");
//                 });
//                 console.log(data);

//                 $(".address-ip-master").value = data.ip_master;
//                 $(".address-ip-node").value = data.ip_node;
//             })
//             .then(() => {
//                 changeModeRobot(robotActive);
//             });
//     }

// function setParameter(robotActive) {
//     $$(".para-input").forEach((element) => {
//         element.onfocus = (e) => {
//             $$(".para-robot-btn:not(hidden)").forEach((element) => {
//                 element.classList.add("hidden");
//             });
//             e.target
//                 .closest(".para-item")
//                 .querySelector(".para-robot-btn")
//                 .classList.remove("hidden");

//             e.target
//                 .closest(".para-item")
//                 .querySelector(".para-robot-btn").onclick = sendRobotPara;
//         };
//     });

//     function sendRobotPara(e) {
//         const type = e.target.getAttribute("type");
//         const value = $(`.${type}_input`).value;
//         const data = `(${type}|${value})`;
//         publishTopic(`/${robotActive}/set_config`, data);
//     }

//     const types = [
//         "robot_wmax",
//         "robot_vmax",
//         "robot_aw",
//         "robot_ax",
//         "robot_gear",
//         "robot_l",
//         "robot_r",
//     ];

//     subscribeTopic(`/${robotActive}/set_config`, "std_msgs/String", showPara);

//     function showPara(data) {
//         const dataSetting = data.data
//             .replaceAll(")(", "+")
//             .replaceAll("(", "")
//             .replaceAll(")", "")
//             .split("+");
//         dataSetting?.forEach((item) => {
//             const type = item.split("|")[0];
//             const value = item.split("|")[1];

//             if (types.indexOf(type) != -1) {
//                 $(`#${type}`).value = value;
//             }
//         });
//     }
// }

function getConfigAll(robot) {
    fetch(`/api/config-status?name_seri=${robot}`)
        .then((res) => res.json())
        .then((data) => {
            renderParameter(data);
            handleChangeModeRobot();
            handleChangeParam();
            handleSaveParam(robot);
        });
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
            if(settingPram.classList.contains('mode-setting')) {
                const modeActive = $('.mode-item.active').getAttribute('value')
                dataParamChange.push(`(mode|${modeActive})`)
                oldMode = modeActive
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
