import ros from "../main.js";
import getValueWakeUpStop from "../missions/wakeUpStop/ftWakeUpStop.js";

function publishMission(nameTopic, dataBodyMission) {
    const [wake_up, stop] = getValueWakeUpStop();
    const dataHeadMission = wake_up + stop;
    const dataFullMission = `[${dataHeadMission}*${dataBodyMission}]`;
    // console.log(nameTopic);
    const mission_pub = new ROSLIB.Topic({
        ros: ros,
        name: nameTopic,
        messageType: "std_msgs/String",
        queue_size: 1,
    });
    const mission_set = new ROSLIB.Message({
        data: dataFullMission,
    });

    console.log(dataFullMission);
    mission_pub.publish(mission_set);
}

export { publishMission };
