import createJoystick from "./map/createJoystick.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import { $ } from "./main.js";
const heightMap = $("#map").offsetHeight;
const widthMap = $("#map").offsetWidth;
const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createJoystick();
