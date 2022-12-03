import ros from "../../main.js";

export function markerClient(tfClient, viewer) {
    const markerClient = new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: "/visualization_marker_layer",
        rootObject: viewer.scene,
    });
}

export function displayLayer(mvibot_layer_active) {
    const markerClient_topic = new ROSLIB.Topic({
        ros: ros,
        name: "/visualization_marker_layer",
        messageType: "visualization_msgs/Marker",
    });
    const markerClient_msg = new ROSLIB.Message({
        header: {
            frame_id: "/map",
        },
        ns: "layer",
        id: 0,
        type: 6,
        action: 0,
        frame_locked: false,
        mesh_resource: "",
        mesh_use_embedded_materials: false,
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
        },
        scale: {
            x: 0.0,
            y: 0.0,
            z: 0.0,
        },
        pose: {
            position: {
                x: 0.0,
                y: 0.0,
                z: 0.01,
            },
            orientation: {
                x: 0.0,
                y: 0.0,
                z: 0.0,
                w: 1.0,
            },
        },
    });

    for (let i = 0; i < mvibot_layer_active.length; i++) {
        markerClient_msg.type = 1;
        markerClient_msg.action = 0;
        markerClient_msg.id = i;
        markerClient_msg.scale = mvibot_layer_active[i].scale;
        markerClient_msg.color = mvibot_layer_active[i].color;
        markerClient_msg.pose = mvibot_layer_active[i].pose;
        markerClient_topic.publish(markerClient_msg);
    }
}

function deleteLayer() {
    for (let i = markerClient_msgaray.length - 1; i >= 0; i--) {
        markerClient_msg.action = 2;
        markerClient_msg.id = i;
        markerClient_msg.scale = new mvibot_scale(0.0001, 0.0001, 0.0001);
        markerClient_msg.color = new mvibot_color(0, 0, 0, 0);
        markerClient_topic.publish(markerClient_msg);
    }
}
