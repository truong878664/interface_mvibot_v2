import createMap from "../rosModule/createMap.js";
import createAxes from "../rosModule/createAxes.js";
import displayPoint from "../rosModule/displayPoint.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import displayPose from "../rosModule/displayPose.js";

import { runMission } from "../rosModule/handleMission.js";

import { toggerMessage } from "../main.js";
import { valueGpio } from "./gpio.js";
import { currentMission, renderStep, updateStep } from "./renderStepMission.js";
import { setDefaultValueFootprint } from "./footprint.js";
import { changeImgMarkerDir, tabTypeMarker } from "./marker.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const showMaps = $$(".show-point-map");

function start() {
    activeTab();
    handleShowPointOnMap();

    tabTypeMarker();
    changeImgMarkerDir();

    renderStep();

    handlePointMission();
    handleFootprintMission();
    handleGpioMission();
    handleSleepMission();
    handleMarkerMission();
    setDefaultValueFootprint();

    sendMission();
}
start();

function activeTab() {
    const tabbar = $(".create-missions");
    tabbar.classList.add("active");
}

function handleShowPointOnMap() {
    showMaps.forEach((element) => {
        element.addEventListener("click", (e) => {
            const showMap = e.target.parentElement.querySelector(".show-point");

            createMapTag(showMap);

            const widthMap = $("#map-show-point").offsetWidth;
            const heightMap = $("#map-show-point").offsetHeight;

            const viewer = createMap(
                heightMap,
                widthMap,
                "",
                "",
                "map-show-point"
            );
            createAxes(viewer);
            const tfClient = createTfClient();

            const color = showMap.getAttribute("color_position");
            createPoint(viewer, tfClient);
            createPose(viewer, tfClient, color);

            const x = Number(showMap.getAttribute("x"));
            const y = Number(showMap.getAttribute("y"));
            const z = Number(showMap.getAttribute("z"));
            const w = Number(showMap.getAttribute("w"));
            console.log(x, y);
            displayPoint(x, y);
            displayPose(x, y, z, w);

            removeMapTag();
        });
    });
}

function createMapTag(showMap) {
    const divMap = document.createElement("div");
    divMap.setAttribute("id", "map-show-point");

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    const closeMap = document.createElement("button");
    closeMap.classList.add("remove-map");
    closeMap.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    divMap.appendChild(closeMap);
    showMap.appendChild(divMap);
    showMap.appendChild(overlay);
}

function removeMapTag() {
    const closeMap = $(".remove-map");
    closeMap.addEventListener("click", () => {
        $("#map-show-point").remove();
        $(".overlay").remove();
    });
}

//marker

function sendMission() {
    $(".send-mission-btn").onclick = () => {
        fetch(`/api/mission/${currentMission}`)
            .then((res) => res.json())

            .then((data) => {
                const nameRobot = $("#select-robot-option").value;
                if (nameRobot == "Choose Robot") {
                    toggerMessage("error", "please choose robot");
                } else {
                    const dataBodyMission = `&name>${data.name_mission}/time_out>-1/mode>normal/data>%normal_step#${data.steps_mission}`;
                    runMission(nameRobot, dataBodyMission);
                    toggerMessage("success", "send data to robot successfully");
                }
            });
    };
}

///

function handlePointMission() {
    $$(".add-point-btn").forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();
            const itemPoint = e.target.closest(".item-point");
            const type = itemPoint.querySelector(".type").value;
            const nameType = itemPoint.querySelector(".name_type").value;
            const idType = itemPoint.querySelector(".id_type").value;

            const dataSaveStep = dataSaveSteps("add", type, nameType, idType);

            updateStep(`/api/mission/${currentMission}`, dataSaveStep);

            renderStep();

            toggerMessage("success", "add point successfully");
        };
    });
    function dataSaveSteps(method, type, name_type, id_type) {
        return { method, type, name_type, id_type };
    }
    handleDeletePoint();
    function handleDeletePoint() {
        $$(".delete-point-btn").forEach((element) => {
            element.onclick = (e) => {
                deletePoint(e.target.getAttribute("point-id"));
                e.target.closest(".item-point").remove();
            };
        });
        function deletePoint(id) {
            fetch(`/api/position/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            })
                .then(function (res) {
                    console.log(res);
                    renderStep();
                })
                .catch(function (res) {
                    console.log(res);
                });
        }
    }
}
function handleFootprintMission() {
    $(".submit-btn-footprint").onclick = (e) => {
        e.preventDefault();

        const x1_footprint = $('[name="x1_footprint"]');
        const x2_footprint = $('[name="x2_footprint"]');
        const y1_footprint = $('[name="y1_footprint"]');
        const y2_footprint = $('[name="y2_footprint"]');
        const name_footprint = $('[name="name_footprint"]');
        if (
            x1_footprint.value &&
            x2_footprint.value &&
            y1_footprint.value &&
            y2_footprint.value &&
            name_footprint.value
        ) {
            const data = {
                method: "add",
                type: "footprint",
                x1: x1_footprint.value,
                x2: x2_footprint.value,
                y1: y1_footprint.value,
                y2: y2_footprint.value,
                name_type: name_footprint.value,
            };
            updateStep(`/api/mission/${currentMission}`, data);
            renderStep();

            x1_footprint.value = "";
            x2_footprint.value = "";
            y1_footprint.value = "";
            y2_footprint.value = "";
            name_footprint.value = "";
            toggerMessage("success", "save footprint successfully");
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
}
function handleGpioMission() {
    $(".submit-btn-gpio").onclick = (e) => {
        e.preventDefault();
        const name_gpio = $(".name_gpio");
        const time_out_gpio = $(".time_out_gpio");
        const out_set_gpio = $(".out_set_gpio");
        const out_reset_gpio = $(".out_reset_gpio");
        const in_on_gpio = $(".in_on_gpio");
        const in_off_gpio = $(".in_off_gpio");
        const in_pullup_gpio = $(".in_pullup_gpio");
        const in_pulldown_gpio = $(".in_pulldown_gpio");

        if (
            name_gpio.value &&
            time_out_gpio.value &&
            (out_set_gpio.value ||
                out_reset_gpio.value ||
                in_on_gpio.value ||
                in_off_gpio.value ||
                in_pullup_gpio.value ||
                in_pulldown_gpio.value)
        ) {
            const data = {
                method: "add",
                type: "gpio",
                name_type: name_gpio.value,
                time_out: time_out_gpio.value,
                out_set: out_set_gpio.value,
                out_reset: out_reset_gpio.value,
                in_on: in_on_gpio.value,
                in_off: in_off_gpio.value,
                in_pullup: in_pullup_gpio.value,
                in_pulldown: in_pulldown_gpio.value,
            };
            updateStep(`/api/mission/${currentMission}`, data);
            renderStep();

            name_gpio.value = "";
            time_out_gpio.value = -1;
            out_set_gpio.value = "";
            out_reset_gpio.value = "";
            in_on_gpio.value = "";
            in_off_gpio.value = "";
            in_pullup_gpio.value = "";
            in_pulldown_gpio.value = "";

            $$(".gpio_checkbox").forEach((element) => {
                element.checked = false;
            });

            $$(".gpio-io").forEach(
                (element) => (element.style.fill = "#CCCCCC")
            );

            valueGpio.out_set = [];
            valueGpio.out_reset = [];
            valueGpio.in_on = [];
            valueGpio.in_off = [];
            valueGpio.in_pullup = [];
            valueGpio.in_pulldown = [];

            $$(".show-gpio-wrapper").forEach((item) => {
                item.innerHTML = "";
            });

            $(".data-gpio-item.show")?.classList.remove("show");
            toggerMessage("success", "save gpio successfully");
        } else {
            toggerMessage(
                "error",
                "Please enter name, timeout and at least one type of gpio"
            );
        }
    };
}

function handleSleepMission() {
    $(".submit-btn-sleep").onclick = (e) => {
        e.preventDefault();
        const name_sleep = $('[name="name_sleep"]');
        const time_sleep = $('[name="time_sleep"]');

        if (name_sleep.value && time_sleep.value) {
            const data = {
                method: "add",
                type: "sleep",
                time_sleep: $('[name="time_sleep"]').value,
                name_type: $('[name="name_sleep"]').value,
            };
            updateStep(`/api/mission/${currentMission}`, data);
            renderStep();

            $('[name="time_sleep"]').value = "";
            $('[name="name_sleep"]').value = "";
            toggerMessage("success", `save sleep successfully`);
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
}

function handleMarkerMission() {
    $$(".submit-btn-marker").forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();
            const formElement = e.target.closest(".marker-item");

            const name_marker = formElement.querySelector(
                '[name="name_marker"]'
            );
            const marker_type = formElement.querySelector(
                '[name="marker_type"]'
            );
            const marker_dir = formElement.querySelector('[name="marker_dir"]');
            const off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
            const off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
            const off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
            const off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
            const off_set_dis = formElement.querySelector(
                '[name="off_set_dis"]'
            );
            const off_set_angle = formElement.querySelector(
                '[name="off_set_angle"]'
            );
            const sx1 = formElement.querySelector('[name="sx1"]');
            const sx2 = formElement.querySelector('[name="sx2"]');
            const sy1 = formElement.querySelector('[name="sy1"]');
            const sy2 = formElement.querySelector('[name="sy2"]');

            if (
                name_marker.value &&
                (off_set_x1 ? off_set_x1.value : true) &&
                (off_set_x2 ? off_set_x2.value : true) &&
                (off_set_y1 ? off_set_y1.value : true) &&
                (off_set_y2 ? off_set_y2.value : true) &&
                (off_set_dis ? off_set_dis.value : true) &&
                (off_set_angle ? off_set_angle.value : true)
            ) {
                const data = {
                    type: "marker",
                    name_type: name_marker?.value,
                    marker_type: marker_type.value,
                    marker_dir: marker_dir?.value,
                    off_set_x1: off_set_x1?.value,
                    off_set_x2: off_set_x2?.value,
                    off_set_y1: off_set_y1?.value,
                    off_set_y2: off_set_y2?.value,
                    off_set_dis: off_set_dis?.value,
                    off_set_angle: off_set_angle?.value,
                    sx1: sx1?.value,
                    sx2: sx2?.value,
                    sy1: sy1?.value,
                    sy2: sy2?.value,
                    method: "add",
                };

                updateStep(`/api/mission/${currentMission}`, data);
                renderStep();
                name_marker ? (name_marker.value = "") : "";
                off_set_x1 ? (off_set_x1.value = "") : "";
                off_set_x2 ? (off_set_x2.value = "") : "";
                off_set_y1 ? (off_set_y1.value = "") : "";
                off_set_y2 ? (off_set_y2.value = "") : "";
                off_set_dis ? (off_set_dis.value = "") : "";
                off_set_angle ? (off_set_angle.value = "") : "";
                toggerMessage(
                    "success",
                    `save ${marker_type.value} successfully`
                );
            } else {
                toggerMessage("error", "Please enter all inputs");
            }
        };
    });
}
