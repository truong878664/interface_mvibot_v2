import ros from "../main.js";

class Robot {
    move(name, linear, angular) {
        const cmd_vel_listener = new ROSLIB.Topic({
            ros: ros,
            name: `${name}/cmd_vel`,
            messageType: "geometry_msgs/Twist",
        });
        const twist = new ROSLIB.Message({
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
}

export default Robot;
