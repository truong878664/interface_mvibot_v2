import ros from "../main.js";
import uniqueCode from "./uniqueCode.js";

function displayPoint(x, y) {
    const point_pub = new ROSLIB.Topic({
        ros: ros,
        name: `/point_pub_${uniqueCode}`,
        messageType: "geometry_msgs/PointStamped",
        queue_size: 0.1,
    });
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
    setTimeout(() => {
        point_pub.publish(point_msg);
    }, 100);
}

export default displayPoint;
