import { $, $$ } from "../main.js";
let dataOld;
let currentRobot = "no_robot";
updateStatus();

setInterval(() => {
    updateStatus();
}, 2000);

$("#robot-status").onchange = (e) => {
    currentRobot = e.target.value ? e.target.value : "no_robot";

    if (currentRobot === "no_robot") {
        dataOld = "";
        $$(`[data-title-status`).forEach((element) => {
            element.dataset.statusItem = "";
        });
        $("[data-status-robot]").dataset.statusRobot = "no";
    }
    updateStatus();
};

const BATTERY_MEDIUM = 20;
const BATTERY_LOW = 10;
const TEMPERATURE_OK = 60;
const VOL_MIN = 23.5;
const VOL_MAX = 27.5;

function updateStatus() {
    if (currentRobot === "no_robot") {
        $$(".parameter-status").forEach((para) => {
            para.textContent = "-";
        });
        return;
    }

    fetch(`/api/status/${currentRobot}`)
        .then((res) => res?.json())
        .then((data) => {
            if (JSON.stringify(data) !== JSON.stringify(dataOld)) {
                $("[data-status-robot]").dataset.statusRobot =
                    data.status === 0 ? "no" : "yes";

                $$(".no")?.forEach((element) => {
                    element.classList.remove("no");
                });
                $$(".yes")?.forEach((element) => {
                    element.classList.remove("yes");
                });
                dataOld = data;
                for (const key in data) {
                    const itemElement = document.getElementById(key);
                    if (key === "motor_left" || key === "motor_right") {
                        const motorWrapper = $(`.${key}`);
                        for (const item in data[key]) {
                            const value = data[key][item] === 1 ? "yes" : "no";

                            motorWrapper.querySelector(`.${item}`).innerText =
                                value;
                            motorWrapper
                                .querySelector(`.${item}`)
                                .classList.add(value);
                        }
                    } else if (key == "soc") {
                        const thresholds = [BATTERY_LOW, BATTERY_MEDIUM];
                        const colors = ["red", "orange", "#54B435"];

                        let color = colors[colors.length - 1];
                        thresholds.forEach((threshold, index) => {
                            if (data[key] <= threshold) {
                                color = colors[index];
                            }
                        });

                        const socWrapper = $(".soc-wrapper");
                        socWrapper.style.background = `linear-gradient(90deg, ${color} ${data[key]}%, rgba(255,255,255,1) ${data[key]}%)`;
                        itemElement.innerText = data[key];
                    } else {
                        const valueMapping = {
                            0: { text: "no", class: "no" },
                            1: { text: "yes", class: "yes" },
                        };
                        const value = data[key];
                        const mapping = valueMapping[value];
                        if (mapping) {
                            itemElement.innerText = mapping.text;
                            itemElement.classList.add(mapping.class);
                        } else {
                            key === "is_master" &&
                                (itemElement.dataset.status = value);
                            if (itemElement) {
                                itemElement.innerText = value;
                            }
                        }
                    }
                }
            }

            return data;
        })
        .then((data) => {
            checkStatusAll(data);
        })

        .catch((error) => {
            console.log(error);
        });
}

const ruleStatus = {
    soc: { condition: (v) => v > BATTERY_MEDIUM, group: "battery" },
    temperature: { condition: (v) => v < TEMPERATURE_OK, group: "battery" },
    vol: { condition: (v) => v > VOL_MIN && v < VOL_MAX, group: "battery" },
    motor_left: {
        condition: ({ live, error }) => live && !error,
        // live = false => false.
        // live = true && error = true => false.
        // live = true && error = false => true.
        group: "motor",
    },
    motor_right: {
        condition: ({ live, error }) => live && !error,
        group: "motor",
    },
    radar1: { condition: (v) => !!v, group: "device" },
    radar2: { condition: (v) => !!v, group: "device" },
    camera1: { condition: (v) => !!v, group: "device" },
    camera2: { condition: (v) => !!v, group: "device" },
    uart: { condition: (v) => !!v, group: "device" },
};

function checkStatusAll(data) {
    const statusCheck = {
        battery: true,
        device: true,
        motor: true,
    };

    for (const key in data) {
        const isRule = ruleStatus[key];
        if (isRule) {
            const check = isRule.condition(data[key]);
            isRule.group === "battery" &&
                displayErrorParameterStatusDevice({
                    title: key,
                    isError: check,
                });
            if (!check) {
                statusCheck[isRule.group] = false;
            }
        }
    }
    for (const key in statusCheck) {
        $(`[data-title-status=${key}]`).dataset.statusItem = statusCheck[key]
            ? "ok"
            : "ng";
    }
}

function displayErrorParameterStatusDevice({ title, isError }) {
    const statusItem = document.getElementById(title);
    statusItem.classList.toggle("no", !isError);
}
