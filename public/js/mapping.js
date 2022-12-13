import createJoystick from "./map/createJoystick.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import { $ } from "./main.js";
import { cmd_vel_listener } from "./rosModule/moveRobot.js";
const heightMap = $("#map").offsetHeight;
const widthMap = $("#map").offsetWidth;
const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createJoystick();
changeTopic();

function changeTopic() {
    const robotMappingEle = $("#robot-mapping");
    let robotActive = robotMappingEle.value;
    cmd_vel_listener.name = `${robotActive}/cmd_vel`;
    robotMappingEle.onchange = (e) => {
        robotActive = e.target.value;
        cmd_vel_listener.name = `${robotActive}/cmd_vel`;
    };
}
