import ros from "../main.js";

export default function publishTopic(name_robot, data) {
    const topic = new ROSLIB.Topic({
        ros: ros,
        name: `${name_robot}/set_config`,
        messageType: "std_msgs/String",
    });
    const topicData = new ROSLIB.Message({
        data: data,
    });

    topic.publish(topicData);
}
