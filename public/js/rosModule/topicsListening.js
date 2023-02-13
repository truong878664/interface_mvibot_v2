import { $, toggerMessage } from "../main.js";
import subscribeTopic from "./subscribeTopic.js";

export default function topicsListening() {
    const allRobot = $("#robots")?.children;
    if (allRobot) {
        for (let i = 0; i < allRobot.length; i++) {
            const name_seri = allRobot[i].value;

            //sub mission
            subscribeTopic(
                `/${name_seri}/data_coordinates`,
                "std_msgs/String",
                (data, name) => {
                    if (data.data) {
                        toggerMessage(
                            "success",
                            "The robot has received 1 mission!"
                        );
                    }
                    console.log(data);
                }
            );

            //sub tracking mission
            subscribeTopic(
                `/${name_seri}/mission_action`,
                "std_msgs/String",
                (data) => {
                    if (data.data == 0) {
                        toggerMessage("success", "Stopped");
                    } else if (data.data == 1) {
                        toggerMessage("success", "Continued");
                    }
                    console.log(data);
                }
            );

            subscribeTopic(
                `/${name_seri}/robot_shutdown`,
                "std_msgs/String",
                (data) => {
                    if (data.data == 1) {
                        toggerMessage("success", `Shutdown success`);
                    } else if (data.data == 2) {
                        toggerMessage("success", `Reboot success`);
                    }
                    console.log(data);
                }
            );

            subscribeTopic(
                `/${name_seri}/robot_shutdown`,
                "std_msgs/String",
                (data) => {
                    if (data.data == 1) {
                        toggerMessage("success", `Shutdown success`);
                    } else if (data.data == 2) {
                        toggerMessage("success", `Reboot success`);
                    }
                    console.log(data);
                }
            );
            subscribeTopic(
                `/${name_seri}/set_config`,
                "std_msgs/String",
                (data, name) => {
                    console.log(data, name);
                    toggerMessage(
                        "success",
                        `You sent the data to the robot: ${data.data}`
                    );
                }
            );
        }
    }
}
