import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import ros, { toggerMessage } from "../main.js";
import { mvibot_layer } from "../rosModule/classMvibot.js";
import { markerClient, displayLayer } from "../rosModule/layer/markerClient.js";
import {
    displayPath,
    robotPathTopic,
    deletePath,
} from "../rosModule/path/markerClientPath.js";
import createJoystick from "../createJoystick/createJoystick.js";
import mathYaw from "../rosModule/mathYaw.js";
import showUrd from "../rosModule/showUrd.js";
import showLaser from "../rosModule/showLaser.js";
import { setRobotMove } from "../rosModule/moveRobot.js";
import topicString from "../rosModule/topicString.js";
import reloadWhenOrientation from "../reloadOnOrientation.js";
import confirmationForm from "../functionHandle/confirmationForm.js";
import progress from "./progress.js";
import createMarkerClientArrow from "../rosModule/arrow/createMarkerClientArrow.js";
import { subscribeFootprint } from "./footprint.js";
import activeSelectRobot from "./activeSelectRobot.js";
import { createMakerClientFootprint } from "../rosModule/footprint/createMakerClientFootprint.js";
import { createMarkerClientPath } from "../rosModule/path/createMarkerClientPath.js";
import { subscribePath } from "./path.js";
import handleShowJoystick from "./handleShowJoystick.js";

const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);
const mapElement = getNode("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();
const listRobotElement = getNode("#robot-navigation-json");
export const robotList = JSON.parse(listRobotElement.value);

(function createMarker() {
    markerClient(tfClient, viewer);
    createMarkerClientArrow(tfClient, viewer);
    createMakerClientFootprint(tfClient, viewer);
    createMarkerClientPath(tfClient, viewer);
    createAxes(viewer);
    createPoint(viewer, tfClient);
    createPose(viewer, tfClient);
})();

subscribeFootprint();
subscribePath();
addLayerDbToLayerActive();

displayLayer(tfClient);
progress();
changeTopic();

handleShowJoystick();
(function handleJoystick() {
    new Promise((resolve, reject) => {
        createJoystick();
        resolve();
    }).then(() => {
        getNode("#show-joystick").checked =
            JSON.parse(localStorage.getItem("show-joystick")) || false;
    });
})();

async function addLayerDbToLayerActive() {
    const mvibot_layer_active = [];
    const res = await fetch("/dashboard/missions/layer-active");
    const data = await res.json();
    data.map((item) => {
        const { z, w } = mathYaw(item.yawo);
        const layer = new mvibot_layer(
            item.name_layer,
            item.width,
            item.height,
            item.xo,
            item.yo,
            item.type_layer,
            z,
            w,
        );
        mvibot_layer_active.push(layer);
        return mvibot_layer_active;
    });
    displayLayer(mvibot_layer_active);
}

const robotNavigation = JSON.parse(getNode("#robot-navigation-json").value);
const robotNavigationChange = [...robotNavigation];
const laser = [];

displayLaserUrd(robotNavigationChange);
function displayLaserUrd(dataRobotNavigation) {
    dataRobotNavigation.forEach((robot) => {
        laser.push(showLaser(robot.name_seri, ros, viewer, tfClient));
        showUrd(robot.name_seri, ros, viewer, tfClient);
    });
}

function activeLaserRobot(robotActive) {
    for (let i = 0; i < robotNavigationChange.length; i++) {
        if (robotActive == robotNavigationChange[i].name_seri) {
            viewer.scene.remove(laser[i].points.sn);
            laser[i] = new ROS3D.LaserScan({
                ros: ros,
                topic: "/" + robotActive + "/laser/scan",
                rootObject: viewer.scene,
                tfClient: tfClient,
                material: { size: 0.3, color: 0x00ff00 },
                rate: 1,
            });
        } else if (robotActive === "") {
            viewer.scene.remove(laser[i].points.sn);
            laser[i] = new ROS3D.LaserScan({
                ros: ros,
                topic: "/" + robotNavigationChange[i].name_seri + "/laser/scan",
                rootObject: viewer.scene,
                tfClient: tfClient,
                material: { size: 0.3, color: 0x008000 },
                rate: 1,
            });
        } else {
            viewer.scene.remove(laser[i].points.sn);
            laser[i] = new ROS3D.LaserScan({
                ros: ros,
                topic: "/" + robotNavigationChange[i].name_seri + "/laser/scan",
                rootObject: viewer.scene,
                tfClient: tfClient,
                material: { size: 0.3, color: 0x008000 },
                rate: 1,
            });
        }
    }
}

let robotActive = "";
let displayPathFs;
function changeTopic() {
    getNode("#robot-navigation").onchange = (e) => {
        clearInterval(displayPathFs);
        deletePath(robotActive);

        robotActive = e.target.value;

        setRobotMove(robotActive);
        activeLaserRobot(robotActive);
        activeSelectRobot(robotActive);
        if (robotActive) {
            robotPathTopic(robotActive);
            displayPathFs = setInterval(() => {
                displayPath(robotActive);
            }, 2000);
            robotPathTopic(robotActive);
        } else {
            clearInterval(displayPathFs);
        }
    };
}

getNode(".stop-mission-btn").onclick = () => {
    robotActive
        ? topicString(`${robotActive}/mission_action`, "0")
        : toggerMessage("error", "please choose robot");
};

getNode(".refresh-mission-btn").onclick = () => {
    confirmationForm({
        message: `Do you want to reset server?`,
        callback: () => {
            topicString("/reset_server", "1");
        },
    });
};

getNode(".continue-mission-btn").onclick = (e) => {
    robotActive
        ? confirmationForm({
              message: `Do you want to continue robot ${robotActive}?`,
              callback: () => {
                  topicString(`${robotActive}/mission_action`, "1");
              },
          })
        : toggerMessage("error", "please choose robot");
};

reloadWhenOrientation();
