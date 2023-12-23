import uniqueCode from "../../rosModule/uniqueCode.js";

export const processPoint = ({ ros, viewer, tfClient }) => {
    const point = new ROS3D.Point({
        ros: ros,
        rootObject: viewer.scene,
        tfClient: tfClient,
        topic: `/point_pub_${uniqueCode}`,
        color: "#FD841F",
        queue_size: 1,
        throttle_rate: 1000,
        radius: 0.1,
    });
    return {
        display(x, y) {
            const point_msg = new ROSLIB.Message({
                header: {
                    frame_id: "/map",
                },
                point: {
                    x: x,
                    y: y,
                    z: 0,
                },
            });
            point.processMessage(point_msg);
        },
    };
};

export const processPose = ({ ros, viewer, tfClient, color = "#EA047E" }) => {
    const pose = new ROS3D.Pose({
        ros: ros,
        rootObject: viewer.scene,
        tfClient: tfClient,
        color: color,
        topic: `/pose_pub_${uniqueCode}`,
        headDiameter: 0.3,
        shaftDiameter: 0.1,
        length: 2,
    });
    return {
        display(x, y, z, w) {
            const pose_msg = new ROSLIB.Message({
                header: {
                    frame_id: "/map",
                },
                pose: {
                    position: {
                        x: x,
                        y: y,
                        z: 0,
                    },

                    orientation: {
                        x: 0,
                        y: 0,
                        z: z,
                        w: w,
                    },
                },
            });
            pose.processMessage(pose_msg);
        },
    };
};

export const processLayer = ({ ros, tfClient, viewer }) => {
    const layer = new ROS3D.MarkerClient({
        ros: ros,
        tfClient: tfClient,
        topic: `/visualization_marker_layer${uniqueCode}`,
        rootObject: viewer.scene,
    });
    return {
        display(mvibot_layer_active) {
            const layer_msg = new ROSLIB.Message({
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
                const nextLayer = {
                    ...layer_msg,
                    type: 1,
                    action: 0,
                    id: i,
                    scale: mvibot_layer_active[i].scale,
                    color: mvibot_layer_active[i].color,
                    pose: mvibot_layer_active[i].pose,
                };
                layer.processMessage(nextLayer);
            }
        },
    };
};
