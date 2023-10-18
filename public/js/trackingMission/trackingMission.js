import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import ros, { $, $$, toggerMessage } from "../main.js";
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
import { setRobotMove } from "../rosModule/moveRobot.js";
import topicString from "../rosModule/topicString.js";
import reloadWhenOrientation from "../reloadOnOrientation.js";
import confirmationForm from "../functionHandle/confirmationForm.js";
import progress from "./progress.js";
import createMarkerClientArrow from "../rosModule/arrow/createMarkerClientArrow.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

markerClient(tfClient, viewer);
markerClientPath(tfClient, viewer);
createMarkerClientArrow(tfClient, viewer);

addLayerDbToLayerActive();

createAxes(viewer);

createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayLayer(tfClient);

createJoystick();
progress();
changeTopic();

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
            w
        );
        mvibot_layer_active.push(layer);
        return mvibot_layer_active;
    });
    displayLayer(mvibot_layer_active);
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

function activeSelectRobot(robotActive) {
    const markerClient_topic = new ROSLIB.Topic({
        ros: ros,
        name: `/visualization_marker_layer_arrow`,
        messageType: "visualization_msgs/Marker",
    });
    const markerClient_msg = new ROSLIB.Message({
        header: {
            frame_id: `/${robotActive}/base_footprint`,
        },
        ns: "arrow",
        id: 0,
        type: 0,
        action: 0,
        frame_locked: false,
        mesh_resource: "",
        mesh_use_embedded_materials: false,
        color: {
            r: 1,
            g: 0.5,
            b: 0,
            a: 0.9,
        },
        scale: {
            x: 0.5,
            y: 0.25,
            z: 1.0,
        },
        pose: {
            position: {
                x: 0.0,
                y: 0.0,
                z: 1.2,
            },
            orientation: {
                x: 0.0,
                y: 0.7071068,
                z: 0.0,
                w: 0.7071068,
            },
        },
    });
    markerClient_topic.publish(markerClient_msg);
}

let robotActive = "";
let displayPathFs;
function changeTopic() {
    $("#robot-navigation").onchange = (e) => {
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

$(".stop-mission-btn").onclick = (e) => {
    if (robotActive) {
        topicString(`${robotActive}/mission_action`, "0");
    } else {
        toggerMessage("error", "please choose robot");
    }
};

$(".refresh-mission-btn").onclick = () => {
    confirmationForm({
        message: `Do you want to reset server?`,
        callback: () => {
            topicString("/reset_server", "1");
        },
    });
};

$(".continue-mission-btn").onclick = (e) => {
    if (robotActive) {
        confirmationForm({
            message: `Do you want to continue robot ${robotActive}?`,
            callback: () => {
                topicString(`${robotActive}/mission_action`, "1");
            },
        });
    } else {
        toggerMessage("error", "please choose robot");
    }
};

reloadWhenOrientation();
