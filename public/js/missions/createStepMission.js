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

function start() {
    activeTab();
    handleShowPointOnMap();
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