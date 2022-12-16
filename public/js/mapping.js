import createJoystick from "./createJoystick/createJoystick.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import { $ } from "./main.js";
import { cmd_vel_listener } from "./rosModule/moveRobot.js";
import changeMapActive from "./rosModule/changeMapMapping.js";
import createAxes from "./rosModule/createAxes.js";

const heightMap = $("#map").offsetHeight;
const widthMap = $("#map").offsetWidth;
const robotMappingEle = $("#robot-mapping");
let robotActive = robotMappingEle.value;
const tfClient = createTfClient();
const topic = "/";
let viewer = createMap(heightMap, widthMap, tfClient, topic);
createAxes(viewer);

createJoystick();
changeTopic();

function changeTopic() {
    cmd_vel_listener.name = `${robotActive}/cmd_vel`;
    robotMappingEle.onchange = (e) => {
        robotActive = e.target.value;
        if (robotActive) {
            changeTopicMoveRobot(robotActive);
            changTopicOccupancy(robotActive);
        }
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

$("#create_map_btn").onclick = () => {
    const nameMap = $("#create_map");
    if (nameMap.value === "") {
        $("#error_create_map").innerText = "please enter this field";
        nameMap.focus();
        nameMap.oninput = () => {
            $("#error_create_map").innerText = "";
        };
    } else {
        changeMapActive(robotActive, nameMap.value);
        nameMap.value = "";
    }
};
