import ros from "../main.js";

export default function publishTopic(nameTopic, data, messageType = "std_msgs/String") {
    const topic = new ROSLIB.Topic({
        ros: ros,
        name: nameTopic,
        messageType: messageType,
    });
    const topicData = new ROSLIB.Message({
        data: data,
    });

    topic.publish(topicData);
}
