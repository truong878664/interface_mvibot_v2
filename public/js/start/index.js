import configStart from "./config.js";
import { toggerMessage } from "../main.js";
import amclSet from "../rosModule/amclSet.js";
import { publishMission } from "../rosModule/handleMission.js";
import confirmationForm from "../functionHandle/confirmationForm.js";
import feature from "./feature.js";
import publishTopicString from "../rosModule/topicString.js";
import handleModule from "./handleModule.js";

configStart();
feature();
handleModule();

const startBtn = document.querySelector("[data-name='start']");
const robotActive = document.querySelector("#robot-navigation");
const robotListElement = document.querySelector("#robot-navigation-array");
const robotList = JSON.parse(robotListElement.value);

startBtn.onclick = () => {
    confirmationForm({
        message: "Chỉ khởi chạy lại robot khi bị lỗi hệ thống!",
        callback: handleStart,
    });
};

async function handleStart() {
    try {
        const isWithToollift = JSON.parse(
            document.querySelector("[name='toollift']:checked").dataset
                .toollift,
        );
        const nameRobot = robotActive.value;
        if (!nameRobot) {
            toggerMessage("error", "Vui lòng chọn robot!");
            return;
        }
        const res = await fetch("/api/start/get-detail-start");
        const dataStart = await res.json();
        if (!dataStart.error) {
            const data = dataStart.data;
            const positionInit = isWithToollift
                ? data.positionWithToollift
                : data.positionNoToollift;

            amclSet(
                nameRobot,
                positionInit.x,
                positionInit.y,
                positionInit.z,
                positionInit.w,
            );

            const missions = [];
            if (!isWithToollift) {
                missions.push(dataStart.data.missionGotoToollift);
            }
            missions.push(dataStart.data.dataMissionSendToRobot);

            const topic = `/${nameRobot}/mission_normal`;
            if (!missions.join("")) {
                toggerMessage("error", "Mission không có dữ liệu!");
                return;
            }
            publishMission(topic, missions.join(""));
            publishTopicString(`/${nameRobot}/output_user_set`, "(6|1)");

            (async function addErrorSystem() {
                await fetch("/api/error-system", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name_seri: nameRobot,
                    }),
                });
            })();
        } else {
            toggerMessage("error", dataStart.message);
        }
    } catch (error) {
        toggerMessage("error", "ERROR!" + error);
    }
}
