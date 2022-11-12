import { ros } from '../main.js'

function displayPose(x, y, z, w) {
    const pose_pub = new ROSLIB.Topic({
        ros: ros,
        name: "/pose_pub", 
        messageType: 'geometry_msgs/PoseStamped',
        queue_size: 1,
    });
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
        }
    });
    pose_pub.publish(pose_msg);
}

export default displayPose
