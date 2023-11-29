import ros, { $, $$, toggerMessage } from "../main.js";
import createMap from "../rosModule/createMap.js";
import createTfClient from "../rosModule/createTfClient.js";
import createAxes from "../rosModule/createAxes.js";
import createPoint from "../rosModule/createPoint.js";
import createPose from "../rosModule/createPose.js";
import displayPoint from "../rosModule/displayPoint.js";
import {
    markerClient,
    displayLayer,
    deleteAllLayer,
} from "../rosModule/layer/markerClient.js";
import { mvibot_layer, mvibot_color } from "../rosModule/classMvibot.js";
import { convertToPosition } from "../rosModule/clickSetPointMap.js";
import lockZ from "../rosModule/lockZ.js";
import mathYaw from "../rosModule/mathYaw.js";
import reloadWhenOrientation from "../reloadOnOrientation.js";
import confirmationForm from "../functionHandle/confirmationForm.js";

const mapElement = $("#map");
const heightMap = mapElement.offsetHeight;
const widthMap = mapElement.offsetWidth;

const tfClient = createTfClient();
let viewer = createMap(heightMap, widthMap, tfClient);
reloadWhenOrientation();

const mvibot_layer_active = [];

const xoElement = $("#xo");
const yoElement = $("#yo");
const xoRangeElement = $("#xo-range");
const yoRangeElement = $("#yo-range");
const mapActive = $("#map-active").innerText;
const nameLayerElement = $("#name_layer");
// const dataLayerFromDatabase = JSON.parse($("#data-layer-json").value);

let countLayerDb;

let dataLayerSaveDatabase = [];

function start() {
    createAxes(viewer);
    createPoint(viewer, tfClient);
    createPose(viewer, tfClient);
    displayPoint(0, 0);
    markerClient(tfClient, viewer);
    handleLockZ(viewer);

    getLayer();

    setParameterRange();

    handleDbClick();
    handleDbTouch();
    handleChangeRange();
    handleSaveLayer();

    linkInputRange();
}
start();

const dataLayerModel = {
    name_map_active: mapActive,
    name_layer: 0,
    type_layer: "",
    width_layer: 0,
    height_layer: 0,
    z_rotate: 0,
    xo: 0,
    yo: 0,
};

function getLayer() {
    deleteAllLayer(mvibot_layer_active);
    mvibot_layer_active.splice(0, mvibot_layer_active.length);
    fetch("/api/layer")
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
                    w,
                );

                mvibot_layer_active.push(layer);
            });

            countLayerDb = data.length;
            return data;
        })
        .then((data) => {
            displayLayer(mvibot_layer_active);
            renderListLayer(mvibot_layer_active);
        });
}

function checkNameLayer(nameLayer, e) {
    fetch("/all-layer")
        .then((res) => res.json())
        .then((data) => {
            const dataCompareDatabase = data.find(
                (item) => item.name_layer === nameLayer,
            );
            const dataCompareListLayer = dataLayerSaveDatabase.find(
                (item) => item.name_layer === nameLayer,
            );
            if (dataCompareDatabase || dataCompareListLayer) {
                $("#msg-name-layer").innerText =
                    "This layer name already exists";
                nameLayerElement.oninput = () => {
                    $("#msg-name-layer").innerText = "";
                };
            } else {
                setDbSetLayer(e);
                nameLayerElement.blur();
            }
        });
}

function setDbSetLayer(e) {
    if (e.type === "dblclick") {
        const [x, y] = convertToPosition(e.layerX, e.layerY, viewer);
        handleClickSetPositionLayer(x, y);
    } else if (e.type === "touchstart") {
        var rect = e.target.getBoundingClientRect();
        const [x, y] = convertToPosition(
            e.targetTouches[0].pageX - rect.left,
            e.targetTouches[0].pageY - rect.top,
            viewer,
        );
        handleClickSetPositionLayer(x, y);
    }
}

function handleClickSetPositionLayer(x, y) {
    xoElement.value = x.toFixed(2);
    yoElement.value = y.toFixed(2);
    xoRangeElement.value = x.toFixed(2);
    yoRangeElement.value = y.toFixed(2);

    dataLayerModel.xo = x;
    dataLayerModel.yo = y;

    dataLayerModel.name_layer = nameLayerElement.value;
    dataLayerModel.type_layer = $("#type-layer").value;
    dataLayerModel.width_layer = Number($("#width-layer").value);
    dataLayerModel.height_layer = Number($("#height-layer").value);
    dataLayerModel.z_rotate = Number($("#z-rotate").value);

    nameLayerElement.value = "";

    const layer = createModelLayer();

    saveDataToDatabase(dataLayerModel);
    mvibot_layer_active.push(layer);
    displayLayer(mvibot_layer_active);
    renderLayer(dataLayerSaveDatabase);
}

function selectLayer() {
    let oldColor;
    let oldIndex;
    Array.from($$(".layer-item-show"))
        .reverse()
        .forEach((element, index) => {
            element.onclick = function (e) {
                const currentLayer = e.target.closest(".layer-item-show");
                const isCurrentLayerActive =
                    currentLayer.dataset.status === "active";

                const layerActive = $(".layer-item-show[data-status=active]");
                (layerActive || isCurrentLayerActive) &&
                    (layerActive.dataset.status = "");
                element.dataset.status = isCurrentLayerActive ? "" : "active";

                if (mvibot_layer_active[oldIndex])
                    mvibot_layer_active[oldIndex].color = oldColor;
                oldColor = mvibot_layer_active[index].color;
                oldIndex = index;

                const colorSelect = new mvibot_color(0, 1, 0, 0.3);

                mvibot_layer_active[index].color = isCurrentLayerActive
                    ? oldColor
                    : colorSelect;

                displayLayer(mvibot_layer_active);
            };
        });
}

function handleChangeRange() {
    $("#type-layer").onchange = (e) => {
        dataLayerModel.type_layer = e.target.value;
        const layer = createModelLayer();

        if (mvibot_layer_active.length - countLayerDb > 0) {
            dataLayerSaveDatabase.pop();
            saveDataToDatabase(dataLayerModel);
        }
        if (mvibot_layer_active.length - countLayerDb > 0) {
            mvibot_layer_active.pop();
            mvibot_layer_active.push(layer);
        }
        displayLayer(mvibot_layer_active);
    };

    $$(".layer-range").forEach((element) => {
        element.oninput = (e) => {
            const idCurrentInput = e.target.id.replace("-range", "");
            $(`#${idCurrentInput}`).value = e.target.value;
            const idCurrentInputChang = idCurrentInput.replace("-", "_");
            dataLayerModel[idCurrentInputChang] = Number(e.target.value);

            const layer = createModelLayer();

            if (mvibot_layer_active.length - countLayerDb > 0) {
                dataLayerSaveDatabase.pop();
                saveDataToDatabase(dataLayerModel);
            }
            if (mvibot_layer_active.length - countLayerDb > 0) {
                mvibot_layer_active.pop();
                mvibot_layer_active.push(layer);
            }
            displayLayer(mvibot_layer_active);
        };
    });
}

function saveDataToDatabase(dataLayerModel) {
    let {
        z_rotate: deg,
        height_layer: height,
        width_layer: width,
        ...rest
    } = dataLayerModel;
    const yawo = Number(deg / 180) * Math.PI;
    const dataLayerNew = { yawo, height, width, ...rest };
    dataLayerSaveDatabase.push(dataLayerNew);
}

const deleteLayer = (id) => {
    deleteAllLayer(mvibot_layer_active);
    mvibot_layer_active.splice(id + countLayerDb, 1);
    dataLayerSaveDatabase.splice(id, 1);

    displayLayer(mvibot_layer_active);
    renderLayer(dataLayerSaveDatabase);
};

function renderLayer(dataLayerSaveDatabase) {
    const html = [];
    dataLayerSaveDatabase.map((item, index) => {
        html.push(
            `<div class="flex justify-between px-8 py-3 select-none hover:bg-[#cccccc25]">
                <span class="">${item.name_layer}</span>
                <button id-delete=${index} class="delete-layer-btn text-[rgba(51,51,51,0.34)] px-2 hover:text-[#333]">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>`,
        );
    });
    $("#layer-container").innerHTML = html.join("");
    handleDeleteLayer();
}

function handleDeleteLayer() {
    $$(".delete-layer-btn").forEach((item, index) => [
        (item.onclick = () => {
            deleteLayer(index);
        }),
    ]);
}

function handleSaveLayer() {
    $("#save-layer-btn").onclick = (e) => {
        e.preventDefault();

        //unactive layer
        const layerActive = $(".layer-item-show[data-status=active]");
        if (layerActive) {
            layerActive.click();
        }

        console.log(dataLayerSaveDatabase);
        fetch("/api/layer", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(dataLayerSaveDatabase),
        })
            .then(function (res) {
                console.log(res);
                if (res.status == 200) {
                    renderLayer([]);
                    renderListLayer(mvibot_layer_active);

                    countLayerDb += dataLayerSaveDatabase.length;

                    dataLayerSaveDatabase = [];
                    toggerMessage("success", "save layer successfully");
                } else {
                    toggerMessage("error", `error(code:${res.status})`);
                }
            })
            .catch(function (res) {
                console.log(res);
            });
    };
}

function setParameterRange() {
    const map_listener = new ROSLIB.Topic({
        ros: ros,
        name: "/map",
        messageType: "nav_msgs/OccupancyGrid",
    });
    map_listener.subscribe(function (message) {
        const resolution = message.info.resolution;
        const width = message.info.width;
        const height = message.info.height;
        const positionX = message.info.origin.position.x;
        const positionY = message.info.origin.position.y;

        const xMax = Number((width * resolution + positionX).toFixed(2));
        const xMin = Number(positionX.toFixed(2));
        const yMin = Number(positionY.toFixed(2));
        const yMax = Number((height * resolution + positionY).toFixed(2));

        const xWidth = Math.abs(xMax) + Math.abs(xMin);
        const yWidth = Math.abs(yMax) + Math.abs(yMin);

        $("#width-layer-range").setAttribute("max", xWidth);
        $("#height-layer-range").setAttribute("max", yWidth);

        $("#xo-range").setAttribute("min", xMin);
        $("#xo-range").setAttribute("max", xMax);
        $("#yo-range").setAttribute("min", yMin);
        $("#yo-range").setAttribute("max", yMax);
    });
}

function createModelLayer() {
    const degInput = (Number(dataLayerModel.z_rotate) / 180) * Math.PI;
    const { z, w } = mathYaw(degInput);
    const layer = new mvibot_layer(
        dataLayerModel.name_layer,
        dataLayerModel.width_layer,
        dataLayerModel.height_layer,
        dataLayerModel.xo,
        dataLayerModel.yo,
        dataLayerModel.type_layer,
        z,
        w,
    );

    return layer;
}

function linkInputRange() {
    const listInputLayer = [
        "width_layer",
        "height_layer",
        "xo",
        "yo",
        "z_rotate",
    ];

    listInputLayer.forEach((item) => {
        const itemModel = item.replace("_", "-");
        $(`#${itemModel}`).onchange = (e) => {
            $(`#${itemModel}-range`).value = e.target.value;
            console.log($(`#${itemModel}-range`));
            dataLayerModel[item] = Number(e.target.value);

            const layer = createModelLayer();

            if (mvibot_layer_active.length - countLayerDb > 0) {
                dataLayerSaveDatabase.pop();
                saveDataToDatabase(dataLayerModel);
            }

            if (mvibot_layer_active.length - countLayerDb > 0) {
                mvibot_layer_active.pop();
                mvibot_layer_active.push(layer);
            }
            displayLayer(mvibot_layer_active);
        };
    });
}

function handleLockZ(viewer) {
    lockZ(viewer);

    mapElement.addEventListener("mousemove", () => {
        lockZ(viewer);
    });

    mapElement.addEventListener("touchmove", () => {
        lockZ(viewer);
    });
}

function handleDbClick() {
    mapElement.addEventListener("dblclick", (e) => {
        if (nameLayerElement.value === "") {
            $("#msg-name-layer").innerText = "please enter this field";
            nameLayerElement.oninput = () => {
                $("#msg-name-layer").innerText = "";
            };
        } else {
            checkNameLayer(nameLayerElement.value, e);
        }
    });
}

function handleDbTouch() {
    mapElement.addEventListener("touchstart", tapHandler);

    var tapedTwice = false;
    let oldX;
    let oldY;
    let isTouch = false;
    function tapHandler(e) {
        if (e.touches.length < 2) {
            isTouch = !!(
                Math.abs(e.touches[0].pageX - oldX) < 70 &&
                Math.abs(e.touches[0].pageY - oldY) < 70
            );
            oldX = e.touches[0].pageX;
            oldY = e.touches[0].pageY;

            if (!tapedTwice) {
                tapedTwice = true;
                setTimeout(function () {
                    tapedTwice = false;
                    isTouch = false;
                }, 300);
                return false;
            }

            if (tapedTwice && isTouch) {
                e.preventDefault();
                if (nameLayerElement.value === "") {
                    $("#msg-name-layer").innerText = "please enter this field";
                    nameLayerElement.oninput = () => {
                        $("#msg-name-layer").innerText = "";
                    };
                } else {
                    console.log(1);
                    checkNameLayer(nameLayerElement.value, e);
                }
            }
        }
    }
}

function renderListLayer(mvibot_layer_active) {
    const html = [];
    const layer_active = [...mvibot_layer_active].reverse();
    layer_active.map((item) => {
        html.push(`
            <div data-status="" data-name="${item.name_layer}" class="px-4 py-2 flex justify-between items-center hover:bg-[rgba(204,204,204,0.2)] cursor-pointer data-[status=active]:bg-[rgba(204,204,204,0.43)]  layer-item-show">
                <span class="">${item.name_layer}</span>
                <button class="text-[rgba(51,51,51,0.38)] hover:text-[#333] delete-layer-db-btn" layer-delete="${item.name_layer}">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `);
    });
    $("#list-layer-item").innerHTML = html.join("");
    HandleDeleteLayer();
    selectLayer();
}

function HandleDeleteLayer() {
    $$(".delete-layer-db-btn").forEach((element) => {
        element.onclick = (e) => {
            const nameLayer = e.target.getAttribute("layer-delete");
            confirmationForm({
                message: "Do you want to delete this layer?",
                callback: () => {
                    deleteLayerDb(nameLayer);
                },
            });
        };
    });
}

function deleteLayerDb(nameLayer) {
    fetch(`/api/layer/${nameLayer}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status == 200) {
                toggerMessage("success", "delete layer successfully");
                getLayer();
            } else {
                toggerMessage("error", "delete error, please try again");
            }
        });
}
