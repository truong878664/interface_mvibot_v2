import connectRos from "./rosModule/connectRos.js";
import createMap from "./rosModule/createMap.js";
import createAxes from "./rosModule/createAxes.js";
import createTfClient from "./rosModule/createTfClient.js";
import displayPoint from "./rosModule/displayPoint.js";
import displayPose from "./rosModule/displayPose.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import { setPosition } from "./rosModule/functionHandler.js";

export const $ = document.querySelector.bind(document);
let viewer;
let tfClient;
const ros = connectRos();
const mapElement = $("#map");

function start() {
    if (mapElement) {
        const heightMap = mapElement.offsetHeight;
        const widthMap = mapElement.offsetWidth;

        viewer = createMap(heightMap, widthMap);
        tfClient = createTfClient();
        createAxes(viewer);

        createPoint(viewer, tfClient);
        createPose(viewer, tfClient);

        displayPoint(0, 0);
        displayPose(0, 0, 0, 1);

        setPosition();
    }
}
start();

export { ros, viewer, tfClient };
