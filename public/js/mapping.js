import createJoystick from "./map/createJoystick.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import { $ } from "./main.js";
import { cmd_vel_listener } from "./rosModule/moveRobot.js";
const heightMap = $("#map").offsetHeight;
const widthMap = $("#map").offsetWidth;
const robotMappingEle = $("#robot-mapping");
let robotActive = robotMappingEle.value;
// const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();
const topic = "/map";
let viewer = createMap(heightMap, widthMap, tfClient, topic);
console.log(viewer);

createJoystick();
changeTopic();

function changeTopic() {
    cmd_vel_listener.name = `${robotActive}/cmd_vel`;
    robotMappingEle.onchange = (e) => {
        robotActive = e.target.value;
        changeTopicMoveRobot(robotActive);
        changTopicOccupancy(robotActive);
    };
}
function changeTopicMoveRobot(robotActive) {
    cmd_vel_listener.name = `${robotActive}/cmd_vel`;
}

function changTopicOccupancy(robotActive) {
    $("#map").remove();
    $("#map-wrapper").innerHTML = `<div class="w-full h-full" id="map"></div>`;
    viewer = createMap(
        heightMap,
        widthMap,
        tfClient,
        `${robotActive}/map`,
        "map",
        robotActive
    );
}
