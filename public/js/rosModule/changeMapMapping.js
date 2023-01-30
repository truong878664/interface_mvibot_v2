import ros from "../main.js";

export default function changeMapActive(name_robot = "", name_map = "") {
    var cmdVel = new ROSLIB.Topic({
        ros: ros,
        name: "/request_action",
        messageType: "std_msgs/String",
    });
    const topic_map = new ROSLIB.Message({
        data: `save_map|~name_robot=${name_robot}~~name_map=${name_map}~`,
    });

    cmdVel.publish(topic_map);
}
