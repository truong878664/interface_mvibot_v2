import ros from "../main.js";

export default function activeSelectRobot(robotActive) {
    const markerClient_topic = new ROSLIB.Topic({
        ros: ros,
        name: `/visualization_marker_layer_arrow_${window.name}`,
        messageType: "visualization_msgs/Marker",
    });
    const markerClient_msg = new ROSLIB.Message({
        header: {
            frame_id: `/${robotActive}/base_footprint`,
        },
        ns: "arrow",
        id: 0,
        type: 0,
        action: 0,
        frame_locked: false,
        mesh_resource: "",
        mesh_use_embedded_materials: false,
        color: {
            r: 1,
            g: 0.5,
            b: 0,
            a: 0.9,
        },
        scale: {
            x: 0.5,
            y: 0.25,
            z: 1.0,
        },
        pose: {
            position: {
                x: 0.0,
                y: 0.0,
                z: 1.2,
            },
            orientation: {
                x: 0.0,
                y: 0.7071068,
                z: 0.0,
                w: 0.7071068,
            },
        },
    });
    markerClient_topic.publish(markerClient_msg);
}
