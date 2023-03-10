import createMap from "../rosModule/createMap.js";
import createAxes from "../rosModule/createAxes.js";
import displayPoint from "../rosModule/displayPoint.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import displayPose from "../rosModule/displayPose.js";

import { toggerMessage } from "../main.js";
import { currentMission, renderBlockStep } from "./handleStepMission.js";
import { setDefaultValueFootprint } from "./function/footprint.js";
import { changeImgMarkerDir, tabTypeMarker } from "./function/marker.js";
import inputFunction from "./functionHandle/inputFunction.js";
import { loaded, loading } from "../functionHandle/displayLoad.js";
import { loadDataFunction } from "./handleTypeMission.js";
import sendMission from "./sendMission.js";
import handleCreateFunction from "./handleCreateFunction.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const showMaps = $$(".show-point-map");

function start() {
    nextTabFunction();

    handleShowPointOnMap();

    tabTypeMarker();
    changeImgMarkerDir();

    renderBlockStep();

    handlePointMission();
    handleFootprintMission();

    handleSleepMission();
    handleMarkerMission();
    setDefaultValueFootprint();

    sendMission();

    handleCreateFunction();
}
start();

localStorage.setItem("isUpload", 0);

function nextTabFunction() {
    $(".type-mission-btn-wrapper").onclick = (e) => {
        const typeMissionBtn = e.target.closest(".type-mission-btn");
        if (!typeMissionBtn) return;
        $(".type-mission-btn.active").classList.remove("active");
        typeMissionBtn.classList.add("active");
        $(".type-mission-tab:not(.hidden)")?.classList.add("hidden");
        $$(".type-mission-tab")[typeMissionBtn.dataset.index].classList.remove(
            "hidden"
        );
    };

    $(".function-mission-btn-wrapper").onclick = (e) => {
        const functionMissionBtn = e.target.closest(".function-mission-btn");
        if (!functionMissionBtn) return;
        $(".function-mission-btn.active")?.classList.remove("active");
        functionMissionBtn.classList.add("active");
        $(".function-list-item:not(.hidden)")?.classList.add("hidden");
        $$(".function-list-item")[
            functionMissionBtn.dataset.index
        ].classList.remove("hidden");
    };
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

///

export function addFunctionStep(type, data) {
    fetch(`/api/${type}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            $(".function-item-form-wrapper").click();
            loadDataFunction()
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

            renderBlockStep();

            toggerMessage("success", "add point successfully");
        };
    });

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
                    renderBlockStep();
                    loaded();
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

        const isAllInputFootprintFilled =
            x1_footprint.value &&
            x2_footprint.value &&
            y1_footprint.value &&
            y2_footprint.value &&
            name_footprint.value;

        if (isAllInputFootprintFilled) {
            const data = {
                x1: Number(x1_footprint.value),
                x2: Number(x2_footprint.value),
                y1: Number(y1_footprint.value),
                y2: Number(y2_footprint.value),
                name_type: name_footprint.value,
            };

            renderBlockStep();

            addFunctionStep("footprint", data);

            x1_footprint.value = "";
            x2_footprint.value = "";
            y1_footprint.value = "";
            y2_footprint.value = "";
            name_footprint.value = "";
            toggerMessage("success", "save footprint successfully");
            localStorage.setItem("isUpload", 1);
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
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
            localStorage.setItem("isUpload", 1);
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
            const isAllInputsMarkerFilled =
                name_marker.value &&
                (off_set_x1 ? off_set_x1.value : true) &&
                (off_set_x2 ? off_set_x2.value : true) &&
                (off_set_y1 ? off_set_y1.value : true) &&
                (off_set_y2 ? off_set_y2.value : true) &&
                (off_set_dis ? off_set_dis.value : true) &&
                (off_set_angle ? off_set_angle.value : true);

            if (isAllInputsMarkerFilled) {
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
                localStorage.setItem("isUpload", 1);
            } else {
                toggerMessage("error", "Please enter all inputs");
            }
        };
    });
}
