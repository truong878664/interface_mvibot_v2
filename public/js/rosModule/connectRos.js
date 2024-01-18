import { connected, connectionFailed } from "../mainLayout.js";

function connectRos(ip) {
    // const nextIp = "10.0.70.20";

    const ros = new ROSLIB.Ros({
        // url: `ws://${nextIp}:9090`,
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

    if (!ros.isConnected) connectionFailed();

    return ros;
}

export default connectRos;
