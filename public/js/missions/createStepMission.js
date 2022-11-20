import createMap from "../rosModule/createMap.js";
import createAxes from "../rosModule/createAxes.js";
import displayPoint from "../rosModule/displayPoint.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import displayPose from "../rosModule/displayPose.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const showMaps = $$(".show-point-map");

const dataStepsJson = $(".data-steps").value;
let dataSteps = JSON.parse(dataStepsJson);

function start() {
    activeTab();
    handleShowPointOnMap();

    tabTypeMarker();
    changeImgMarkerDir();

    stepsNameSubmit(dataSteps);
    renderStep(dataSteps);
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

            const viewer = createMap(heightMap, widthMap, "map-show-point");
            createAxes(viewer);
            const tfClient = createTfClient();
            // createAxes(viewer)

            const color = showMap.getAttribute("color_position");
            createPoint(viewer, tfClient);
            createPose(viewer, tfClient, color);

            const x = Number(showMap.getAttribute("x"));
            const y = Number(showMap.getAttribute("y"));
            const z = Number(showMap.getAttribute("z"));
            const w = Number(showMap.getAttribute("w"));
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
                    `/img/${typeMarker}${e.target.value}.png `
                );
            });
        });
    });
}

//step mission

function stepsNameSubmit(dataSteps) {
    const stepsNameSubmitEle = document.querySelector(
        "#input-steps-name-submit"
    );
    stepsNameSubmitEle.value = `|${dataSteps.join("|")}`;
}

function renderStep(data) {
    const stepsWrapper = document.querySelector(".steps-wrapper");
    const htmlStep = [];
    data.map((step, index) => {
        const stepMode = step.slice(0, step.indexOf("#"));
        const stepName = step.slice(step.indexOf("#") + 1, step.length);
        return htmlStep.push(
            `<div class="step-item step-${stepMode}">
                <button id-move="${index}" class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
                <div>${stepMode}:${stepName}</div>
                <button class="delete-step" id-delete="${index}"><i class="fa-solid fa-xmark"></i></button>
                <button id-move="${index}" class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
            </div>`
        );
    });
    stepsWrapper.innerHTML = htmlStep.join("");
    deleteStep(data);
    moveStepLeft(data);
    moveStepRight(data);
    stepsNameSubmit(data);
}

function deleteStep(data) {
    const allDeleteBtn = $$(".delete-step");
    allDeleteBtn.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", (e) => {
            const indexDelete = e.target.getAttribute("id-delete");
            data.splice(indexDelete, 1);
            renderStep(data);
            dataSteps = data;
        });
    });
}

function moveStepLeft(data) {
    const allMoveBtnLeft = document.querySelectorAll(".move-left");
    allMoveBtnLeft.forEach((moveLeftBtn) => {
        moveLeftBtn.addEventListener("click", (e) => {
            const indexMove = Number(e.target.getAttribute("id-move"));
            const itemMove = data.splice(indexMove, 1);
            data.splice(indexMove - 1, "", ...itemMove);
            dataSteps = data;

            renderStep(data);
        });
    });
}

function moveStepRight(data) {
    const allMoveBtnRight = document.querySelectorAll(".move-right");
    allMoveBtnRight.forEach((moveRightBtn) => {
        moveRightBtn.addEventListener("click", (e) => {
            const indexMove = Number(e.target.getAttribute("id-move"));
            const itemMove = data.splice(indexMove, 1);
            data.splice(indexMove + 1, "", ...itemMove);
            dataSteps = data;
            renderStep(data);
        });
    });
}
