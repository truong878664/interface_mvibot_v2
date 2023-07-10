import { toggerMessage } from "../main.js";
import { publishMission } from "../rosModule/handleMission.js";

export default function sendMission({ nameRobot, data, typeMission }) {
    try {
        const topicMapping = {
            normal: `/${nameRobot}/mission_normal`,
            "error-gpio": `/${nameRobot}/mission_error`,
            "error-robot": `/${nameRobot}/mission_error`,
            battery: `/${nameRobot}/mission_battery`,
            gpio: `/${nameRobot}/mission_normal`,
        };
        const topic = topicMapping[typeMission];
        if (!nameRobot) {
            toggerMessage("error", "Please choose robot!");
            return;
        }
        if (!data) {
            toggerMessage("error", "Data empty!");
            return;
        }

        publishMission(topic, data);
    } catch (error) {
        toggerMessage("error", "ERR!" + error);
    }
}
