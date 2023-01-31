import { connected, connectionFailed } from "../mainLayout.js";

function connectRos(ip) {
    const ros = new ROSLIB.Ros({
        url: `ws://${ip}:9090`,
    });


    ros.on("connection", function () {
        console.log("Connected to websocket server.");
        connected();
    });

    ros.on("error", function (error) {
        console.log("Error connecting to websocket server: ", error);
        connectionFailed();

    });

    ros.on("close", function () {
        console.log("Connection to websocket server closed.");
        connectionFailed();
    });
    return ros;
}

export default connectRos;
