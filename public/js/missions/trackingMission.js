import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import ros, { $, $$ } from "../main.js";
import { mvibot_layer } from "../rosModule/classMvibot.js";
import { markerClient, displayLayer } from "../rosModule/layer/markerClient.js";
import {
    markerClientPath,
    displayPath,
    robotPathTopic,
    deletePath,
} from "../rosModule/path/markerClientPath.js";
import createJoystick from "../createJoystick/createJoystick.js";
import mathYaw from "../rosModule/mathYaw.js";
import showUrd from "../rosModule/showUrd.js";
import showLaser from "../rosModule/showLaser.js";
import { cmd_vel_listener } from "../rosModule/moveRobot.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

markerClient(tfClient, viewer);
markerClientPath(tfClient, viewer);

addLayerDbToLayerActive();

createAxes(viewer);

createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayLayer(tfClient);

createJoystick();

changeTopic();

function addLayerDbToLayerActive() {
    const mvibot_layer_active = [];
    fetch("/dashboard/missions/layer-active")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const { z, w } = mathYaw(item.yawo);
                const layer = new mvibot_layer(
                    item.name_layer,
                    item.width,
                    item.height,
                    item.xo,
                    item.yo,
                    item.type_layer,
                    z,
                    w
                );
                mvibot_layer_active.push(layer);
            });
            displayLayer(mvibot_layer_active);
        });
}

const robotNavigation = JSON.parse($("#robot-navigation-json").value);
const robotNavigationChange = [...robotNavigation];
const laser = [];

displayLaserUrd(robotNavigationChange);
function displayLaserUrd(dataRobotNavigation) {
    dataRobotNavigation.forEach((robot) => {
        laser.push(showLaser(robot.name_seri, ros, viewer, tfClient));
        showUrd(robot.name_seri, ros, viewer, tfClient);
    });
}

let robotActive = "";
let displayPathFs;
function changeTopic() {
    $("#robot-navigation").onchange = (e) => {
        clearInterval(displayPathFs);
        deletePath(robotActive);

        robotActive = e.target.value;

        if (robotActive) {
            cmd_vel_listener.name = `${robotActive}/cmd_vel`;

            robotPathTopic(robotActive);

            displayPathFs = setInterval(() => {
                displayPath(robotActive);
            }, 1000);

            robotPathTopic(robotActive);
        } else {
            clearInterval(displayPathFs);
        }
    };
}
