import { toggerMessage } from "../../main.js";
import { publishMission } from "../../rosModule/handleMission.js";

async function getMultiMission(ids, robotActive) {
    const dataStatusReturn = {
        topic: "",
        mission: "",
        message: "",
        error: false,
    };
    if (!robotActive) {
        dataStatusReturn.error = true;
        dataStatusReturn.message = "Choose robot please!";
        return dataStatusReturn;
    }
    const list_id = ids.join(",");

    const resTranslate = await fetch(`/api/mi/translate`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            method: "translate-multi-mission-end",
            idsMission: ids,
        }),
    });
    const isTranslate = await resTranslate.json();
    if (isTranslate.translated) {
        const res = await fetch(`/api/mi/get-mission?list_id=${list_id}`);
        const data = await res.json();
        const allMission = [];

        data.map((item) => {
            if (!item.steps_mission) {
                return;
            }

            allMission.push(
                `[${item.wake_up ? item.wake_up : ""}${
                    item.stop ? item.stop : ""
                }*${item.steps_mission ? item.steps_mission : ""}]`
            );
            return allMission;
        });

        const missionNew = allMission.filter((item) => {
            return item !== "[*]";
        });

        const mission = missionNew.join("");
        if (!mission) {
            // toggerMessage("error", "Mission don't have data!");
            dataStatusReturn.message = "Mission don't have data!";
            dataStatusReturn.error = true;
            return dataStatusReturn;
        }

        let topic;
        (data[0].type === "normal" || data[0].type === "gpio") &&
            (topic = `/${robotActive}/mission_normal`);

        (data[0].type === "error-robot" || data[0].type === "error-gpio") &&
            (topic = `/${robotActive}/mission_error`);

        data[0].type === "battery" &&
            (topic = `/${robotActive}/mission_battery`);

        dataStatusReturn.message = "get mission successfully!";
        dataStatusReturn.error = false;
        dataStatusReturn.topic = topic;
        dataStatusReturn.mission = mission;

        return dataStatusReturn;
    } else {
        // toggerMessage("error", "ERR! Please contact the developer!");
        dataStatusReturn.error = true;
        dataStatusReturn.message = "ERR! Please contact the developer!";
        return dataStatusReturn;
    }
}

export default getMultiMission;
