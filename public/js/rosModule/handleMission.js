import ros from "../main.js";

function publishMission(nameTopic, dataMission) {
    const mission_pub = new ROSLIB.Topic({
        ros: ros,
        name: nameTopic,
        messageType: "std_msgs/String",
        queue_size: 1,
    });
    const mission_set = new ROSLIB.Message({
        data: dataMission,
    });

    console.log(dataMission);
    mission_pub.publish(mission_set);
}

export { publishMission };
