import { $ } from "./main.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import createAxes from "./rosModule/createAxes.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import displayPoint from "./rosModule/displayPoint.js";
import displayPose from "./rosModule/displayPose.js";
import createJoystick from "./map/createJoystick.js";
import { displayLayer, markerClient } from "./rosModule/layer/markerClient.js";
import { mvibot_layer } from "./rosModule/classMvibot.js";

const heightMap = $(".map-page_map").offsetHeight;
const widthMap = $(".map-page_map").offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);
createPoint(viewer, tfClient);
createPose(viewer, tfClient);

displayPoint(0, 0);
displayPose(0, 0, 0, 1);

createJoystick();

const layer1 = new mvibot_layer("A", 0, 0, 5, 5, "dead_zone");
const layer2 = new mvibot_layer("B", 2, -10, -10, -5, "lowspeed_zone");
const layer3 = new mvibot_layer("C", 5, 0, -5, -15, "lowspeed_zone");
const layer4 = new mvibot_layer("E", 0, 3, -5, -15, "dead_zone");
const mvibot_layer_active = [layer1, layer2, layer3, layer4];
markerClient(tfClient, viewer);
displayLayer(mvibot_layer_active);
