import { $, toggerMessage } from "../main.js";
import subscribeTopic from "./subscribeTopic.js";

export default function topicsListening() {
    const allRobot = JSON.parse($("#all-my-robots")?.value);

    if (allRobot) {
        for (let i = 0; i < allRobot.length; i++) {
            const name_seri = allRobot[i].name_seri;
            //sub mission
            const missionTopic = [
                "mission_normal",
                "mission_error",
                "mission_battery",
            ];
            for (let i = 0; i < missionTopic.length; i++) {
                subscribeTopic(
                    `/${name_seri}/${missionTopic[i]}`,
                    "std_msgs/String",
                    (data, name) => {
                        if (data.data) {
                            const amountMission =
                                data.data.split("][").length || 1;

                            console.log(data);

                            toggerMessage(
                                "success",
                                `The robot ${name_seri} has received ${amountMission} mission! - Topic: ${missionTopic[i]}`
                            );
                        }
                    }
                );
            }

            //sub tracking mission
            subscribeTopic(
                `/${name_seri}/mission_action`,
                "std_msgs/String",
                (data) => {
                    if (data.data == 0) {
                        toggerMessage("success", `Robot ${name_seri}: stopped`);
                    } else if (data.data == 1) {
                        toggerMessage(
                            "success",
                            `Robot ${name_seri}: continued`
                        );
                    }
                    console.log(data);
                }
            );

            subscribeTopic(
                `/${name_seri}/robot_shutdown`,
                "std_msgs/String",
                (data) => {
                    if (data.data == 1) {
                        toggerMessage(
                            "success",
                            `Robot ${name_seri}: Shutdown success`
                        );
                    } else if (data.data == 2) {
                        toggerMessage(
                            "success",
                            `Robot ${name_seri}: Reboot success`
                        );
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

    subscribeTopic("/reset_server", "std_msgs/String", (data, name) => {
        toggerMessage("success", "Reset server success!");
    });
}
