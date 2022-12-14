import ros from "../main.js";
import uniqueCode from "./uniqueCode.js";

function createPose(viewer, tfClient, color = "#EA047E") {
    new ROS3D.Pose({
        ros: ros,
        rootObject: viewer.scene,
        tfClient: tfClient,
        color: color,
        topic: `/pose_pub_${uniqueCode}`,
        headDiameter: 0.3,
        shaftDiameter: 0.1,
        length: 2,
    });
}
export default createPose;
