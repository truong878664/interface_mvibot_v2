import ros from "../main.js";

export default function subscribeTopic(name, messageType, callback) {
    const listener = new ROSLIB.Topic({
        ros: ros,
        name: `/${name}`,
        messageType: messageType,
    });
    listener.subscribe((data) => callback(data, name));
}
