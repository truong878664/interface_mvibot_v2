import { $, $$ } from "./main.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import createAxes from "./rosModule/createAxes.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import displayPoint from "./rosModule/displayPoint.js";
import {
    markerClient,
    displayLayer,
    deleteAllLayer,
} from "./rosModule/layer/markerClient.js";
import { mvibot_layer } from "./rosModule/classMvibot.js";
import { convertToPosition } from "./rosModule/clickSetPointMap.js";
import lockZ from "./rosModule/lockZ.js";
import mathYaw from "./rosModule/mathYaw.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const tfClient = createTfClient();
const viewer = createMap(heightMap, widthMap, tfClient);

const dataLayerFromDatabase = JSON.parse(
    '{"name_layer":"asdf","width_layer":7.8,"height_layer":7.8,"xo":-2.1168759187897623,"yo":4.395283194523269,"color":{"r":0.2,"g":0,"b":0.8,"a":0.3},"scale":{"x":7.8,"y":7.8,"z":0.01},"pose":{"position":{"x":-2.1168759187897623,"y":4.395283194523269,"z":0.01},"orientation":{"x":0,"y":0,"z":-0.49242356010346705,"w":0.8703556959398997}}}'
);

// const layer = new mvibot_layer(
//     name_layer,
//     width_layer,
//     height_layer,
//     xo,
//     yo,
//     type_layer,
//     z,
//     w
// );

// [
//     {
//         name_map_active: "map4",
//         name_layer: "asdf",
//         width: 1,
//         height: 1,
//         xo: 4.782226486240947,
//         yo: 0.5411549991225735,
//         type_layer: "dead_zone",
//         yawo: 0.017453292519943295,
//     },
// ];
const mvibot_layer_active = [dataLayerFromDatabase];

console.log(mvibot_layer_active);
displayLayer(mvibot_layer_active);

// name_map_active: "",
//     name_layer: "",
//     type_layer: "",
//     width_layer: "",
//     height_layer: "",
//     z_rotate: "",
//     xo: "",
//     yo: "",

const xoElement = $("#xo");
const yoElement = $("#yo");
const xoRangeElement = $("#xo-range");
const yoRangeElement = $("#yo-range");
const mapActive = $("#map-active").innerText;
const nameLayerElement = $("#name_layer");

createAxes(viewer);
createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayPoint(0, 0);
lockZ(viewer);
nameLayerElement.focus();

markerClient(tfClient, viewer);

mapElement.addEventListener("mousemove", () => {
    lockZ(viewer);
});

const dataLayer = {
    name_map_active: "",
    name_layer: "",
    type_layer: "",
    width_layer: "",
    height_layer: "",
    z_rotate: "",
    xo: "",
    yo: "",
};
dataLayer.name_map_active = mapActive;

const dataLayerSaveDatabase = [];

mapElement.addEventListener("dblclick", (e) => {
    if (nameLayerElement.value === "") {
        $("#msg-name-layer").innerText = "please enter this field";
        nameLayerElement.focus();
        nameLayerElement.oninput = () => {
            $("#msg-name-layer").innerText = "";
        };
    } else {
        const time = new Date();
        const [x, y] = convertToPosition(e.offsetX, e.offsetY, viewer);
        xoElement.value = x.toFixed(2);
        yoElement.value = y.toFixed(2);
        xoRangeElement.value = x.toFixed(2);
        yoRangeElement.value = y.toFixed(2);

        dataLayer.xo = x;
        dataLayer.yo = y;

        dataLayer.name_layer =
            nameLayerElement.value || `layer${time.getTime()}`;
        dataLayer.type_layer = $("#type-layer").value;
        dataLayer.width_layer = Number($("#width-layer").value);
        dataLayer.height_layer = Number($("#height-layer").value);
        dataLayer.z_rotate = Number($("#z-rotate").value);

        nameLayerElement.value = "";

        const degInput = (Number(dataLayer.z_rotate) / 180) * Math.PI;
        const { z, w } = mathYaw(degInput);

        const layer = new mvibot_layer(
            dataLayer.name_layer,
            dataLayer.width_layer,
            dataLayer.height_layer,
            dataLayer.xo,
            dataLayer.yo,
            dataLayer.type_layer,
            z,
            w
        );

        saveDataToDatabase(dataLayer);
        mvibot_layer_active.push(layer);
        displayLayer(mvibot_layer_active);
        renderLayer(dataLayerSaveDatabase);
    }
});

const typeLayer = $("#type-layer");
typeLayer.onchange = (e) => {
    const degInput = (Number(dataLayer.z_rotate) / 180) * Math.PI;
    const { z, w } = mathYaw(degInput);
    dataLayer.type_layer = e.target.value;
    const layer = new mvibot_layer(
        dataLayer.name_layer,
        dataLayer.width_layer,
        dataLayer.height_layer,
        dataLayer.xo,
        dataLayer.yo,
        dataLayer.type_layer,
        z,
        w
    );
    dataLayerSaveDatabase.pop();
    saveDataToDatabase(dataLayer);

    mvibot_layer_active.pop();
    mvibot_layer_active.push(layer);
    displayLayer(mvibot_layer_active);
};

$$(".layer-range").forEach((element) => {
    element.oninput = (e) => {
        const idCurrentInput = e.target.id.replace("-range", "");
        $(`#${idCurrentInput}`).value = e.target.value;
        const idCurrentInputChang = idCurrentInput.replace("-", "_");
        dataLayer[idCurrentInputChang] = Number(e.target.value);

        const degInput = (Number(dataLayer.z_rotate) / 180) * Math.PI;
        const { z, w } = mathYaw(degInput);
        const layer = new mvibot_layer(
            dataLayer.name_layer,
            dataLayer.width_layer,
            dataLayer.height_layer,
            dataLayer.xo,
            dataLayer.yo,
            dataLayer.type_layer,
            z,
            w
        );

        if (dataLayerSaveDatabase.length > 0) {
            dataLayerSaveDatabase.pop();
            saveDataToDatabase(dataLayer);
        }

        if (mvibot_layer_active.length > 0) {
            mvibot_layer_active.pop();
            mvibot_layer_active.push(layer);
        }
        displayLayer(mvibot_layer_active);
    };
});

function saveDataToDatabase(dataLayer) {
    let {
        z_rotate: deg,
        height_layer: height,
        width_layer: width,
        ...rest
    } = dataLayer;
    const yawo = Number(deg / 180) * Math.PI;
    const dataLayerNew = { yawo, height, width, ...rest };
    dataLayerSaveDatabase.push(dataLayerNew);
    console.log(dataLayerSaveDatabase);
}

const deleteLayer = (id) => {
    deleteAllLayer(mvibot_layer_active);
    mvibot_layer_active.splice(id, 1);
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
    // console.log(dataLayer);
    $("#form-add-layer").submit();
};
