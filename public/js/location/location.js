import ros, { $, $$, toggerMessage } from "../main.js";
import amclSet from "../rosModule/amclSet.js";
import clickSetPointMap from "../rosModule/clickSetPointMap.js";
import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import createTfClient from "../rosModule/createTfClient.js";
import displayPoint from "../rosModule/displayPoint.js";
import displayPose from "../rosModule/displayPose.js";
import getSizeMap from "../rosModule/getSizeMap.js";
import lockZ from "../rosModule/lockZ.js";
import mathYaw from "../rosModule/mathYaw.js";
import showLaser from "../rosModule/showLaser.js";
import showUrd from "../rosModule/showUrd.js";
import reloadWhenOrientation from "../reloadOnOrientation.js";
import confirmationForm from "../functionHandle/confirmationForm.js";
import { processPoint, processPose } from "../lib/ROS3D/utils.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;
const tfClient = createTfClient();

let viewer = createMap(heightMap, widthMap);

createAxes(viewer);
reloadWhenOrientation();

const point = processPoint({ ros, tfClient, viewer });
const pose = processPose({ ros, tfClient, viewer });

point.display(0, 0);
pose.display(0, 0, 0, 1);

getSizeMap();

let x = 0;
let y = 0;
let rotateZ = 0;
let rotateW = 1;
let robotActive;

$("#position-x").oninput = (e) => {
    x = Number(e.target.value);
    displayLocation();
    $("#inx").value = x;
    // console.log(x);
};

$("#position-y").oninput = (e) => {
    y = Number(e.target.value);
    displayLocation();
    $("#iny").value = y;
};

$("#rotate-z").oninput = (e) => {
    const deg = Number(e.target.value);
    const yaw = (deg / 180) * Math.PI;
    const { z, w } = mathYaw(yaw);
    rotateZ = z;
    rotateW = w;
    displayLocation();
    $("#inz").value = deg;
};

$("#inx").onchange = (e) => {
    x = Number(e.target.value);
    $("#position-x").value = x;
    displayLocation();
};

$("#iny").onchange = (e) => {
    y = Number(e.target.value);
    $("#position-y").value = y;
    displayLocation();
};

$("#inz").onchange = (e) => {
    const deg = Number(e.target.value);
    const yaw = (deg / 180) * Math.PI;
    const { z, w } = mathYaw(yaw);
    rotateZ = z;
    rotateW = w;
    $("#rotate-z").value = deg;
    displayLocation();
};

// remove laser
$("#robot-navigation-name").onchange = (e) => {
    robotActive = e.target.value;
    console.log(robotActive);
    if (robotActive) {
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
            } else {
                viewer.scene.remove(laser[i].points.sn);
                laser[i] = new ROS3D.LaserScan({
                    ros: ros,
                    topic:
                        "/" +
                        robotNavigationChange[i].name_seri +
                        "/laser/scan",
                    rootObject: viewer.scene,
                    tfClient: tfClient,
                    material: { size: 0.3, color: 0x008000 },
                    rate: 1,
                });
            }
        }
    } else {
        for (let i = 0; i < robotNavigationChange.length; i++) {
            viewer.scene.remove(laser[i].points.sn);
            laser[i] = new ROS3D.LaserScan({
                ros: ros,
                topic: "/" + robotActive + "/laser/scan",
                rootObject: viewer.scene,
                tfClient: tfClient,
                material: { size: 0.3, color: 0x008000 },
                rate: 1,
            });
        }
    }
};

function displayLocation() {
    point.display(x, y);
    pose.display(x, y, rotateZ, rotateW);
}

$("#send-location-btn").onclick = () => {
    if (robotActive) {
        confirmationForm({
            message: `Do you want to set up this localization for robot: ${robotActive}?`,
            callback: () => {
                amclSet(robotActive, x, y, rotateZ, rotateW);
                toggerMessage("success", "Set location success!");
            },
        });
    } else {
        toggerMessage("error", "Please choose robot");
    }
};

// set point location
const robotNavigation = JSON.parse($("#robot-navigation").value);
const robotNavigationChange = [...robotNavigation];
const laser = [];

displayLaserUrd(robotNavigationChange);
function displayLaserUrd(dataRobotNavigation) {
    dataRobotNavigation.forEach((robot) => {
        laser.push(showLaser(robot.name_seri, ros, viewer, tfClient));
        showUrd(robot.name_seri, ros, viewer, tfClient);
    });
}

// click set point
const checkPoint = $(".check-click-point");
checkPoint.onchange = () => {
    if (checkPoint.checked) {
        lockZ(viewer);
        mapElement.addEventListener("dblclick", clickSetPoint);
        mapElement.addEventListener("mousemove", handleMouseMapMove);
        mapElement.style.cursor = "cell";
        mapElement.addEventListener("touchstart", tapHandler);
        mapElement.addEventListener("touchmove", handleMouseMapMove);
    } else {
        mapElement.removeEventListener("dblclick", clickSetPoint);
        mapElement.removeEventListener("mousemove", handleMouseMapMove);
        mapElement.removeEventListener("touchmove", handleMouseMapMove);

        mapElement.style.cursor = "default";
        mapElement.removeEventListener("touchstart", tapHandler);
    }
};
const clickSetPoint = function (e) {
    const [positionXSet, positionYSet] = clickSetPointMap(
        e.offsetX,
        e.offsetY,
        rotateZ,
        rotateW,
        viewer,
    );
    x = Number(positionXSet.toFixed(2));
    y = Number(positionYSet.toFixed(2));

    displayValue();
};
function handleMouseMapMove(e) {
    lockZ(viewer);
}

var tapedTwice = false;
function tapHandler(e) {
    if (e.touches.length < 2) {
        if (!tapedTwice) {
            tapedTwice = true;
            setTimeout(function () {
                tapedTwice = false;
            }, 300);
            return false;
        }
        e.preventDefault();
        touchSetPoint(e);
    }
}

const touchSetPoint = function (e) {
    const mapWrapper = $("#map-wrapper");
    const [positionXSet, positionYSet] = clickSetPointMap(
        e.touches[0].pageX - mapWrapper.offsetLeft,
        e.touches[0].pageY - mapWrapper.offsetTop,
        rotateZ,
        rotateW,
        viewer,
    );

    x = Number(positionXSet.toFixed(2));
    y = Number(positionYSet.toFixed(2));

    displayValue();
};

document.onkeydown = (e) => {
    switch (e.key) {
        case "ArrowRight":
            !e.shiftKey || (x = x + 1);
            x = x + 0.1;
            displayLocation();
            displayValue();
            break;
        case "ArrowUp":
            !e.shiftKey || (y = y + 1);
            y = y + 0.1;
            displayLocation();
            displayValue();
            break;
        case "ArrowDown":
            !e.shiftKey || (y = y - 1);
            y = y - 0.1;
            displayLocation();
            displayValue();
            break;
        case "ArrowLeft":
            !e.shiftKey || (x = x - 1);
            x = x - 0.1;
            displayLocation();
            displayValue();
            break;
        default:
            break;
    }
};

function displayValue() {
    $("#position-x").value = x.toFixed(2);
    $("#position-y").value = y.toFixed(2);

    $("#inx").value = x.toFixed(2);
    $("#iny").value = y.toFixed(2);
}
