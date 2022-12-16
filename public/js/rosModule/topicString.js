import ros from "../main.js";

export default function publishTopic(nameTopic, data) {
    const topic = new ROSLIB.Topic({
        ros: ros,
        name: nameTopic,
        messageType: "std_msgs/String",
    });
    const topicData = new ROSLIB.Message({
        data: data,
    });

    topic.publish(topicData);
}
