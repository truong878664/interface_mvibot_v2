import { generateID } from "../functionHandle/createIdBrowser.js";
import { loadingHeader } from "../functionHandle/displayLoad.js";
import ros, { toggerMessage } from "../main.js";
import DispatchCustomEvent from "./DispatchCustomEvent.js";

export default class Map {
    mapID;
    width;
    height;
    ros;
    viewer;
    tfClient;
    _position = {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
    };
    _layerList = [];
    constructor({ mapID, width, height, nameMap }) {
        this.mapID = mapID;
        this.width = width;
        this.height = height;
        this.ros = ros;
        this.nameMap = nameMap;
        this.mapElement = document.getElementById(mapID);
        this.idTab = window.name;
        this.getInfo();
        this.layer.get();
        this.layer.topic = new ROSLIB.Topic({
            ros: this.ros,
            name: `/visualization_marker_layer${this.idTab}`,
            messageType: "visualization_msgs/Marker",
        });
        this.layer.listenerEventDisplayLayer();
        if (this.mapElement) {
            new DispatchCustomEvent("dbltouch", this.mapElement);
            new DispatchCustomEvent("press", this.mapElement);
        }
    }
    create(type = "all") {
        this.deleteMapCanvas();
        const rectMap = this.mapElement.getBoundingClientRect();
        const MIN_HEIGHT_MAP_IF_NOT = 500;
        const MIN_WIDTH_MAP_IF_NOT = 500;
        !this.width && (this.width = rectMap.width || MIN_WIDTH_MAP_IF_NOT);
        !this.height && (this.height = rectMap.height || MIN_HEIGHT_MAP_IF_NOT);
        const optionViewer = {
            divID: this.mapID,
            width: this.width,
            height: this.height,
            antialias: true,
            cameraZoomSpeed: 2,
            alpha: 0.5,
            cameraPose: { x: 0, y: 0, z: 90 },
        };
        this.viewer = new ROS3D.Viewer(optionViewer);
        this.tfClient = new ROSLIB.TFClient({
            ros: this.ros,
            rate: 10,
            fixedFrame: "/map",
            angularThres: 0.08,
            transThres: 0.05,
        });
        this.marker = new ROS3D.MarkerClient({
            ros: this.ros,
            tfClient: this.tfClient,
            topic: `/visualization_marker_layer${this.idTab}`,
            rootObject: this.viewer.scene,
        });
        this.occupancy = new ROS3D.OccupancyGridClient({
            ros: this.ros,
            rootObject: this.viewer.scene,
            continuous: true,
            topic: "/map",
        });
        if (type === "all") {
            this.axes();
        }
    }
    point = {
        create: ({ color = "#FD841F", id = "" }) => {
            new ROS3D.Point({
                ros: this.ros,
                rootObject: this.viewer.scene,
                tfClient: this.tfClient,
                topic: `/point_pub_${this.idTab}${id}`,
                color,
                queue_size: 3,
                throttle_rate: 1000,
                radius: 0.1,
            });
            return {
                display: ({ x, y }) => {
                    this.point.display({ x, y, id });
                },
            };
        },
        display: ({ x = this.position.x, y = this.position.y, id = "" }) => {
            const point_pub = new ROSLIB.Topic({
                ros: this.ros,
                name: `/point_pub_${this.idTab}${id}`,
                messageType: "geometry_msgs/PointStamped",
                queue_size: 0.1,
            });
            const point_msg = new ROSLIB.Message({
                header: { frame_id: "/map" },
                point: { x, y, z: 0 },
            });
            point_pub.publish(point_msg);
        },
        displayAll: (pointList) => {
            pointList.forEach((point) => {
                const { color_position: color, id, x, y, z, w } = point;
                this.point.create({ id }).display({ x, y });
                this.pose.create({ color, id }).display({ x, y, z, w });
            });
            console.log("display all");
        },
    };
    pose = {
        create: ({ color = "#EA047E", id = "", type = "normal" }) => {
            const typeList = {
                normal: { headDiameter: 0.3, shaftDiameter: 0.1, length: 2 },
                highline: { headDiameter: 0.5, shaftDiameter: 0.3, length: 2 },
            };

            new ROS3D.Pose({
                ros: this.ros,
                rootObject: this.viewer.scene,
                tfClient: this.tfClient,
                color,
                topic: `/pose_pub_${this.idTab}${id}`,
                ...typeList[type],
            });
            return {
                display: ({ x, y, z, w }) => {
                    this.pose.display({ x, y, z, w, id });
                },
            };
        },
        display: ({
            x = this.position.x,
            y = this.position.y,
            z = this.position.z,
            w = this.position.w,
            id = "",
        }) => {
            const pose_pub = new ROSLIB.Topic({
                ros: this.ros,
                name: `/pose_pub_${this.idTab}${id}`,
                messageType: "geometry_msgs/PoseStamped",
                queue_size: 1,
            });
            const pose_msg = new ROSLIB.Message({
                header: { frame_id: "/map" },
                pose: {
                    position: { x, y, z: 0 },
                    orientation: { x: 0, y: 0, z, w },
                },
            });
            pose_pub.publish(pose_msg);
        },
    };
    camera = {
        lockZ: () => {
            this.viewer.cameraControls.rotateUp(1.57);
        },
        rotate: {
            enable: () => {
                this.viewer.cameraControls.userRotateSpeed = 1;
                this.viewer.cameraControls.camera;
            },
            disable: () => {
                const { _x: x, _y: y } =
                    this.viewer.cameraControls.camera.rotation;
                const radians = Math.atan2(y, x);
                const degrees = radians * (180 / Math.PI);
                this.camera.lastRotate = degrees;
                this.viewer.cameraControls.userRotateSpeed = 0;
                console.log(this);
            },
        },
    };
    getInfo() {
        new ROSLIB.Topic({
            ros: ros,
            name: "/map",
            messageType: "nav_msgs/OccupancyGrid",
        }).subscribe((message) => {
            this.info = message.info;
            const {
                resolution,
                width,
                height,
                origin: {
                    position: { x, y },
                },
            } = message.info;
            this.info.limit = {
                x: {
                    min: Number(x.toFixed(2)),
                    max: Number((width * resolution + x).toFixed(2)),
                },
                y: {
                    min: Number(y.toFixed(2)),
                    max: Number((height * resolution + y).toFixed(2)),
                },
            };
            this.dispatchCustomEvent("infoComplete");
        });
    }
    clickCreatePoint = {
        dataEventHandle: [
            {
                event: "dblclick",
                handle: (e) => {
                    this.clickCreatePoint.handleDbClick(e);
                },
            },
            {
                event: "dbltouch",
                handle: (e) => {
                    this.clickCreatePoint.handleDbClick(e);
                },
            },
            {
                event: "mousemove",
                handle: () => this.camera.lockZ(),
            },
            {
                event: "touchmove",
                handle: () => this.camera.lockZ(),
            },
        ],
        handleDbClick: (e) => {
            const offset = {
                xOffsetClient: 0,
                yOffsetClient: 0,
            };
            if (e.type === "dblclick") {
                offset.xOffsetClient = e.offsetX;
                offset.yOffsetClient = e.offsetY;
            } else if (e.type === "dbltouch") {
                offset.xOffsetClient = e.detail.offsetX;
                offset.yOffsetClient = e.detail.offsetY;
            }
            const { x, y } = this.offsetClientToOffsetRosMap(offset);
            this.position = { x, y };
        },
        enable: () => {
            this.clickCreatePoint.dataEventHandle.forEach((eventHandle) => {
                this.mapElement.addEventListener(
                    eventHandle.event,
                    eventHandle.handle,
                );
            });
        },
        disable: () => {
            this.clickCreatePoint.dataEventHandle.forEach((eventHandle) => {
                this.mapElement.removeEventListener(
                    eventHandle.event,
                    eventHandle.handle,
                );
            });
        },
    };
    set position({ x, y, z, w, r }) {
        if (r) {
            const { z: _z, w: _w } = this.toQuaternions(r);
            this._position.z = _z;
            this._position.w = _w;
        } else {
            if (z !== undefined) this._position.z = Number(z);
            if (w !== undefined) this._position.w = Number(w);
        }
        if (x !== undefined) this._position.x = Number(x);
        if (y !== undefined) this._position.y = Number(y);
        this.dispatchCustomEvent("changePosition");
    }
    get position() {
        return this._position;
    }
    set layerList(dataLayer) {
        if (!Array.isArray(dataLayer)) {
            this._layerList.push(dataLayer);
        } else {
            this._layerList.length = 0;
            dataLayer.forEach((layer) => {
                this._layerList.push(layer);
            });
        }
        this.dispatchCustomEvent("changeLayer");
        setTimeout(() => {
            this.layer.save();
            console.log("saved layer!");
        }, 1000);
    }
    /**
     * @param {any}
     */
    set updateLayerList({ index, data }) {
        this._layerList.splice(index, 1, data);
        this.dispatchCustomEvent("changeLayer");
    }
    get layerList() {
        return this._layerList;
    }
    listener = {
        onchange: (callback) => {
            this.mapElement.addEventListener("changePosition", callback);
        },
    };
    mixinMethodFromClass(objectsList) {
        const mixin = (objects) => {
            const methodObjectsNameList = Object.getOwnPropertyNames(
                Object.getPrototypeOf(objects),
            );
            methodObjectsNameList.forEach((objectName) => {
                if (
                    objectName !== "constructor" &&
                    typeof objects[objectName] === "function"
                ) {
                    this[objectName] = objects[objectName].bind(this);
                }
            });
        };
        if (!Array.isArray(objectsList)) {
            mixin(objectsList);
            return;
        }
        objectsList.forEach(mixin);
    }
    layer = {
        position: {},
        check: {
            isCreateLayer: false,
        },
        topic: null,
        get: async () => {
            try {
                const res = await fetch("/api/layer");
                const layers = await res.json();
                this.layerList = this.layer.layerDbToRos(layers);
            } catch (error) {
                console.log(error);
                toggerMessage(
                    "error",
                    "There was an error, go to the console log for more details",
                );
            }
        },
        save: async () => {
            try {
                loadingHeader(true);
                const res = await fetch("/api/layer", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(this.layer.layerRosToDb()),
                });
                const status = await res.json();
                if (res.status === 200) {
                    this.layerList.forEach((layer) => {
                        layer.new = false;
                    });
                }
                loadingHeader(false);
            } catch (error) {
                loadingHeader(false);
                toggerMessage(
                    "error",
                    "There was an error, go to the console log for more details",
                );
                console.log(error);
            }
        },
        layerRosToDb: () => {
            const layers = this.layerList.map((layer) => {
                if (!layer.new) return {};
                const yawo = layer.r * (Math.PI / 180);
                return {
                    name_map_active: this.nameMap,
                    name_layer: layer.name,
                    type_layer: layer.type,
                    height: layer.height,
                    width: layer.width,
                    xo: layer.x,
                    yo: layer.y,
                    yawo,
                };
            });
            return layers.filter((layer) => Object.keys(layer).length);
        },
        layerDbToRos: (layersDb) => {
            return layersDb.map((layer) => {
                const r = layer.yawo / (Math.PI / 180);
                return {
                    height: layer.height,
                    width: layer.width,
                    name: layer.name_layer,
                    r,
                    type: layer.type_layer,
                    x: layer.xo,
                    y: layer.yo,
                    // pointA,
                    // pointB,
                    // pointC,
                    // pointD,
                };
            });
        },
        listenerEventDisplayLayer: () => {
            this.mapElement?.addEventListener("changeLayer", () => {
                this.layer.delete.all();
                this.layerList.forEach((layer, index) => {
                    this.layer.create({ ...layer }).display();
                });
            });
        },
        create: ({ type, width, height, x, y, z, w, r, id }) => {
            const color = {
                dead_zone: { r: 1, g: 0, b: 0, a: 0.3 },
                high_zone: { r: 0.2, g: 0, b: 0.8, a: 0.3 },
                default: { r: 0, g: 1, b: 0, a: 0.3 },
            };
            let _z = z;
            let _w = w;
            if (r) {
                const { z: __z, w: __w } = this.toQuaternions(r);
                _z = __z;
                _w = __w;
            }
            const _id =
                id || Math.abs(((x + y + width + height) * 10000).toFixed(4));

            const layer = {
                color: "",
                scale: {
                    x: width,
                    y: height,
                    z: 0.01,
                },
                pose: {
                    position: {
                        x: x,
                        y: y,
                        z: 0.1,
                    },
                    orientation: {
                        x: 0,
                        y: 0,
                        z: _z,
                        w: _w,
                    },
                },
                id: _id,
            };

            layer.color = color[type] || color.default;
            return {
                layer,
                display: () => {
                    this.layer.display(layer);
                },
            };
        },
        display: (layer) => {
            const optionDisplay = {
                header: {
                    frame_id: "/map",
                },
                ns: "layer",
                id: layer.id,
                type: 1,
                action: 0,
                frame_locked: false,
                mesh_resource: "",
                mesh_use_embedded_materials: false,
                color: layer.color,
                scale: layer.scale,
                pose: layer.pose,
            };
            this.layer.topic.publish(new ROSLIB.Message(optionDisplay));
        },
        delete: {
            all: () => {
                const sceneViewer = this.viewer.scene.children;
                const LAYER_OJECT_NAME = "ph";
                sceneViewer.forEach((scene, index) => {
                    scene.constructor.name === LAYER_OJECT_NAME &&
                        sceneViewer.splice(index, 1);
                });
            },
            one: (uuid) => {
                const sceneViewer = this.viewer.scene.children;
                sceneViewer.forEach((scene, index) => {
                    scene.uuid === uuid && sceneViewer.splice(index, 1);
                });
            },
            last: () => {
                const sceneViewer = this.viewer.scene.children;
                const lastIndex = sceneViewer.length - 1;
                const LAYER_OJECT_NAME = "ph";
                sceneViewer[lastIndex].constructor.name === LAYER_OJECT_NAME &&
                    sceneViewer.splice(lastIndex, 1);
            },
        },
        set: {
            create: {
                dataEventHandle: [
                    {
                        event: "press",
                        handle: (e) => {
                            const start = this.offsetClientToOffsetRosMap({
                                xOffsetClient: e.detail.start.offsetX,
                                yOffsetClient: e.detail.start.offsetY,
                            });

                            const stop = this.offsetClientToOffsetRosMap({
                                xOffsetClient: e.detail.stop.offsetX,
                                yOffsetClient: e.detail.stop.offsetY,
                            });

                            const layerDataRos = this.layer.convertToLayerRos({
                                start,
                                stop,
                            });
                            this.layer
                                .create({
                                    height: layerDataRos.height,
                                    width: layerDataRos.width,
                                    x: layerDataRos.position.x,
                                    y: layerDataRos.position.y,
                                    r: layerDataRos.rotate,
                                    id: 1,
                                })
                                .display();
                        },
                    },
                    {
                        event: "pressComplete",
                        handle: (e) => {
                            const { start, stop } = e.detail;
                            this.form({
                                x: stop.offsetX,
                                y: stop.offsetY,
                                data: { start, stop },
                            });
                        },
                    },
                ],
                enable: () => {
                    this.layer.set.create.dataEventHandle.forEach((item) => {
                        this.mapElement.addEventListener(
                            item.event,
                            item.handle,
                        );
                    });
                    this.camera.rotate.disable();
                    this.camera.lockZ();
                    this.mapElement.style.cursor = "crosshair";
                },
                disable: () => {
                    this.layer.set.create.dataEventHandle.forEach((item) => {
                        this.mapElement.removeEventListener(
                            item.event,
                            item.handle,
                        );
                    });
                    this.camera.rotate.enable();
                    this.layer.check.isCreateLayer = false;
                    this.mapElement.style.cursor = "default";
                },
            },

            select: {
                dataEventHandle: [
                    {
                        event: "mousedown",
                        handle: (e) => {
                            if (e.which !== 1) return;
                            this.layer.set.select.handleMouseDown(e);
                        },
                    },
                    {
                        event: "mousemove",
                        handle: (e) => {
                            this.layer.set.select.handleMouseMouse(e);
                        },
                    },
                ],
                handleMouseMouse: () => {
                    this.camera.lockZ();
                },
                handleMouseDown: (e) => {
                    const { x, y } = this.offsetClientToOffsetRosMap({
                        xOffsetClient: e.offsetX,
                        yOffsetClient: e.offsetY,
                    });
                    this.layerList = JSON.parse(this.layer.oldLayerList);

                    const layerSelect = this.layer.getLayerSelect(x, y);
                    if (!layerSelect) return;
                    layerSelect.type = "edit";
                    this.updateLayerList = {
                        index: layerSelect.indexLayerList,
                        data: layerSelect,
                    };
                },
                enable: () => {
                    this.layer.set.select.dataEventHandle.forEach((item) => {
                        this.mapElement.addEventListener(
                            item.event,
                            item.handle,
                        );
                    });
                    this.camera.lockZ();
                    this.layer.updateUuidLayer();
                    this.layer.oldLayerList = JSON.stringify(this.layerList);
                },
                disable: () => {
                    this.layer.set.select.dataEventHandle.forEach((item) => {
                        this.mapElement.removeEventListener(
                            item.event,
                            item.handle,
                        );
                    });
                    this.layerList = JSON.parse(this.layer.oldLayerList);
                },
            },
        },
        convertToLayerRos: (layer) => {
            const {
                start: { x: x1, y: y1 },
                stop: { x: x2, y: y2 },
            } = layer;
            const position = {
                x: this.compact((x1 + x2) / 2),
                y: this.compact((y1 + y2) / 2),
            };
            const { width, height } = this.calculateSize({ x1, y1, x2, y2 });

            const pointA = { x: x1, y: y1 };
            const pointB = { x: x2, y: y2 };
            const { pointC, pointD } = this.getPositionLayer({
                pointA,
                pointB,
            });
            const rotate = this.compact(this.camera.lastRotate + 90);

            return {
                position,
                width,
                height,
                rotate,
                pointA,
                pointB,
                pointC,
                pointD,
            };
        },

        updateUuidLayer: () => {
            const sceneViewer = this.viewer.scene.children;
            const LAYER_OJECT_NAME = "ph";
            const uuid = [];
            sceneViewer.map((scene, index) => {
                if (scene.constructor.name === LAYER_OJECT_NAME) {
                    return uuid.push({ index, uuid: scene.uuid });
                }
            });
            uuid.forEach((idScene, index) => {
                this.layerList[index].uuid = idScene.uuid;
                this.layerList[index].indexScene = idScene.index;
                this.layerList[index].indexLayerList = index;
            });
        },
        getLayerSelect: (x, y) => {
            for (let i = 0; i < this.layerList.length; i++) {
                if (
                    this.isPointInsideRectangle({
                        pointA: this.layerList[i].pointA,
                        pointB: this.layerList[i].pointB,
                        pointC: this.layerList[i].pointC,
                        pointD: this.layerList[i].pointD,
                        point: { x, y },
                    })
                )
                    return this.layerList[i];
            }
        },
    };
    form({ x: offsetX, y: offsetY, data }) {
        const start = this.offsetClientToOffsetRosMap({
            xOffsetClient: data.start.offsetX,
            yOffsetClient: data.start.offsetY,
        });

        const stop = this.offsetClientToOffsetRosMap({
            xOffsetClient: data.stop.offsetX,
            yOffsetClient: data.stop.offsetY,
        });

        const layerDataRos = this.layer.convertToLayerRos({
            start,
            stop,
        });

        const {
            width,
            height,
            position: { x, y },
            rotate: r,
            pointA,
            pointB,
            pointC,
            pointD,
        } = layerDataRos;

        const layer = {
            type: "",
            name: "",
            width,
            height,
            x,
            y,
            r,
            pointA,
            pointB,
            pointC,
            pointD,
        };

        const div = document.createElement("div");
        div.classList.add("fullscreen", "!z-50");
        div.innerHTML = `
        <div class="absolute flex flex-col gap-2 p-3 rounded-md bg-white shadow-md overflow-hidden pt-10 form-layer-wrapper"
            style="left:${offsetX || 100}px; top:${offsetY || 100}px;">
            <div class="absolute top-0 left-0 w-full h-10 bg-gray-100 cursor-move header-form"></div>
            <button class="float-right py-2 px-4 absolute top-0 right-0 close-form-layer"><i class="fa-solid fa-xmark"></i></button>
            <div class="form-input-layer">
                <div class="grid grid-cols-2 mt-2 mb-3 gap-2 text-center">
                    <label class="border border-gray-200 rounded cursor-pointer">
                        <input id="" type="radio" value="high_zone" name="type" class="sr-only peer/type">
                        <div class="px-2 py-1 w-full text-sm font-medium text-gray-900 peer-checked/type:font-bold peer-checked/type:text-[#3e00ff] peer-checked/type:bg-[#3e00ff]/20">High zone</div>
                    </label>
                    <label class="border border-gray-200 rounded cursor-pointer">
                        <input id="" type="radio" value="dead_zone" name="type" class="sr-only peer/type">
                        <div class="px-2 py-1 w-full text-sm font-medium text-gray-900 peer-checked/type:font-bold peer-checked/type:text-red-500 peer-checked/type:bg-red-500/30">Dead zone</div>
                    </label>
                </div>
                <div class="grid grid-cols-2 gap-x-6 gap-y-3">
                    <label class="border p-1 flex justify-between items-center">
                        <span class="pl-2">X</span>
                        <input type="number" class="w-24 border-none py-1 focus:ring-0" name="x" value="${x}">
                    </label>
                    <label class="border p-1 flex justify-between items-center">
                        <span class="pl-2">Y</span>
                        <input type="number" class="w-24 border-none py-1 focus:ring-0" name="y" value="${y}">
                    </label>
                    <label class="border p-1 flex justify-between items-center">
                        <span class="pl-2">W</span>
                        <input type="number" class="w-24 border-none py-1 focus:ring-0" name="width" value="${width}">
                    </label>
                    <label class="border p-1 flex justify-between items-center">
                        <span class="pl-2">H</span>
                        <input type="number" class="w-24 border-none py-1 focus:ring-0" name="height" value="${height}">
                    </label>

                    <label class="border p-1 flex justify-between items-center">
                        <span class="pl-2 text-[10px] fill-black/70">
                            <svg height="1em" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0v8h8V7H5c0-2.21-1.79-4-4-4V0H0zm1 4v3h3c0-1.657-1.343-3-3-3z" fill-rule="evenodd">
                                </path>
                            </svg>
                        </span>
                        <input type="number" class="w-24 border-none py-1 focus:ring-0" name="r" value="${r}">
                    </label>
                </div>
            </div>
            <div class="mt-1 flex gap-2 justify-between">
                <input type="text" class="px-3 py-1 flex-1 name-layer" name="name" placeholder="Name layer" />
                <button class="btn bg-main rounded px-3 text-white submit-btn"><i class="fa-solid fa-check"></i></button>
            </div>
        </div>
        `;
        const button = div.querySelector(".submit-btn");
        const headerForm = div.querySelector(".header-form");
        const formLayerWrapper = div.querySelector(".form-layer-wrapper");
        const closeFormLayer = div.querySelector(".close-form-layer");

        const onDismiss = () => {
            this.layer.delete.last();
            div.remove();
        };
        closeFormLayer.addEventListener("click", onDismiss);

        const onRemove = (e) => {
            if (e.key === "Escape") onDismiss();
            window.removeEventListener("keydown", onRemove);
        };
        window.addEventListener("keydown", onRemove);

        new DispatchCustomEvent("press", headerForm);
        button.addEventListener("click", () => {
            for (const key in layer) {
                if (!layer[key] && layer[key] === "") {
                    toggerMessage("error", `The ${key} field cannot be empty!`);
                    return;
                }
            }

            function removeDiacritics(input) {
                var pattern = /[\p{M}]/gu;
                return String(input).normalize("NFD").replace(pattern, "");
            }

            layer.name = removeDiacritics(layer.name);
            const nameExist =
                this.layerList.findIndex(
                    (layerItem) => layerItem.name == layer.name,
                ) !== -1;

            if (nameExist) {
                toggerMessage(
                    "error",
                    `Name "${layer.name}" already exists, please edit to another name!`,
                );
                return;
            }
            layer.new = true;
            this.layerList = layer;
            div.remove();
        });

        formLayerWrapper.addEventListener("input", (e) => {
            const value = isNaN(Number(e.target.value))
                ? e.target.value
                : Number(e.target.value);
            const name = e.target.name;
            layer[name] = value;
            if (name === "name") return;
            this.layer.delete.last();
            this.layer.create(layer).display();
        });

        headerForm.addEventListener("press", (e) => {
            const formRect = formLayerWrapper.getBoundingClientRect();
            formLayerWrapper.style.left =
                e.detail.clientX - formRect.width / 2 + "px";
            formLayerWrapper.style.top = e.detail.clientY - 13 + "px";
        });
        document.body.appendChild(div);
    }
    /*
     *Map action
     */
    deleteMapCanvas() {
        try {
            const hasCanvas = this.mapElement.innerHTML;
            const status = {
                message: hasCanvas
                    ? "Delete map canvas successfully!"
                    : "The map has not been created or has been deleted!",
                error: !hasCanvas,
            };
            hasCanvas && (this.mapElement.innerHTML = "");
            return status;
        } catch (error) {
            console.error(error);
            return { message: "ERR!, " + error, error: true };
        }
    }
    offsetClientToOffsetRosMap({ xOffsetClient, yOffsetClient }) {
        const zCamera = this.viewer.camera.position.z;
        const xCamera = this.viewer.camera.position.x;
        const yCamera = this.viewer.camera.position.y;
        const rotaryZ = this.viewer.camera.rotation._z;

        const a1 = this.viewer.camera.matrixWorld.elements[8];
        const a2 = this.viewer.camera.matrixWorld.elements[9];
        const a3 = this.viewer.camera.matrixWorld.elements[10];

        const klip = 1.45;

        const map = this.mapElement.getBoundingClientRect();
        const kMap = map.width / map.height;

        const yClick = (xOffsetClient / map.width - 0.5) * kMap;
        const xClick = yOffsetClient / map.height - 0.5;

        const dis = Math.sqrt(xClick * xClick + yClick * yClick);

        const alpha = rotaryZ + Math.atan2(yClick, xClick) - Math.PI / 2;

        const xClickConvert = ((zCamera * klip) / 2) * (dis * Math.cos(alpha));
        const yClickConvert = ((zCamera * klip) / 2) * (dis * Math.sin(alpha));

        const t = -zCamera / a3;
        const x = Number((xCamera + xClickConvert + a1 * t).toFixed(2));
        const y = Number((yCamera + yClickConvert + a2 * t).toFixed(2));

        return { x, y };
    }

    dispatchCustomEvent(nameEvent) {
        this.mapElement?.dispatchEvent(new Event(nameEvent));
    }

    toQuaternions(degrees) {
        const yaw = (Number(degrees) / 180) * Math.PI;
        const z = Math.sin(yaw / 2);
        const w = Math.cos(yaw / 2);
        return { z, w };
    }
    calculateSize({ x1, y1, x2, y2 }) {
        const lastRotate = this.camera.lastRotate;
        const PI = Math.PI;
        const transpositionRotateXOY = -(lastRotate * PI) / 180 - PI / 2;

        const { x: _x1, y: _y1 } = this.displacementsOxy({
            x: x1,
            y: y1,
            rotateRadian: transpositionRotateXOY,
        });
        const { x: _x2, y: _y2 } = this.displacementsOxy({
            x: x2,
            y: y2,
            rotateRadian: transpositionRotateXOY,
        });

        const deltaX = _x2 - _x1;
        const deltaY = _y2 - _y1;

        const distance = this.compact(Math.sqrt(deltaX ** 2 + deltaY ** 2));
        const angleInRadians = Math.atan2(deltaY, deltaX);
        const angleInDegrees = this.compact(angleInRadians * (180 / PI));
        const width = Math.abs(
            this.compact(distance * Math.cos(angleInRadians)),
        );
        const height = Math.abs(
            this.compact(distance * Math.sin(angleInRadians)),
        );
        return { width, height, r: angleInDegrees, distance };
    }
    toDegrees({ z, w }) {
        const yaw = 2 * Math.atan2(z, w);
        return (yaw * 180) / Math.PI;
    }
    getPositionLayer({ pointA, pointB }) {
        const { x: x1, y: y1 } = pointA;
        const { x: x2, y: y2 } = pointB;

        const lastRotate = this.camera.lastRotate;
        const PI = Math.PI;
        const rotateOxy = -(lastRotate * PI) / 180 - PI / 2;

        const { x: _x1, y: _y1 } = this.displacementsOxy({
            x: x1,
            y: y1,
            rotateRadian: rotateOxy,
        });
        const { x: _x2, y: _y2 } = this.displacementsOxy({
            x: x2,
            y: y2,
            rotateRadian: rotateOxy,
        });
        const { x: x3, y: y3 } = this.displacementsOxy({
            x: _x2,
            y: _y1,
            rotateRadian: -rotateOxy,
        });
        const { x: x4, y: y4 } = this.displacementsOxy({
            x: _x1,
            y: _y2,
            rotateRadian: -rotateOxy,
        });

        return { pointC: { x: x3, y: y3 }, pointD: { x: x4, y: y4 } };
    }

    displacementsOxy({ x, y, rotateRadian }) {
        const SIN_ROTATE_Oxy = Math.sin(rotateRadian);
        const COS_ROTATE_Oxy = Math.cos(rotateRadian);
        const _x = x * COS_ROTATE_Oxy - y * SIN_ROTATE_Oxy;
        const _y = x * SIN_ROTATE_Oxy + y * COS_ROTATE_Oxy;
        return { x: this.compact(_x), y: this.compact(_y) };
    }

    isPointInsideRectangle({ pointA, pointB, pointC, pointD, point }) {
        if (
            point.x >= Math.min(pointA.x, pointB.x, pointC.x, pointD.x) &&
            point.x <= Math.max(pointA.x, pointB.x, pointC.x, pointD.x) &&
            point.y >= Math.min(pointA.y, pointB.y, pointC.y, pointD.y) &&
            point.y <= Math.max(pointA.y, pointB.y, pointC.y, pointD.y)
        ) {
            return true;
        }
        return false;
    }
    Urd({ robot }) {
        new ROS3D.UrdfClient({
            ros: this.ros,
            tfClient: this.tfClient,
            param: "/" + robot + "/robot_description_web",
            rootObject: this.viewer.scene,
            loader: ROS3D.COLLADA_LOADER_2,
        });
    }
    Laser({ robot, color }) {
        new ROS3D.LaserScan({
            ros: this.ros,
            topic: "/" + robot + "/laser/scan",
            rootObject: this.viewer.scene,
            tfClient: this.tfClient,
            material: { size: 0.5, color },
            rate: 1,
        });
    }
    compact(number) {
        return Number(number.toFixed(4));
    }
    axes() {
        const axes = new ROS3D.Axes({
            scale: 4,
            shaftRadius: 0.025,
            headRadius: 0.05,
        });
        this.viewer.addObject(axes);
    }
}
