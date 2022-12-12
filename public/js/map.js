import { $ } from "./main.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import createAxes from "./rosModule/createAxes.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import displayPoint from "./rosModule/displayPoint.js";
import { markerClient, displayLayer } from "./rosModule/layer/markerClient.js";
import { mvibot_layer } from "./rosModule/classMvibot.js";
import { convertToPosition } from "./rosModule/clickSetPointMap.js";
import lockZ from "./rosModule/lockZ.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);
createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayPoint(0, 0);

markerClient(tfClient, viewer);
// const layer1 = new mvibot_layer("A", 4, 4, 3, 7, "dead_zone");
// const layer2 = new mvibot_layer("B", 10, -10, -10, -35, "lowspeed_zone");
// const layer3 = new mvibot_layer("C", 5, 0, -5, -15, "lowspeed_zone");
// const layer4 = new mvibot_layer("E", 0, 3, -5, -15, "dead_zone");

const mvibot_layer_active = [];

displayLayer(mvibot_layer_active);

const xo = $("#xo");
const yo = $("#yo");

mapElement.addEventListener("mousemove", () => {
    lockZ(viewer);
});

mapElement.addEventListener("dblclick", (e) => {
    const [x, y] = convertToPosition(e.offsetX, e.offsetY, viewer);
    xo.value = x.toFixed(2);
    yo.value = y.toFixed(2);
});
