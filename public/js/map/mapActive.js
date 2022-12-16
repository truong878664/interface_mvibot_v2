import { $ } from "../main.js";
import createAxes from "../rosModule/createAxes.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import topicString from "../rosModule/topicString.js";

createMapMapActive("/map");

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
        topicString("/map_select", mapSelect);
        $("#map").remove();
        $(
            "#map-wrapper"
        ).innerHTML = `<div class="w-full h-full" id="map"></div>`;
        createMapMapActive("/map_selector");
    }
};
