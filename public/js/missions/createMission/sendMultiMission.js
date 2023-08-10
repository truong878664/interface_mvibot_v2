import { $, $$, toggerMessage } from "../../main.js";
import { publishMission } from "../../rosModule/handleMission.js";

const versionMission = document.querySelector("[data-version]").dataset.version;

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
            $("#select-robot").checked = false;
            $(".select-btn").click();
            $$(".select-mission").forEach((item) => {
                item.checked = false;
            });

            switch (versionMission) {
                case "v3":
                    sendMissionV3(idSelect, robotActive);
                    break;
                case "v4":
                    sendMissionV4(idSelect, robotActive);
                    break;
                default:
                    break;
            }
        } else {
            toggerMessage("error", "Please choose mission and Robot!");
        }
    };
}

async function sendMissionV3(ids, robotActive) {
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

async function sendMissionV4(ids, robotActive) {
    const url = `/api/mission-v4/send?kind=convert_data_robot_multiple&ids=${ids.toString()}`;
    const res = await fetch(url);
    const data = await res.json();

    const dataMission = [];
    data.map((mission) => {
        if (mission.data) {
            dataMission.push(dataEndToRobot(mission));
        }
        return dataMission;
    });
    console.log(dataMission);
    // const MissionClass = new Mission();
    // const data = await MissionClass.getMultipleDataRobot({ ids });
    // console.log(data);
}

function dataEndToRobot(data) {
    const dataEnd = `&/name_mission/${data.name}//id_mission>${data.id}//data_configuration>${data.wakeup}${data.stop}/*${data.data}@`;
    return dataEnd;
}
