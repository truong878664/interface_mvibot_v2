import validateInputSubmit from "../../functionHandle/validateForm.js";
import { $, toggerMessage } from "../../main.js";
import reloadWhenOrientation from "../../reloadOnOrientation.js";
import { mvibot_layer } from "../../rosModule/classMvibot.js";
import clickSetPointMap from "../../rosModule/clickSetPointMap.js";
import createAxes from "../../rosModule/createAxes.js";
import createMap from "../../rosModule/createMap.js";
import createPoint from "../../rosModule/createPoint.js";
import createPose from "../../rosModule/createPose.js";
import createTfClient from "../../rosModule/createTfClient.js";
import displayPoint from "../../rosModule/displayPoint.js";
import displayPose from "../../rosModule/displayPose.js";
import setSizeMap from "../../rosModule/getSizeMap.js";
import {
    displayLayer,
    markerClient,
} from "../../rosModule/layer/markerClient.js";
import lockZ from "../../rosModule/lockZ.js";
import mathYaw from "../../rosModule/mathYaw.js";
import { markerClientPath } from "../../rosModule/path/markerClientPath.js";
import { addFunctionStep } from "../createStepMission.js";

export function createMapPosition() {
    let positionX = 0;
    let positionY = 0;
    let rotateZ = 0;
    let rotateW = 1;
    let rotateZdeg = 0;

    removeAllEvent("#position-x");
    removeAllEvent("#position-y");
    removeAllEvent("#rotate-z");

    removeAllEvent(".number-position-x");
    removeAllEvent(".number-position-y");
    removeAllEvent(".number-rotate-z");

    const positionXElement = $(".number-position-x");
    const positionYElement = $(".number-position-y");
    const positionZElement = $(".number-rotate-z");
    const controlPositionX = $("#position-x");
    const controlPositionY = $("#position-y");
    const controlRotateZ = $("#rotate-z");

    resetInputValue(
        0,
        positionXElement,
        positionYElement,
        positionZElement,
        controlPositionX,
        controlPositionY,
        controlRotateZ
    );

    const mapElement = $("#map");
    mapElement.innerHTML = "";

    const heightMap = mapElement.offsetHeight;
    const widthMap = mapElement.offsetWidth;

    const viewer = createMap(heightMap, widthMap);

    const tfClient = createTfClient();
    createAxes(viewer);

    createPoint(viewer, tfClient);
    createPose(viewer, tfClient);

    markerClient(tfClient, viewer);
    markerClientPath(tfClient, viewer);

    displayPoint(0, 0);
    displayPose(0, 0, 0, 1);
    addLayerDbToLayerActive();

    setSizeMap();
    setPosition();

    reloadWhenOrientation();

    function addLayerDbToLayerActive() {
        const mvibot_layer_active = [];
        fetch("/dashboard/missions/layer-active")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
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
    validateInputSubmit(
        ".input-submit",
        ".form-create-point",
        ".point-submit-btn",
        ".time-out"
    );

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

    if ($(".create-point-btn")) {
        $(".create-point-btn").addEventListener("click", () => {
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
            addEventTouch();
        } else {
            removeEventTouch();
        }
    };

    function addEventTouch() {
        lockZ(viewer);
        mapElement.addEventListener("dblclick", clickSetPoint);
        mapElement.addEventListener("mousemove", handleMouseMapMove);
        mapElement.addEventListener("dblclick", clickSetPoint);
        mapElement.style.cursor = "cell";
        mapElement.addEventListener("touchmove", handleMouseMapMove);
        mapElement.addEventListener("touchstart", tapHandler);
    }

    function removeEventTouch() {
        mapElement.removeEventListener("dblclick", clickSetPoint);
        mapElement.removeEventListener("mousemove", handleMouseMapMove);
        mapElement.style.cursor = "default";
        mapElement.removeEventListener("touchmove", handleMouseMapMove);
        mapElement.removeEventListener("touchstart", tapHandler);
    }

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
    }
    //check touch
    if (checkPoint.checked) {
        addEventTouch();
    } else {
        removeEventTouch();
    }

    var tapedTwice = false;
    let oldX;
    let oldY;
    let isTouch = false;
    function tapHandler(e) {
        isTouch = !!(
            Math.abs(e.touches[0].pageX - oldX) < 70 &&
            Math.abs(e.touches[0].pageY - oldY) < 70
        );

        oldX = e.touches[0].pageX;
        oldY = e.touches[0].pageY;

        if (!tapedTwice) {
            tapedTwice = true;
            setTimeout(function () {
                tapedTwice = false;
                isTouch = false;
            }, 300);
            return false;
        }
        e.preventDefault();
        isTouch && touchSetPoint(e);
    }

    const touchSetPoint = function (e) {
        var rect = e.target.getBoundingClientRect();
        const [positionXSet, positionYSet] = clickSetPointMap(
            e.touches[0].pageX - rect.left,
            e.touches[0].pageY - rect.top,
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
    $(".point-submit-btn").onclick = (e) => {
        e.preventDefault();
        console.log(123);
        const name_position = $('[name="name_position"]');
        const x = $('[name="x"]');
        const y = $('[name="y"]');
        const z = $('[name="z"]');
        const w = $('[name="w"]');
        const time_out = $('[name="time_out"]');
        const color_position = $('[name="color_position"]');
        const mode_position = $('[name="mode_position"]');
        const mode_child = $('[name="mode_child"]');
        const map = $(".name-map-active");

        const dataPosition = {
            name_position: name_position.value,
            x: x.value,
            y: y.value,
            z: z.value,
            w: w.value,
            time_out: time_out.value,
            color_position: color_position.value,
            mode_position: mode_position.value,
            mode_child: mode_child.value,
            map: map.innerText,
            mode: "position",
        };

        if (
            name_position.value &&
            x.value &&
            y.value &&
            z.value &&
            w.value &&
            time_out.value &&
            color_position.value &&
            mode_position.value &&
            mode_child.value
        ) {
            addFunctionStep("position", dataPosition);
            name_position.value = "";
            time_out.value = -1;
            mode_position.value = "normal";
            mode_child.value = -1;
            createMapPoint();

            localStorage.setItem("isUpload", 1);
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };

    function storeData(url, data) {
        fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        })
            .then(function (res) {
                res.status == 200
                    ? toggerMessage("success", "add point successfully")
                    : toggerMessage(
                          "error",
                          "An internet error has occurred or your type data, please try again"
                      );
                $("#create-point-checkbox").checked = false;
            })
            .catch(function (res) {
                console.log(res);
                toggerMessage(
                    "error",
                    "An internet error has occurred or your type data, please try again"
                );
            });
    }
}

function removeAllEvent(element) {
    var old_element = document.querySelector(element);
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
}

function resetInputValue(value, ...rest) {
    rest.forEach((item) => (item.value = value));
}

