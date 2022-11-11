import {ros, viewer, tfClient} from '../main.js'

function displayPoint(x, y) {
    const time = new Date();

    const point = new ROS3D.Point({
        ros: ros,
        rootObject: viewer.scene,
        tfClient: tfClient,
        topic: "/point_pub" + "_" + time.getTime(),
        color: '#000',
        queue_size: 3,
        throttle_rate: 1000,
        radius: 0.25,
    });
    const point_pub = new ROSLIB.Topic({
        ros: ros,
        name: "/point_pub" + "_" + time.getTime(),
        messageType: 'geometry_msgs/PointStamped',
        queue_size: 1,
    });
    const point_msg = new ROSLIB.Message({
        header: {
            frame_id: "/map",
        },
        point: {
            x: 0,
            y: 0,
            z: 0,
        }
    });
    point_msg.point.x = x;
    point_msg.point.y = y;
    point_pub.publish(point_msg);
}
export default displayPoint