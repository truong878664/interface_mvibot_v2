import ros, { $, $$ } from "../main.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import createAxes from "../rosModule/createAxes.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import displayPoint from "../rosModule/displayPoint.js";
import {
    markerClient,
    displayLayer,
    deleteAllLayer,
} from "../rosModule/layer/markerClient.js";
import { mvibot_layer } from "../rosModule/classMvibot.js";
import { convertToPosition } from "../rosModule/clickSetPointMap.js";
import lockZ from "../rosModule/lockZ.js";
import mathYaw from "../rosModule/mathYaw.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const tfClient = createTfClient();
const viewer = createMap(heightMap, widthMap, tfClient);

const mvibot_layer_active = [];

const xoElement = $("#xo");
const yoElement = $("#yo");
const xoRangeElement = $("#xo-range");
const yoRangeElement = $("#yo-range");
const mapActive = $("#map-active").innerText;
const nameLayerElement = $("#name_layer");
const dataLayerFromDatabase = JSON.parse($("#data-layer-json").value);
const countLayerDb = dataLayerFromDatabase.length;

function start() {
    createAxes(viewer);
    createPoint(viewer, tfClient);
    createPose(viewer, tfClient);
    displayPoint(0, 0);
    markerClient(tfClient, viewer);
    lockZ(viewer);

    addLayerDbToLayerActive();
    displayLayer(mvibot_layer_active);

    handleDbClick();
}

start();

mapElement.addEventListener("mousemove", () => {
    lockZ(viewer);
});

mapElement.addEventListener("touchmove", () => {
    lockZ(viewer);
});

const dataLayerModel = {
    name_map_active: mapActive,
    name_layer: 0,
    type_layer: "",
    width_layer: 0,
    height_layer: 0,
    z_rotate: 0,
    xo: 0,
    yo: 0,
};

const dataLayerSaveDatabase = [];

function handleDbClick() {
    mapElement.addEventListener("dblclick", (e) => {
        if (nameLayerElement.value === "") {
            $("#msg-name-layer").innerText = "please enter this field";
            nameLayerElement.focus();
            nameLayerElement.oninput = () => {
                $("#msg-name-layer").innerText = "";
            };
        } else {
            checkNameLayer(nameLayerElement.value, e);
        }
    });
}

mapElement.addEventListener("touchstart", tapHandler);

var tapedTwice = false;
let oldX;
let oldY;
function tapHandler(e) {
    // console.log(oldX);
    // console.log(Math.abs(e.touches[0].pageY - oldY) < 100);
    // const isTouch = !!(
    //     (Math.abs(e.touches[0].pageX - oldX) < 70) &
    //     (Math.abs(e.touches[0].pageY - oldY) < 70)
    // );

    // oldX = e.touches[0].pageX;
    // oldY = e.touches[0].pageY;

    console.log(isTouch);
    // if (isTouch) {
    if (!tapedTwice) {
        tapedTwice = true;
        setTimeout(function () {
            tapedTwice = false;
        }, 300);
        return false;
    }
    // }

    // if() {

    // }
    e.preventDefault();
    if (nameLayerElement.value === "") {
        $("#msg-name-layer").innerText = "please enter this field";
        nameLayerElement.focus();
        nameLayerElement.oninput = () => {
            $("#msg-name-layer").innerText = "";
        };
    } else {
        checkNameLayer(nameLayerElement.value, e);
    }
}

function checkNameLayer(nameLayer, e) {
    fetch("/all-layer")
        .then((res) => res.json())
        .then((data) => {
            const dataCompareDatabase = data.find(
                (item) => item.name_layer === nameLayer
            );
            const dataCompareListLayer = dataLayerSaveDatabase.find(
                (item) => item.name_layer === nameLayer
            );
            if (dataCompareDatabase || dataCompareListLayer) {
                $("#msg-name-layer").innerText =
                    "This layer name already exists";
                nameLayerElement.oninput = () => {
                    $("#msg-name-layer").innerText = "";
                };
            } else {
                setDbSetLayer(e);
            }
        });
}

function setDbSetLayer(e) {
    console.log(e.type);
    if (e.type === "dblclick") {
        const [x, y] = convertToPosition(e.layerX, e.layerY, viewer);
        handleClick(x, y);
    } else if (e.type === "touchstart") {
        var rect = e.target.getBoundingClientRect();
        const [x, y] = convertToPosition(
            e.targetTouches[0].pageX - rect.left,
            e.targetTouches[0].pageY - rect.top,
            viewer
        );
        handleClick(x, y);
    }
}
function handleClick(x, y) {
    xoElement.value = x.toFixed(2);
    yoElement.value = y.toFixed(2);
    xoRangeElement.value = x.toFixed(2);
    yoRangeElement.value = y.toFixed(2);

    dataLayerModel.xo = x;
    dataLayerModel.yo = y;

    dataLayerModel.name_layer =
        nameLayerElement.value || `layer${time.getTime()}`;
    dataLayerModel.type_layer = $("#type-layer").value;
    dataLayerModel.width_layer = Number($("#width-layer").value);
    dataLayerModel.height_layer = Number($("#height-layer").value);
    dataLayerModel.z_rotate = Number($("#z-rotate").value);

    nameLayerElement.value = "";

    const layer = createModelLayer();

    saveDataToDatabase(dataLayerModel);
    mvibot_layer_active.push(layer);
    displayLayer(mvibot_layer_active);
    renderLayer(dataLayerSaveDatabase);
}

$("#type-layer").onchange = (e) => {
    dataLayerModel.type_layer = e.target.value;
    const layer = createModelLayer();

    if (mvibot_layer_active.length - countLayerDb > 0) {
        dataLayerSaveDatabase.pop();
        saveDataToDatabase(dataLayerModel);
    }

    if (mvibot_layer_active.length - countLayerDb > 0) {
        mvibot_layer_active.pop();
        mvibot_layer_active.push(layer);
    }
    displayLayer(mvibot_layer_active);
};

$$(".layer-range").forEach((element) => {
    element.oninput = (e) => {
        const idCurrentInput = e.target.id.replace("-range", "");
        $(`#${idCurrentInput}`).value = e.target.value;
        const idCurrentInputChang = idCurrentInput.replace("-", "_");
        dataLayerModel[idCurrentInputChang] = Number(e.target.value);

        const layer = createModelLayer();

        if (mvibot_layer_active.length - countLayerDb > 0) {
            dataLayerSaveDatabase.pop();
            saveDataToDatabase(dataLayerModel);
        }

        if (mvibot_layer_active.length - countLayerDb > 0) {
            mvibot_layer_active.pop();
            mvibot_layer_active.push(layer);
        }
        displayLayer(mvibot_layer_active);
    };
});

function saveDataToDatabase(dataLayerModel) {
    let {
        z_rotate: deg,
        height_layer: height,
        width_layer: width,
        ...rest
    } = dataLayerModel;
    const yawo = Number(deg / 180) * Math.PI;
    const dataLayerNew = { yawo, height, width, ...rest };
    dataLayerSaveDatabase.push(dataLayerNew);
}

const deleteLayer = (id) => {
    deleteAllLayer(mvibot_layer_active);
    mvibot_layer_active.splice(id + countLayerDb, 1);
    dataLayerSaveDatabase.splice(id, 1);
    displayLayer(mvibot_layer_active);
    renderLayer(dataLayerSaveDatabase);
};

function renderLayer(mvibot_layer_active) {
    const html = [];
    mvibot_layer_active.map((item, index) => {
        html.push(
            `<div class="flex justify-between px-8 py-3 select-none hover:bg-[#cccccc25]">
                <span class="">${item.name_layer}</span>
                <button id-delete=${index} class="delete-layer-btn text-[rgba(51,51,51,0.34)] px-2 hover:text-[#333]">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>`
        );
    });
    $("#layer-container").innerHTML = html.join("");
    handleDeleteLayer();
}

function handleDeleteLayer() {
    $$(".delete-layer-btn").forEach((item, index) => [
        (item.onclick = () => {
            deleteLayer(index);
        }),
    ]);
}

$("#save-layer-btn").onclick = (e) => {
    e.preventDefault();
    const dataLayer = JSON.stringify(dataLayerSaveDatabase);
    $("#data-layer").value = dataLayer;
    $("#form-add-layer").submit();
};

function addLayerDbToLayerActive() {
    dataLayerFromDatabase.forEach((item) => {
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
}

// let x, y;

// document.onkeydown = (e) => {
//     switch (e.key) {
//         case "ArrowRight":
//             // !e.shiftKey || (x = x + 1);
//             dataLayerModel.xo += 1;
//             const layer = const layer = createModelLayer();
//             console.log(layer);
//             break;
//         case "ArrowUp":
//             !e.shiftKey || (y = y + 1);
//             y = y + 0.1;
//             console.log(2);
//             break;
//         case "ArrowDown":
//             !e.shiftKey || (y = y - 1);
//             y = y - 0.1;
//             console.log(3);
//             break;
//         case "ArrowLeft":
//             !e.shiftKey || (x = x - 1);
//             x = x - 0.1;
//             console.log(4);
//             break;
//         default:
//             break;
//     }
// };

const map_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/map",
    messageType: "nav_msgs/OccupancyGrid",
});
map_listener.subscribe(function (message) {
    const resolution = message.info.resolution;
    const width = message.info.width;
    const height = message.info.height;
    const positionX = message.info.origin.position.x;
    const positionY = message.info.origin.position.y;

    const xMax = Number((width * resolution + positionX).toFixed(2));
    const xMin = Number(positionX.toFixed(2));
    const yMin = Number(positionY.toFixed(2));
    const yMax = Number((height * resolution + positionY).toFixed(2));

    const xWidth = Math.abs(xMax) + Math.abs(xMin);
    const yWidth = Math.abs(yMax) + Math.abs(yMin);

    $("#width-layer-range").setAttribute("max", xWidth);
    $("#height-layer-range").setAttribute("max", yWidth);

    $("#xo-range").setAttribute("min", xMin);
    $("#xo-range").setAttribute("max", xMax);
    $("#yo-range").setAttribute("min", yMin);
    $("#yo-range").setAttribute("max", yMax);
});

function createModelLayer() {
    const degInput = (Number(dataLayerModel.z_rotate) / 180) * Math.PI;
    const { z, w } = mathYaw(degInput);
    const layer = new mvibot_layer(
        dataLayerModel.name_layer,
        dataLayerModel.width_layer,
        dataLayerModel.height_layer,
        dataLayerModel.xo,
        dataLayerModel.yo,
        dataLayerModel.type_layer,
        z,
        w
    );

    return layer;
}
