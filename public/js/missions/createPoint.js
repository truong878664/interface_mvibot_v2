import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import displayPoint from "../rosModule/displayPoint.js";
import displayPose from "../rosModule/displayPose.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import { setPosition } from "../rosModule/functionHandler.js";
import { $ } from "../main.js";
import setSizeMap from "../rosModule/getSizeMap.js";
import reloadWhenOrientation from "../reloadOnOrientation.js";
import { displayLayer, markerClient } from "../rosModule/layer/markerClient.js";
import { mvibot_layer } from "../rosModule/classMvibot.js";
import mathYaw from "../rosModule/mathYaw.js";
import { markerClientPath } from "../rosModule/path/markerClientPath.js";
import validateInputSubmit from "../functionHandle/validateForm.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);

createPoint(viewer, tfClient);
createPose(viewer, tfClient);

markerClient(tfClient, viewer);
markerClientPath(tfClient, viewer);
addLayerDbToLayerActive();

displayPoint(0, 0);
displayPose(0, 0, 0, 1);

setSizeMap();
setPosition();

reloadWhenOrientation();

function addLayerDbToLayerActive() {
    const mvibot_layer_active = [];
    fetch("/dashboard/missions/layer-active")
        .then((res) => res.json())
        .then((data) => {
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

export { viewer, mapElement };
