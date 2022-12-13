import { $, $$ } from "./main.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import createAxes from "./rosModule/createAxes.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import displayPoint from "./rosModule/displayPoint.js";
import { markerClient, displayLayer } from "./rosModule/layer/markerClient.js";
import { mvibot_layer } from "./rosModule/classMvibot.js";
import { convertToPosition } from "./rosModule/clickSetPointMap.js";
import lockZ from "./rosModule/lockZ.js";
import mathYaw from "./rosModule/mathYaw.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);
createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayPoint(0, 0);
lockZ(viewer);

markerClient(tfClient, viewer);

const mvibot_layer_active = [];

const xoElement = $("#xo");
const yoElement = $("#yo");
const xoRangeElement = $("#xo-range");
const yoRangeElement = $("#yo-range");
const mapActive = $("#map-active").innerText;

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
    const time = new Date();
    const [x, y] = convertToPosition(e.offsetX, e.offsetY, viewer);
    xoElement.value = x.toFixed(2);
    yoElement.value = y.toFixed(2);
    xoRangeElement.value = x.toFixed(2);
    yoRangeElement.value = y.toFixed(2);

    dataLayer.xo = x;
    dataLayer.yo = y;

    dataLayer.name_layer = $("#name_layer").value || `layer${time.getTime()}`;
    dataLayer.type_layer = $("#type-layer").value;
    dataLayer.width_layer = Number($("#width-layer").value);
    dataLayer.height_layer = Number($("#height-layer").value);
    dataLayer.z_rotate = Number($("#z-rotate").value);

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

    console.log(mvibot_layer_active);
    mvibot_layer_active.push(layer);
    displayLayer(mvibot_layer_active);
});

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

        console.log(dataLayerSaveDatabase);
        mvibot_layer_active.pop();
        mvibot_layer_active.push(layer);
        displayLayer(mvibot_layer_active);
    };
});

const datax = [
    {
        name_layer: "layer1670906141326",
        width_layer: 1,
        height_layer: 1,
        xo: -0.4522844363038446,
        yo: 3.5403069294219143,
        color: { r: 0.2, g: 0, b: 0.8, a: 0.3 },
        scale: { x: 1, y: 1, z: 0.01 },
        pose: {
            position: {
                x: -0.4522844363038446,
                y: 3.5403069294219143,
                z: 0.01,
            },
            orientation: {
                x: 0,
                y: 0,
                z: 0.008726535498373935,
                w: 0.9999619230641713,
            },
        },
    },
    {
        name_layer: "layer1670906142726",
        width_layer: 1,
        xo: 3.8,
        yo: 0.0035060809027252556,
        color: { r: 0.2, g: 0, b: 0.8, a: 0.3 },
        scale: { x: 1, z: 0.01 },
        pose: {
            position: {
                x: 3.8234232342314314231423,
                y: 0.0035060809027252556,
                z: 0.01,
            },
            orientation: {
                x: 0,
                y: 0,
                z: 0.008726535498373935,
                w: 0.9999619230641713,
            },
        },
    },
];

function saveDataToDatabase(dataLayer) {
    let {
        z_rotate: yawo,
        height_layer: height,
        width_layer: width,
        ...rest
    } = dataLayer;
    const dataLayerNew = { yawo, height, width, ...rest };
    dataLayerSaveDatabase.push(dataLayerNew);
}
