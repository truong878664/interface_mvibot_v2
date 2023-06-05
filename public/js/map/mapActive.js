import confirmationForm from "../functionHandle/confirmationForm.js";
import { $, $$, toggerMessage } from "../main.js";
import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import topicString from "../rosModule/topicString.js";

createMapMapActive("/no_map");

function createMapMapActive(topic) {
    const heightMap = $("#map").offsetHeight;
    const widthMap = $("#map").offsetWidth;

    const tfClient = createTfClient();
    let viewer = createMap(heightMap, widthMap, tfClient, topic);
    createAxes(viewer);
}

$("#choose-map-active").onchange = (e) => {
    let mapSelect = e.target.value;
    if (mapSelect) {
        $("#map").remove();
        $(
            "#map-wrapper"
        ).innerHTML = `<div class="w-full h-full" id="map"></div>`;
        topicString("/map_select", mapSelect);
        createMapMapActive("/map_selector");
    }
};

$("#active-map-btn").onclick = () => {
    const mapActive = $("#choose-map-active").value;
    if (mapActive) {
        confirmationForm({
            message: "Do you want to active this map?",
            callback: () => {
                topicString("/request_action", `active_map|~name_map=${mapActive}~`);
                toggerMessage("success", "Map activated");
            },
        });
    } else {
        toggerMessage("error", "Choose map!");
    }
};

$(".delete-map-active-btn").onclick = () => {
    confirmationForm({
        message: "Do you want to delete this map?",
        callback: deleteMap,
    });
};

function deleteMap() {
    const mapDelete = $("#choose-map-active");
    if (mapDelete.value) {
        topicString(
            "/request_action",
            `delete_map|~name_map=${mapDelete.value}~`
        );
        $("#map").remove();
        toggerMessage("success", "Map deleted");

        $(
            "#map-wrapper"
        ).innerHTML = `<div class="w-full h-full" id="map"></div>`;
        createMapMapActive("/map_selector");

        $(`.choose-map-active-item[data-map=${mapDelete.value}]`).remove();
        mapDelete.value = "";
    } else {
        toggerMessage("error", "Choose map!");
    }
}
