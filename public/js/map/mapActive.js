import { $ } from "../main.js";
import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import topicString from "../rosModule/topicString.js";

createMapMapActive("/nomap");

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
    topicString("/request_action", `active_map|~name_map=${mapActive}~`);
};

$("#delete-map-btn").onclick = () => {
    const mapActive = $("#choose-map-active").value;
    topicString("/request_action", `delete_map|~name_map=${mapActive}~`);
    location.reload();
};