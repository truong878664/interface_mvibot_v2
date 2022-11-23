import { $ } from "./main.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import createAxes from "./rosModule/createAxes.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import displayPoint from "./rosModule/displayPoint.js";
import displayPose from "./rosModule/displayPose.js";
import createJoystick from "./map/createJoystick.js";

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
