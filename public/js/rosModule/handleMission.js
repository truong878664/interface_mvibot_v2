import ros from "../main.js";
import getValueWakeUpStop from "../missions/ftWakeUpStop.js";

function runMission(nameRobot, dataBodyMission) {
    const dataHeadMission = getValueWakeUpStop();
    const dataFullMission = `${dataHeadMission}*${dataBodyMission}%@`;
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

function continueMission(nameRobot) {
    mission_continue_pub = new ROSLIB.Topic({
        ros: ros,
        name: `/${name_select}/mission_continue`,
        messageType: "std_msgs/String",
        queue_size: 1,
    });
    mission_continue_set = new ROSLIB.Message({
        data: "1",
    });
    mission_continue_pub.publish(mission_continue_set);
}

function stopMission(nameRobot) {
    mission_stop_pub = new ROSLIB.Topic({
        ros: ros,
        name: `/${name_select}/mission_cancel`,
        messageType: "std_msgs/String",
        queue_size: 1,
    });
    mission_stop_set = new ROSLIB.Message({
        data: "2",
    });

    mission_stop_pub.publish(mission_stop_set);
}

export { runMission, continueMission, stopMission };
