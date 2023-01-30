import ros from "../main.js";

export default function amclSet(nameRobot, x, y, z, w) {
    // const covariance_amcl = [
    //     0.25, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    //     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    //     0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06853892326654787,
    // ];
    const amcl_pub = new ROSLIB.Topic({
        ros: ros,
        name: `${nameRobot}/initialpose_web`,
        messageType: "std_msgs/String",
        queue_size: 1,
    });
    const amcl_set = new ROSLIB.Message({
        data: `(${x}|${y}|${z}|${w})`,
    });

    // const amcl_set = new ROSLIB.Message({
    //     header: {
    //         seq: 0,
    //         stamp: {
    //             secs: 0,
    //             nsecs: 0,
    //         },
    //         frame_id: "map",
    //     },
    //     pose: {
    //         pose: {
    //             position: {
    //                 x: x,
    //                 y: y,
    //                 z: 0,
    //             },
    //             orientation: {
    //                 x: 0,
    //                 y: 0,
    //                 z: z,
    //                 w: w,
    //             },
    //         },
    //         covariance: covariance_amcl,
    //     },
    // });
    amcl_pub.publish(amcl_set);
}
