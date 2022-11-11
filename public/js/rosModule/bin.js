let tfClient = new ROSLIB.TFClient({
    ros: ros,
    rate: 10,
    fixedFrame: '/map',
    angularThres: 0.08,
    transThres: 0.05,
});
const time = new Date();
new ROS3D.Point({
    ros: ros,
    rootObject: viewer.scene,
    tfClient: tfClient,
    topic: "/point_pub" + "_" + time.getTime(),
    color: '#000',
    queue_size: 3,
    throttle_rate: 1000,
    radius: 0.25,
});
new ROSLIB.Topic({
    ros: ros,
    name: "/point_pub" + "_" + time.getTime(),
    messageType: 'geometry_msgs/PointStamped',
    queue_size: 1,
});
new ROSLIB.Message({
    header: {
        frame_id: "/map",
    },
    point: {
        x: 0,
        y: 0,
        z: 0,
    }
});
// display pose
new ROS3D.Pose({
    ros: ros,
    rootObject: viewer.scene,
    tfClient: tfClient,
    color: 0xFF33FF,
    topic: "/pose_pub" + "_" + time.getTime(),
    headDiameter: 0.5,
    shaftDiameter: 0.1,
    length: 2,
});
new ROSLIB.Topic({
    ros: ros,
    name: "/pose_pub" + "_" + time.getTime(),
    messageType: 'geometry_msgs/PoseStamped',
    queue_size: 1,
});
new ROSLIB.Message({
    header: {
        frame_id: "/map",
    },
    pose: {
        position: {
            x: 0,
            y: 0,
            z: 0,
        },
        orientation: {
            x: 0,
            y: 0,
            z: 0,
            w: 1,
        },
    }
});