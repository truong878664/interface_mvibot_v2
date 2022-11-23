import { $ } from "./main.js";
import ros from "./main.js";
import createMap from "./rosModule/createMap.js";
import createTfClient from "./rosModule/createTfClient.js";
import createAxes from "./rosModule/createAxes.js";
import createPoint from "./rosModule/createPoint.js";
import createPose from "./rosModule/createPose.js";
import displayPoint from "./rosModule/displayPoint.js";
import displayPose from "./rosModule/displayPose.js";

const heightMap = $(".map-page_map").offsetHeight;
const widthMap = $(".map-page_map").offsetWidth;

const viewer = createMap(heightMap, widthMap);
const tfClient = createTfClient();

createAxes(viewer);
createPoint(viewer, tfClient);
createPose(viewer, tfClient);

displayPoint(0, 0);
displayPose(0, 0, 0, 1);

const createJoystick = function () {
    const heightJoystick = $(".joystick-wrapper").offsetHeight;
    var options = {
        zone: document.getElementById("zone_joystick"),
        threshold: 0.1,
        position: {
            left: heightJoystick / 2 + "px",
            top: heightJoystick / 2 + "px",
        },
        mode: "static",
        size: heightJoystick - 50,
        color: "black",
    };
    const manager = nipplejs.create(options);
    let linear_speed = 0;
    let angular_speed = 0;
    let timer;
    manager.on("start", function (event, nipple) {
        timer = setInterval(function () {
            move(linear_speed, angular_speed);
        }, 500);
    });
    manager.on("move", function (event, nipple) {
        const max_linear = 0.5; // m/s 0.5;
        const max_angular = 0.314; // rad/s
        const max_distance = 200; // pixels;
        linear_speed =
            (Math.sin(nipple.angle.radian) * max_linear * nipple.distance) /
            max_distance;
        angular_speed =
            (-Math.cos(nipple.angle.radian) * max_angular * nipple.distance) /
            max_distance;
    });
    manager.on("end", function () {
        clearInterval(timer);
        move(0, 0);
        displayPoint(0, 0);
    });
};
createJoystick();

const cmd_vel_listener = new ROSLIB.Topic({
    ros: ros,
    name: "/cmd_vel",
    messageType: "geometry_msgs/Twist",
    queue_size: 1,
});

const move = function (linear, angular) {
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
    cmd_vel_listener.publish(twist);
};
