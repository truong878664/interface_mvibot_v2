import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import { $ } from "../main.js";
import { mvibot_layer } from "../rosModule/classMvibot.js";
import { markerClient, displayLayer } from "../rosModule/layer/markerClient.js";
import {
    markerClientPath,
    displayPath,
} from "../rosModule/path/markerClientPath.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

markerClient(tfClient, viewer);
markerClientPath(tfClient, viewer);

const layer1 = new mvibot_layer("A", 0, 0, 7, 7, "dead_zone");
const layer2 = new mvibot_layer("B", 10, -10, -10, -35, "lowspeed_zone");
const layer3 = new mvibot_layer("C", 5, 0, -5, -15, "lowspeed_zone");
const layer4 = new mvibot_layer("E", 0, 3, -5, -15, "dead_zone");

const mvibot_layer_active = [layer1, layer2, layer3, layer4];

displayLayer(mvibot_layer_active);
displayPath();

createAxes(viewer);

createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayLayer(tfClient);
