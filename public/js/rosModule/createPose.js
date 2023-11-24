import ros from "../main.js";
import uniqueCode from "./uniqueCode.js";

function createPose(viewer, tfClient, color = "#EA047E") {
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
    // let i = 1;

    // console.log(13);
    // setInterval(() => {
    //     i++;
    //     const pose_msg = new ROSLIB.Message({
    //         header: {
    //             frame_id: "/map",
    //         },
    //         pose: {
    //             position: {
    //                 x: i / 10,
    //                 y: i / 10,
    //                 z: 0,
    //             },

    //             orientation: {
    //                 x: 0,
    //                 y: 0,
    //                 z: 0,
    //                 w: 1,
    //             },
    //         },
    //     });
    //     pose.processMessage(pose_msg);
    //     console.log("pub");
    // }, 10);
}
export default createPose;
