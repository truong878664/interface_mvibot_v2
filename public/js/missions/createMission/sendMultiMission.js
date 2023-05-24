import { $, $$, toggerMessage } from "../../main.js";
import { publishMission } from "../../rosModule/handleMission.js";

export default function sendMultiMission() {
    $(".send-btn").onclick = (e) => {
        const idSelect = [];
        $$(".select-mission").forEach((item) => {
            if (item.checked) {
                idSelect.push(item.value);
            }
        });

        const robotActive = $("#robot-active").value;
        if (robotActive != "" && idSelect.length != 0) {
            getMission(idSelect, robotActive);
            $("#select-robot").checked = false;
            $(".select-btn").click();

            $$(".select-mission").forEach((item) => {
                item.checked = false;
            });
        } else {
            toggerMessage("error", "Please choose mission and Robot!");
        }
    };
}

async function getMission(ids, robotActive) {
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
            toggerMessage("error", "Mission don't have data!");
            return;
        }

        let topic;
        (data[0].type === "normal" || data[0].type === "gpio") &&
            (topic = `/${robotActive}/mission_normal`);

        (data[0].type === "error-robot" || data[0].type === "error-gpio") &&
            (topic = `/${robotActive}/mission_error`);

        data[0].type === "battery" &&
            (topic = `/${robotActive}/mission_battery`);

        publishMission(topic, mission);
    } else {
        toggerMessage("error", "ERR! Please contact the developer!");
    }
}
