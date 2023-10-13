import ros from "../main.js";

export default function topic({ name, type = "std_msgs/String" }) {
    let timeOut;
    const listener = new ROSLIB.Topic({
        ros,
        name,
        messageType: type,
    });
    let currentData = "";
    return {
        subscribe(cb) {
            listener.subscribe(({ data }) => {
                clearTimeout(timeOut);
                if (data !== currentData) cb(data, name);
                currentData = data;
                timeOut = setTimeout(() => {
                    cb(null, name);
                    console.log("clear time out");
                }, 3000);
            });
        },
        unsubscribe() {
            clearTimeout(timeOut);
            listener.unsubscribe();
        },
    };
}
