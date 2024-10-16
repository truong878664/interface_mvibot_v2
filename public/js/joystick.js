import { $ } from "./main.js";
import createJoystick from "./map/createJoystick.js";
import createAxes from "./rosModule/createAxes.js";
import createMap from "./rosModule/createMap.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import createTfClient from "./rosModule/createTfClient.js";
import displayPoint from "./rosModule/displayPoint.js";
import { setRobotMove } from "./rosModule/moveRobot.js";

const heightMap = window.innerHeight;
const widthMap = window.innerWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);
createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayPoint(0, 0);

createJoystick();