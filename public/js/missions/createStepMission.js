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
import { currentMission, renderStep, updateStep } from "./handleStepMission.js";
import { setDefaultValueFootprint } from "./footprint.js";
import { changeImgMarkerDir, tabTypeMarker } from "./marker.js";
import inputFunction from "./inputFunction.js";
import { loaded, loading } from "./displayLoad.js";
import { loadDataFunction } from "./handleTypeMission.js";

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

function addFunctionStep(type, data) {
    fetch(`/api/${type}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    })
        .then(function (res) {
            console.log(res);
        })
        .catch(function (res) {
            console.log(res);
        });
}

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
            loading();
            fetch(`/api/position/${id}`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "DELETE",
            })
                .then(function (res) {
                    loaded();
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
        const {
            x1_footprint,
            x2_footprint,
            y1_footprint,
            y2_footprint,
            name_footprint,
        } = inputFunction("footprint");

        if (
            x1_footprint.value &&
            x2_footprint.value &&
            y1_footprint.value &&
            y2_footprint.value &&
            name_footprint.value
        ) {
            const data = {
                x1: Number(x1_footprint.value),
                x2: Number(x2_footprint.value),
                y1: Number(y1_footprint.value),
                y2: Number(y2_footprint.value),
                name_type: name_footprint.value,
            };

            renderStep();

            addFunctionStep("footprint", data);

            x1_footprint.value = "";
            x2_footprint.value = "";
            y1_footprint.value = "";
            y2_footprint.value = "";
            name_footprint.value = "";
            toggerMessage("success", "save footprint successfully");
            loadDataFunction();
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
}
function handleGpioMission() {
    $(".submit-btn-gpio").onclick = (e) => {
        e.preventDefault();

        const {
            name_gpio,
            time_out_gpio,
            out_set_gpio,
            out_reset_gpio,
            in_on_gpio,
            in_off_gpio,
            in_pullup_gpio,
            in_pulldown_gpio,
        } = inputFunction("gpio");

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
            addFunctionStep("gpio", data);
            resetDataGpio();

            $(".data-gpio-item.show")?.classList.remove("show");
            toggerMessage("success", "save gpio successfully");
            loadDataFunction();
        } else {
            toggerMessage(
                "error",
                "Please enter name, timeout and at least one type of gpio"
            );
        }
    };
}

export function resetDataGpio() {
    const {
        name_gpio,
        time_out_gpio,
        out_set_gpio,
        out_reset_gpio,
        in_on_gpio,
        in_off_gpio,
        in_pullup_gpio,
        in_pulldown_gpio,
    } = inputFunction("gpio");

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

    $$(".gpio-io").forEach((element) => (element.style.fill = "#CCCCCC"));

    valueGpio.out_set = [];
    valueGpio.out_reset = [];
    valueGpio.in_on = [];
    valueGpio.in_off = [];
    valueGpio.in_pullup = [];
    valueGpio.in_pulldown = [];

    $$(".show-gpio-wrapper").forEach((item) => {
        item.innerHTML = "";
    });
}

function handleSleepMission() {
    $(".submit-btn-sleep").onclick = (e) => {
        e.preventDefault();

        const { name_sleep, time_sleep } = inputFunction("sleep");

        if (name_sleep.value && time_sleep.value) {
            const data = {
                type: "sleep",
                time_sleep: time_sleep.value,
                name_type: name_sleep.value,
            };
            addFunctionStep("sleep", data);

            time_sleep.value = "";
            name_sleep.value = "";
            toggerMessage("success", `save sleep successfully`);
            loadDataFunction();
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
}

function handleMarkerMission() {
    $$(".submit-btn-marker").forEach((element) => {
        element.onclick = (e) => {
            e.preventDefault();

            const {
                name_marker,
                marker_type,
                marker_dir,
                off_set_x1,
                off_set_x2,
                off_set_y1,
                off_set_y2,
                off_set_dis,
                off_set_angle,
                sx1,
                sx2,
                sy1,
                sy2,
            } = inputFunction("marker");

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
                };
                addFunctionStep("marker", data);

                name_marker ? (name_marker.value = "") : "";
                off_set_x1 ? (off_set_x1.value = "") : "";
                off_set_x2 ? (off_set_x2.value = "") : "";
                off_set_y1 ? (off_set_y1.value = "") : "";
                off_set_y2 ? (off_set_y2.value = "") : "";
                off_set_dis ? (off_set_dis.value = "") : "";
                off_set_angle ? (off_set_angle.value = "") : "";

                sx1.value = 0.01;
                sx2.value = 0.01;
                sy1.value = 0.01;
                sy2.value = 0.01;
                toggerMessage(
                    "success",
                    `save ${marker_type.value} successfully`
                );
                loadDataFunction();
            } else {
                toggerMessage("error", "Please enter all inputs");
            }
        };
    });
}
