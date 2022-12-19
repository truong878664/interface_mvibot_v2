import displayPoint from "./displayPoint.js";
import displayPose from "./displayPose.js";
import mathYaw from "./mathYaw.js";
import { viewer, mapElement } from "../missions/createPoint.js";
import clickSetPointMap from "./clickSetPointMap.js";
import { $ } from "../main.js";
import { convertToPosition } from "./clickSetPointMap.js";
import lockZ from "./lockZ.js";

let positionX = 0;
let positionY = 0;
let rotateZ = 0;
let rotateW = 1;
let rotateZdeg = 0;
const positionXElement = $(".number-position-x");
const positionYElement = $(".number-position-y");
const positionZElement = $(".number-rotate-z");

const controlPositionX = $("#position-x");
const controlPositionY = $("#position-y");
const controlRotateZ = $("#rotate-z");

const createButton = $(".create-point-btn");

function setPosition() {
    controlPositionX.addEventListener("input", (e) => {
        positionX = Number(e.target.value);
        displayPoint(positionX, positionY);
        displayPose(positionX, positionY, rotateZ, rotateW);
        displayValue(positionX, positionY, rotateZdeg);
    });

    controlPositionY.addEventListener("input", (e) => {
        positionY = Number(e.target.value);
        displayPoint(positionX, positionY);
        displayPose(positionX, positionY, rotateZ, rotateW);
        displayValue(positionX, positionY, rotateZdeg);
    });

    controlRotateZ.addEventListener("input", (e) => {
        rotateZdeg = e.target.value;
        const degInput = (Number(e.target.value) / 180) * Math.PI;
        const { z, w } = mathYaw(degInput);
        rotateZ = z;
        rotateW = w;
        displayPoint(positionX, positionY);
        displayPose(positionX, positionY, rotateZ, rotateW);
        displayValue(positionX, positionY, rotateZdeg);
    });

    positionXElement.addEventListener("change", (e) => {
        checkValueInput(positionXElement);
        positionX = Number(e.target.value);
        displayPoint(positionX, positionY);
        displayPose(positionX, positionY, rotateZ, rotateW);
        displayValue(positionX, positionY, rotateZdeg);
    });

    positionYElement.addEventListener("change", (e) => {
        checkValueInput(positionYElement);
        positionY = Number(e.target.value);
        displayPoint(positionX, positionY);
        displayPose(positionX, positionY, rotateZ, rotateW);
        displayValue(positionX, positionY, rotateZdeg);
    });

    positionZElement.addEventListener("change", (e) => {
        checkValueInput(positionZElement);
        rotateZdeg = e.target.value;
        const degInput = (Number(e.target.value) / 180) * Math.PI;
        const { z, w } = mathYaw(degInput);
        rotateZ = z;
        rotateW = w;
        displayPoint(positionX, positionY);
        displayPose(positionX, positionY, rotateZ, rotateW);
        displayValue(positionX, positionY, rotateZdeg);
    });
}

function displayValue(positionX, positionY, rotateZ) {
    positionXElement.value = positionX;
    positionYElement.value = positionY;
    controlPositionX.value = positionX;
    controlPositionY.value = positionY;
    positionZElement.value = rotateZ;
    controlRotateZ.value = rotateZ;
}

function setValueToAddDatabase(x, y, z, w) {
    const xElement = $(".x-value-database");
    const yElement = $(".y-value-database");
    const zElement = $(".z-value-database");
    const wElement = $(".w-value-database");
    xElement.value = x;
    yElement.value = y;
    zElement.value = z;
    wElement.value = w;
}

function checkValueInput(elementCheck) {
    const max = Number(elementCheck.getAttribute("max"));
    const min = Number(elementCheck.getAttribute("min"));
    if (elementCheck.value > max) {
        elementCheck.value = max;
    } else if (elementCheck.value < min) {
        elementCheck.value = min;
    }
}

if (createButton) {
    createButton.addEventListener("click", () => {
        setValueToAddDatabase(positionX, positionY, rotateZ, rotateW);
        setValuePositionForm();
    });
}

const displayPositionX = $(".display-positon-x");
const displayPositionY = $(".display-positon-y");
const displayRotateZ = $(".display-rotate-z");

function setValuePositionForm() {
    displayPositionX.value = positionXElement.value;
    displayPositionY.value = positionYElement.value;
    displayRotateZ.value = `${positionZElement.value}°`;
}

const checkPoint = $(".check-click-point");
checkPoint.onchange = () => {
    if (checkPoint.checked) {
        lockZ(viewer);
        mapElement.addEventListener("dblclick", clickSetPoint);
        mapElement.addEventListener("mousemove", handleMouseMapMove);
        mapElement.addEventListener("dblclick", clickSetPoint);
        mapElement.style.cursor = "cell";
        mapElement.addEventListener("touchmove", handleMouseMapMove);
        mapElement.addEventListener("touchstart", tapHandler);
    } else {
        mapElement.removeEventListener("dblclick", clickSetPoint);
        mapElement.removeEventListener("mousemove", handleMouseMapMove);
        mapElement.style.cursor = "default";
        mapElement.removeEventListener("touchmove", handleMouseMapMove);
        mapElement.removeEventListener("touchstart", tapHandler);
    }
};

const clickSetPoint = function (e) {
    const [positionXSet, positionYSet] = clickSetPointMap(
        e.offsetX,
        e.offsetY,
        rotateZ,
        rotateW,
        viewer
    );
    const inx = $("#inx");
    const iny = $("#iny");
    const positionXEle = $("#position-x");
    const positionYEle = $("#position-y");

    inx.value = positionXSet;
    iny.value = positionYSet;
    positionXEle.value = positionXSet;
    positionYEle.value = positionYSet;
    positionX = positionXSet;
    positionY = positionYSet;
};

function handleMouseMapMove(e) {
    lockZ(viewer);
    setPositionSpan(e);
    setLine(e);
}

var tapedTwice = false;
function tapHandler(e) {
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

// var rect = e.target.getBoundingClientRect();
//         const [x, y] = convertToPosition(
//             e.targetTouches[0].pageX - rect.left,
//             e.targetTouches[0].pageY - rect.top,
//             viewer
//         );

const touchSetPoint = function (e) {
    var rect = e.target.getBoundingClientRect();
    const mapWrapper = $(".missions-point-map");
    console.log(e);
    console.log(e.touches[0].pageX - mapWrapper.offsetLeft);
    const [positionXSet, positionYSet] = clickSetPointMap(
        e.touches[0].pageX - mapWrapper.offsetLeft,
        e.touches[0].pageY - mapWrapper.offsetTop,
        rotateZ,
        rotateW,
        viewer
    );

    const inx = $("#inx");
    const iny = $("#iny");
    const positionXEle = $("#position-x");
    const positionYEle = $("#position-y");

    inx.value = positionXSet;
    iny.value = positionYSet;
    positionXEle.value = positionXSet;
    positionYEle.value = positionYSet;
    positionX = positionXSet;
    positionY = positionYSet;
};

const xShow = $(".x-value");
const yShow = $(".y-value");

function setPositionSpan(e) {
    const x = e?.x - mapElement.offsetParent.offsetLeft;
    const y = e?.y - mapElement.offsetParent.offsetTop;
    const [positionXSet, positionYSet] = convertToPosition(x, y, viewer);
    xShow.innerText = positionXSet.toFixed(5);
    yShow.innerText = positionYSet.toFixed(5);
}

const lineX = $(".line-x");
const lineY = $(".line-y");
function setLine(e) {
    lineY.style.left = e?.x - mapElement.offsetParent.offsetLeft + "px";
    lineX.style.top = e?.y - mapElement.offsetParent.offsetTop + "px";
}
export { setPosition };
