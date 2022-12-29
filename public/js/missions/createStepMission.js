import createMap from "../rosModule/createMap.js";
import createAxes from "../rosModule/createAxes.js";
import displayPoint from "../rosModule/displayPoint.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import displayPose from "../rosModule/displayPose.js";
import { currentMission, renderStep } from "./renderStepMission.js";

import { runMission } from "../rosModule/handleMission.js";
import { toggerMessage } from "../main.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const showMaps = $$(".show-point-map");

function start() {
    activeTab();
    handleShowPointOnMap();

    tabTypeMarker();
    changeImgMarkerDir();

    renderStep();

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
function tabTypeMarker() {
    const allradios = $$("input[name='marker']");
    const xBtns = $$(".x-btn");
    xBtns.forEach((xBtn) => {
        xBtn.addEventListener("click", () => {
            allradios.forEach((element) => {
                element.checked = false;
            });
        });
    });
}

function changeImgMarkerDir() {
    const markerDirs = $$(".marker_dir_input");
    const illustrationImgs = $$(".illustration-img");

    markerDirs.forEach((markerDir) => {
        markerDir.addEventListener("change", (e) => {
            illustrationImgs.forEach((illustrationImg) => {
                const typeMarker =
                    illustrationImg.parentElement.getAttribute("markerDir");
                illustrationImg.setAttribute(
                    "src",
                    `/img/marker/${typeMarker}${e.target.value}.png`
                );
            });
        });
    });
}

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
