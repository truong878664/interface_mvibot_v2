import ros from "../main.js";

export default function topic({ name, type = "std_msgs/String" }) {
    const listener = new ROSLIB.Topic({
        ros,
        name,
        messageType: type,
    });
    let currentData;
    return {
        subscribe(cb) {
            listener.subscribe(({ data }) => {
                if (data !== currentData) cb(data, name);
                currentData = data;
            });
        },
        unsubscribe() {
            listener.unsubscribe();
        },
    };
}
