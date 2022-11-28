import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import displayPoint from "../rosModule/displayPoint.js";
import displayPose from "../rosModule/displayPose.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import { setPosition } from "../rosModule/functionHandler.js";
import { $ } from "../main.js";
import setSizeMap from "../rosModule/getSizeMap.js";
import clickSetPointMap from "../rosModule/clickSetPointMap.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);

createPoint(viewer, tfClient);
createPose(viewer, tfClient);

displayPoint(0, 0);
displayPose(0, 0, 0, 1);

setSizeMap();
setPosition();

const checkPoint = document.querySelector(".check-click-point");
checkPoint.onchange = () => {
    if (checkPoint.checked) {
        mapElement.addEventListener("click", (e) => {
            clickSetPointMap(e.offsetX, e.offsetY, viewer);
        });
    } else if (!checkPoint.checked) {
        mapElement.removeEventListener("click", clickSetPointMap);
    }
};
