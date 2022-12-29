import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import displayPoint from "../rosModule/displayPoint.js";
import displayPose from "../rosModule/displayPose.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import { setPosition } from "../rosModule/functionHandler.js";
import { $, toggerMessage } from "../main.js";
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

$(".point-submit-btn").onclick = (e) => {
    e.preventDefault();
    const name_position = $('[name="name_position"]');
    const x = $('[name="x"]');
    const y = $('[name="y"]');
    const z = $('[name="z"]');
    const w = $('[name="w"]');
    const time_out = $('[name="time_out"]');
    const color_position = $('[name="color_position"]');
    const mode_position = $('[name="mode_position"]');
    const mode_child = $('[name="mode_child"]');
    const map = $('[name="map"]');

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
        map: map.value,
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
        storeData("/api/position", dataPosition);
        name_position.value = "";
        time_out.value = -1;
        mode_position.value = "";
        mode_child.value = "";
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
            $("#form-create-point-checkbox").checked = false;
        })
        .catch(function (res) {
            console.log(res);
            toggerMessage(
                "error",
                "An internet error has occurred or your type data, please try again"
            );
        });
}

export { viewer, mapElement };
