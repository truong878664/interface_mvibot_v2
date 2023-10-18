import Map from "../Object/Map.js";

const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);
const createLayer = getNode("#create-layer");
const map = new Map({ mapID: "map", nameMap: "map_878664" });

(function init() {
    map.create();
    handleLayer();
})();

function handleLayer() {
    createLayer.onchange = (e) => {
        const is = e.target.checked;
        is ? map.layer.set.create.enable() : map.layer.set.create.disable();
    };
}
