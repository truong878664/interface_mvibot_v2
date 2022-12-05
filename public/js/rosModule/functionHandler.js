import displayPoint from "./displayPoint.js";
import displayPose from "./displayPose.js";
import mathYaw from "./mathYaw.js";
import { viewer, mapElement } from "../missions/createPoint.js";
import clickSetPointMap from "./clickSetPointMap.js";
import { $ } from "../main.js";

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
    const xElement = $(".x-value");
    const yElement = $(".y-value");
    const zElement = $(".z-value");
    const wElement = $(".w-value");
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

const checkPoint = document.querySelector(".check-click-point");
checkPoint.onchange = () => {
    if (checkPoint.checked) {
        lockZ();
        mapElement.addEventListener("dblclick", clickSetPoint);
        mapElement.addEventListener("mousemove", lockZ);
        mapElement.addEventListener("dblclick", clickSetPoint);
        mapElement.style.cursor = "cell";
        mapElement.addEventListener("touchmove", lockZ);
        mapElement.addEventListener("touchstart", tapHandler);
    } else {
        mapElement.removeEventListener("dblclick", clickSetPoint);
        mapElement.removeEventListener("mousemove", lockZ);
        mapElement.style.cursor = "default";
        mapElement.removeEventListener("touchmove", lockZ);
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

function lockZ() {
    viewer.cameraControls.rotateUp(1.57);
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

const touchSetPoint = function (e) {
    const mapWrapper = $(".missions-point-map");
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
export { setPosition };
