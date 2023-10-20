import Map from "../Object/Map.js";

const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);

const createLayer = getNode("#create-layer");
const mapActive = getNode("[data-map-active]")?.dataset.mapActive || "no_map";

const map = new Map({ mapID: "map", nameMap: mapActive });

(function init() {
    map.create();
    handleLayer();
    console.log(map.layer.layerRosToDb());
})();

function handleLayer() {
    createLayer.onchange = (e) => {
        const is = e.target.checked;
        is ? map.layer.set.create.enable() : map.layer.set.create.disable();
    };
}
