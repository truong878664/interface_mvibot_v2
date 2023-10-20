import ros from "../main.js";
import topic from "./subscribeTopic.js";
import { robotList } from "./trackingMission.js";
import { Z_PATH } from "./zIndexMarkerClientMap.js";

export const subscribePath = () => {
    const colorPath = [
        { r: 0, g: 0, b: 1, a: 0.9 },
        { r: 0, g: 1, b: 1, a: 0.9 },
        { r: 0.5, g: 0, b: 1, a: 0.9 },
        { r: 0.3, g: 0.5, b: 0.6, a: 0.9 },
    ];
    const topicMainPath = new ROSLIB.Topic({
        ros: ros,
        name: `/visualization_marker_path_${window.name}`,
        messageType: "visualization_msgs/Marker",
    });
    robotList.forEach((robot, index) => {
        const { name_seri: robotActive } = robot;
        topic({ name: `/${robotActive}/path` }).subscribe((data) => {
            const pathList = [];
            if (data === "") {
                displayPath({ robotActive, pathList: [] });
                return;
            }
            const pathPathOriginList = data.split("|");
            for (let i = 0; i < pathPathOriginList.length; i += 2) {
                const path = {
                    x: Number(pathPathOriginList[i]),
                    y: Number(pathPathOriginList[i + 1]),
                    z: 0.03,
                };
                pathList.push(path);
            }
            displayPath({ robotActive, index, pathList });
        });
    });

    function displayPath({ robotActive, index, pathList }) {
        const initMessage = {
            header: {
                frame_id: "/map",
            },
            ns: robotActive + "_path",
            id: 0,
            type: 7,
            action: 0,
            frame_locked: false,
            mesh_resource: "",
            mesh_use_embedded_materials: false,
            color: colorPath[index] || { r: 1, g: 1, b: 0, a: 0.9 },
            scale: { x: 0.16, y: 0.16, z: 0.02 },
            pose: {
                position: { x: 0, y: 0, z: Z_PATH },
                orientation: { x: 0, y: 0, z: 0, w: 1.0 },
            },
            points: pathList,
        };
        const optionMessageClear = {
            action: 3,
            points: [],
        };
        topicMainPath.publish(
            new ROSLIB.Message(
                pathList.length
                    ? initMessage
                    : { ...initMessage, ...optionMessageClear }
            )
        );
    }
};
