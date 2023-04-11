import ros from "../main.js";

export default function amclSet(nameRobot, x, y, z, w) {
    const amcl_pub = new ROSLIB.Topic({
        ros: ros,
        name: `${nameRobot}/initialpose_web`,
        messageType: "std_msgs/String",
        queue_size: 1,
    });
    const amcl_set = new ROSLIB.Message({
        data: `(${x}|${y}|${z}|${w})`,
    });

    amcl_pub.publish(amcl_set);
}
