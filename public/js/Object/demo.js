import { toggerMessage } from "../main.js";
import Map from "./Map.js";

const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);

const xElement = getNode("[name='x']");
const yElement = getNode("[name='y']");
const rElement = getNode("[name='r']");
const isDbClick = getNode("#allow-dbclick");
const lockCamera = getNode("#lock-rotate");
const createLayer = getNode("#create-layer");
const selectLayer = getNode("#select-layer");
const getInfoPositionBtn = getNode(".get-info-position-btn");
const resetMapBtn = getNode(".reset-map-btn");

let map = new Map({ mapID: "map", nameMap: "map_878664" });

map.create();
map.point.create({});
map.pose.create({});
map.listener.onchange(() => {
    map.point.display({});
    map.pose.display({});
    xElement.value = map.position.x;
    yElement.value = map.position.y;
});

map.mapElement.addEventListener("infoComplete", () => {
    [xElement, yElement].forEach((element) => {
        const name = element.name;
        const limit = map.info?.limit[name];
        element.setAttribute("min", limit?.min);
        element.setAttribute("max", limit?.max);
    });
});

[xElement, yElement, rElement].forEach((element) => {
    element.oninput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        map.position = { [name]: value };
    };
});

isDbClick.onchange = (e) => {
    const is = e.target.checked;
    is ? map.clickCreatePoint.enable() : map.clickCreatePoint.disable();
};

lockCamera.onchange = (e) => {
    const is = e.target.checked;
    is ? map.camera.rotate.disable() : map.camera.rotate.enable();
};
createLayer.onchange = (e) => {
    const is = e.target.checked;
    is ? map.layer.set.create.enable() : map.layer.set.create.disable();
};

selectLayer.onchange = (e) => {
    const is = e.target.checked;
    is ? map.layer.set.select.enable() : map.layer.set.select.disable();
};

console.log(map);

getInfoPositionBtn.addEventListener("click", (e) => {
    console.log(map.position);
});
resetMapBtn.addEventListener("click", (e) => {
    console.log(map.layerList);
});

// 'nothing'
