import ros from "../main.js";
import getValueWakeUpStop from "../missions/wakeUpStop/ftWakeUpStop.js";

function publishMission(nameRobot, dataBodyMission) {
    const dataHeadMission = getValueWakeUpStop();
    const dataFullMission = `[${dataHeadMission}*${dataBodyMission}%@]`;
    // console.log(nameRobot);
    const nameRobotReplace = nameRobot.replace(" ", "");
    const mission_pub = new ROSLIB.Topic({
        ros: ros,
        name: `/${nameRobotReplace}/data_coordinates`,
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
