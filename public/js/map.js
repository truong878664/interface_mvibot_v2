import { $ } from "./main.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import createAxes from "./rosModule/createAxes.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import displayPoint from "./rosModule/displayPoint.js";
import displayPose from "./rosModule/displayPose.js";
import createJoystick from "./map/createJoystick.js";
import { displayLayer, markerClient } from "./rosModule/layer/markerClient.js";
import { mvibot_layer } from "./rosModule/classMvibot.js";
import { convertToPosition } from "./rosModule/clickSetPointMap.js";
import mathYaw from "./rosModule/mathYaw.js";
import lockZ from "./rosModule/lockZ.js";

const heightMap = $(".map-page_map").offsetHeight;
const widthMap = $(".map-page_map").offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);
createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayPoint(0, 0);

createJoystick();
let dataLayer;
if ($(".data-layer").value) {
    dataLayer = JSON.parse($(".data-layer").value);
} else {
    dataLayer = [];
}

const mvibot_layer_active = dataLayer;
// markerClient(tfClient, viewer);
// displayLayer(mvibot_layer_active);

const pointLayer1 = $(".point-layer-1");
const pointLayer2 = $(".point-layer-2");
const pointLayer3 = $(".point-layer-3");

const clickSetLayer = function (e) {
    const [x, y] = convertToPosition(e.offsetX, e.offsetY, viewer);
    if (pointLayer1.value == "") {
        pointLayer1.value = `${x.toFixed(2)} : ${y.toFixed(2)}`;
        pointLayer1.setAttribute("x1", x);
        pointLayer1.setAttribute("y1", y);
        displayPoint(Number(x.toFixed(2)), Number(y.toFixed(2)));
    } else if (pointLayer2.value == "") {
        pointLayer2.value = `${x.toFixed(2)} : ${y.toFixed(2)}`;
        pointLayer2.setAttribute("x2", x);
        pointLayer2.setAttribute("y2", y);
        displayPoint(Number(x.toFixed(2)), Number(y.toFixed(2)));
    } else if (pointLayer3.value == "") {
        pointLayer3.value = `${x.toFixed(2)} : ${y.toFixed(2)}`;
        pointLayer3.setAttribute("x3", x);
        pointLayer3.setAttribute("y3", y);
        displayPoint(Number(x.toFixed(2)), Number(y.toFixed(2)));
    } else {
        pointLayer1.value = "";
        pointLayer2.value = "";
        pointLayer3.value = "";
    }
};

function getAngleDeg(x1, y1, x2, y2) {
    var angleRad = Math.atan((y1 - y2) / (x1 - x2));
    var angleDeg = (angleRad * 180) / Math.PI;
    if (angleDeg < 0) {
        return (angleDeg = 180 + angleDeg);
    }
    return angleDeg;
}

function equationLine(x1, y1, x2, y2) {
    const m = (y1 - y2) / (x1 - x2);
    const n = y1 - m * x1;
    return [m, n];
}

$(".show-layer").onclick = () => {
    const nameLayer = $(".name_layer").value || "no_name";
    const xa = Number(pointLayer1.getAttribute("x1"));
    const ya = Number(pointLayer1.getAttribute("y1"));
    const xb = Number(pointLayer2.getAttribute("x2"));
    const yb = Number(pointLayer2.getAttribute("y2"));
    const xc = Number(pointLayer3.getAttribute("x3"));
    const yc = Number(pointLayer3.getAttribute("y3"));

    const distance2 = distance(xa, ya, xb, yb, xc, yc);
    const distanceTwoPoint2 = distanceTwoPoint(xa, ya, xb, yb);
    const x1 = xa;
    const y1 = ya;
    const x2 = xa + distanceTwoPoint2;
    const y2 = ya + distance2;

    const zX = getAngleDeg(xa, ya, xb, yb);
    const degInput = (Number(zX) / 180) * Math.PI;
    const { z, w } = mathYaw(degInput);
    const g1 = (x1 + x2) / 2;
    const g2 = (y1 + y2) / 2;

    const o1 = (xa + xc) / 2;
    const o2 = (ya + yc) / 2;

    const a = Math.abs(g1 - o1);
    const b = Math.abs(g2 - o2);

    const x12 = xa - a;
    const y12 = ya + b;
    const x22 = xa + distanceTwoPoint2 - a;
    const y22 = ya + distance2 + b;
    const zone = $(".zone").value;

    const layer = new mvibot_layer(nameLayer, x12, y12, x22, y22, zone, z, w);
    mvibot_layer_active.push(layer);

    saveLayer(mvibot_layer_active);
    displayLayer(mvibot_layer_active);
    pointLayer1.value = "";
    pointLayer2.value = "";
    pointLayer3.value = "";
};
function distance(x1, y1, x2, y2, l1, l2) {
    const [m, n] = equationLine(x1, y1, x2, y2);
    const distance = Math.abs(m * l1 - l2 + n) / Math.sqrt(m * m + 1);
    return distance;
}

function distanceTwoPoint(x1, y1, x2, y2) {
    const AB = Math.sqrt(bp(x2 - x1) + bp(y2 - y1));
    return AB;
}

function bp(a) {
    return a * a;
}

function saveLayer(data) {
    $(".data-layer").value = JSON.stringify(data);
}

$("#value-layer").onchange = (e) => {
    lockZ(viewer);
    if (e.target.checked) {
        $(".map-page_map").addEventListener("dblclick", clickSetLayer);
        $(".map-page_map").addEventListener("mousemove", handleMouseMove);
    } else {
        $(".map-page_map").removeEventListener("dblclick", clickSetLayer);
        $(".map-page_map").removeEventListener("mousemove", handleMouseMove);
    }
};

const handleMouseMove = function (e) {
    lockZ(viewer);
};
