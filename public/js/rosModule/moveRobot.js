import ros, { toggerMessage } from "../main.js";

let nameRobotMove;
export function setRobotMove(nameRobot) {
    nameRobotMove = nameRobot;
}

function moveRobot(linear, angular) {
    console.log(linear, angular);
    const cmd_vel_listener = new ROSLIB.Topic({
        ros: ros,
        name: `${nameRobotMove}/cmd_vel`,
        messageType: "geometry_msgs/Twist",
    });
    var twist = new ROSLIB.Message({
        linear: {
            x: linear,
            y: 0,
            z: 0,
        },
        angular: {
            x: 0,
            y: 0,
            z: angular,
        },
    });

    if (cmd_vel_listener.name !== "/cmd_vel") {
        cmd_vel_listener.publish(twist);
    }
}

export default moveRobot;
