import {ros,viewer,tfClient} from '../main.js'

function createPose () {
    new ROS3D.Pose({
        ros: ros,
        rootObject: viewer.scene,
        tfClient: tfClient,
        color: 0xFF33FF,
        topic: "/pose_pub",
        headDiameter: 0.3,
        shaftDiameter: 0.1,
        length: 2,
    });
}
export default createPose