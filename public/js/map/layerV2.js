import Map from "../Object/Map.js";
import { getNode, getNodeByName } from "../functionHandle/fsCustom.js";

const mapActive = getNode("[data-map-active]")?.dataset.mapActive || "no_map";
const createLayer = getNodeByName("create-layer");
const toolLayer = getNodeByName("tool-layer");
const defaultLayer = getNodeByName("default-layer");
const selectLayer = getNodeByName("select-layer");
const map = new Map({ mapID: "map", nameMap: mapActive });
(function init() {
    map.create();
    handleLayer();
})();

function handleLayer() {
    const changeSelect = (element) => {
        element.checked = true;
        toolLayer.dispatchEvent(new Event("change"));
    };
    toolLayer.onchange = () => {
        createLayer.checked
            ? map.layer.set.create.enable()
            : map.layer.set.create.disable();
    };
    window.addEventListener("keydown", (e) => {
        const keyShorthand = {
            c: createLayer,
            v: defaultLayer,
            s: selectLayer,
        };
        const { key } = e;
        if (keyShorthand[key]) changeSelect(keyShorthand[key]);
    });
}
