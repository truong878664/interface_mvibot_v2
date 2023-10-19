import ros, { toggerMessage } from "../main.js";
import topic from "./subscribeTopic.js";
import { robotList } from "./trackingMission.js";

export const subscribeFootprint = () => {
    const topicMainFootprint = new ROSLIB.Topic({
        ros: ros,
        name: `/visualization_marker_footprint_${window.name}`,
        messageType: "visualization_msgs/Marker",
    });
    robotList.forEach((robot) => {
        const { name_seri: robotActive } = robot;
        topic({ name: `/${robotActive}/footprint` }).subscribe((data) => {
            console.log(data);
            const [X1, X2, Y1, Y2] = data.split("|");
            const width = Math.sqrt((X2 - X1) * (X2 - X1)).toFixed(2);
            const height = Math.sqrt((Y2 - Y1) * (Y2 - Y1)).toFixed(2);
            displayFootprint({ robotActive, X1, X2, Y1, Y2 });
            toggerMessage(
                "success",
                `ROBOT: ${robotActive}, Set footprint! width: ${Math.min(
                    width,
                    height
                )}m, height: ${Math.max(width, height)}m`
            );
        });
    });
    function displayFootprint({ robotActive, X1, X2, Y1, Y2 }) {
        const x1 = Number(X1);
        const x2 = Number(X2);
        const y1 = Number(Y1);
        const y2 = Number(Y2);
        const initMessage = {
            header: {
                frame_id: "/" + robotActive + "/base_footprint",
            },
            ns: robotActive + "_footprint",
            id: 0,
            type: 1,
            action: 0,
            frame_locked: false,
            mesh_resource: "",
            mesh_use_embedded_materials: false,
            color: { r: 0, g: 0, b: 0, a: 0.9 },
            scale: { x: 0, y: 0, z: 0 },
            pose: {
                position: { x: 0.0, y: 1, z: 0.05 },
                orientation: { x: 0.0, y: 0.0, z: 0.71, w: 0.71 },
            },
            points: [],
        };
        const COLOR_BORDER = { r: 1, g: 0, b: 0, a: 0.9 };
        const COLOR_FILL = { r: 1, g: 1, b: 0, a: 0.4 };
        const disX = Math.sqrt((x2 - x1) * (x2 - x1));
        const disY = Math.sqrt((y2 - y1) * (y2 - y1));
        const MOVE_X = (Math.abs(x2) - Math.abs(x1)) / 2;
        const MOVE_Y = (Math.abs(y2) - Math.abs(y1)) / 2;
        const lines = {
            left: {
                id: 0,
                color: COLOR_BORDER,
                scale: { x: disX, y: 0.05, z: 0.05 },
                pose: {
                    position: { x: MOVE_X, y: y2, z: 0.05 },
                    orientation: { x: 0, y: 0, z: 0, w: 1 },
                },
            },
            right: {
                id: 1,
                color: COLOR_BORDER,
                scale: { x: disX, y: 0.05, z: 0.05 },
                pose: {
                    position: { x: MOVE_X, y: y1, z: 0.05 },
                    orientation: { x: 0, y: 0, z: 0, w: 1 },
                },
            },
            top: {
                id: 2,
                color: COLOR_BORDER,
                scale: { x: disY, y: 0.05, z: 0.05 },
                pose: {
                    position: { x: x2, y: MOVE_Y, z: 0.05 },
                    orientation: { x: 0, y: 0, z: 0.7071068, w: 0.7071068 },
                },
            },
            bottom: {
                id: 3,
                color: COLOR_BORDER,
                scale: { x: disY, y: 0.05, z: 0.05 },
                pose: {
                    position: { x: x1, y: MOVE_Y, z: 0.05 },
                    orientation: { x: 0, y: 0, z: 0.7071068, w: 0.7071068 },
                },
            },
        };
        const fill = {
            color: COLOR_FILL,
            id: 4,
            scale: { x: disX, y: disY, z: 0.05 },
            pose: {
                position: { x: MOVE_X, y: MOVE_Y, z: 0.05 },
                orientation: { x: 0, y: 0, z: 0.0, w: 1.0 },
            },
        };
        Object.keys(lines).forEach((line) => {
            topicMainFootprint.publish(
                new ROSLIB.Message({ ...initMessage, ...lines[line] })
            );
        });
        topicMainFootprint.publish(
            new ROSLIB.Message({ ...initMessage, ...fill })
        );
    }
};
