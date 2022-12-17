import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import { $ } from "../main.js";
import { mvibot_layer } from "../rosModule/classMvibot.js";
import { markerClient, displayLayer } from "../rosModule/layer/markerClient.js";
import {
    markerClientPath,
    displayPath,
} from "../rosModule/path/markerClientPath.js";
import createJoystick from "../createJoystick/createJoystick.js";
import mathYaw from "../rosModule/mathYaw.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

markerClient(tfClient, viewer);
markerClientPath(tfClient, viewer);

const mvibot_layer_active = [];

addLayerDbToLayerActive();

displayPath();

createAxes(viewer);

createPoint(viewer, tfClient);
createPose(viewer, tfClient);
displayLayer(tfClient);

createJoystick();

function addLayerDbToLayerActive() {
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
