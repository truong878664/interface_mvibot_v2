import configStart from "./config.js";
import { toggerMessage } from "../main.js";
import amclSet from "../rosModule/amclSet.js";
import { publishMission } from "../rosModule/handleMission.js";
import confirmationForm from "../functionHandle/confirmationForm.js";
import feature from "./feature.js";
import publishTopicString from "../rosModule/topicString.js";
import handleModule from "./handleModule.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";
import { getHistory } from "../lib/ultils.js";

const startBtn = document.querySelector("[data-name='start']");
const robotActive = document.querySelector("#robot-navigation");
const robotListElement = document.querySelector("#robot-navigation-array");
const robotList = JSON.parse(robotListElement.value);
const gpioStartElement = document.querySelector("[data-name='gpio-start']");
const refreshBtn = document.querySelector("[data-name='refresh-io-btn']");
const timePosition = document.querySelector(".time-set-position");
const timeMissionReceive = document.querySelector(".time-mission-receive");
const nameMissionReceive = document.querySelector(".name-mission-receive");

configStart();
feature();
handleModule();

startBtn.onclick = () => {
    confirmationForm({
        message: "Chỉ khởi chạy lại robot khi bị lỗi hệ thống!",
        callback: handleStart,
    });
};

async function handleStart() {
    try {
        const isWithToollift = JSON.parse(
            document.querySelector("[name='toollift']:checked")?.dataset
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
            publishTopicString(`/${nameRobot}/output_user_set`, "(5|1)(6|1)");
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

const HTMLIoItem = ` <li class="w-8 h-8 rounded-full flex justify-center font-bold text-white items-center bg-red-500"></li>`;
robotActive.addEventListener("change", (e) => {
    const nameRobot = e.target.value;
    renderIo(nameRobot);
    statusPositionAndMission(nameRobot);
});
const renderIo = async (nameRobot) => {
    const res = await fetch(`/api/input-gpio?name_seri=${nameRobot}`);
    const data = await res.json();
    const ioInputHTML = data?.dataInput?.map((io, index) => {
        return `<li class="w-8 h-8 rounded-full flex justify-center font-bold text-white items-center ${
            io === 0 ? "bg-red-500" : "bg-green-500"
        }">${index}</li>`;
    });
    const ioOutputHTML = data?.dataOutput?.map((io, index) => {
        return `<li class="w-8 h-8 rounded-full flex justify-center font-bold text-white items-center ${
            io === 0 ? "bg-red-500" : "bg-green-500"
        }">${index}</li>`;
    });
    const html = `
<div class="">
<span>Input</span>
    <ul class="flex gap-1 flex-wrap">
    ${ioInputHTML?.join("") || HTMLIoItem}
    </ul>
</div><div class=""><span>Output</span>
    <ul class="flex gap-1 flex-wrap">
    ${ioOutputHTML?.join("") || HTMLIoItem}
    </ul>
</div>`;
    gpioStartElement.innerHTML = html;
};

refreshBtn.onclick = (e) => {
    if (robotActive.value) {
        console.log(robotActive.value);
        renderIo(robotActive.value);
        toggerMessage("success", "refresh io successfully!");
    } else {
        toggerMessage("error", "Choose robot please!");
    }
};

robotList?.forEach((robot) => {
    subscribeTopic(
        `/${robot.name_seri}/output_user_set`,
        "std_msgs/String",
        (data, name) => {
            if (robotActive.value === robot.name_seri) {
                let counter = 0;
                var interval = setInterval(() => {
                    counter++;
                    renderIo(robot.name_seri);
                    if (counter >= 10) clearInterval(interval);
                }, 1500);
            }
        },
    );
});

const updateBtn = document.querySelector(".update-btn");
updateBtn.onclick = () => {
    if (robotActive.value) {
        statusPositionAndMission(robotActive.value);
        toggerMessage("success", "Đã cập nhật");
    } else {
        toggerMessage("error", "Vui lòng chọn robot!");
    }
};
async function statusPositionAndMission(nameRobot) {
    const RECEIVE_POSITION = "Set position for robot";
    const RECEIVE_MISSION = "Robot recevice multiple mission normal:";
    const historyList = await getHistory(nameRobot);

    const historySorted = historyList.sort((a, b) => b.timeLine - a.timeLine);
    const itemPosition = historySorted.find((his) => {
        return his.data.includes(RECEIVE_POSITION);
    });
    const itemMission = historySorted.find((his) => {
        return his.data.includes(RECEIVE_MISSION);
    });

    if (itemPosition) {
        timePosition.innerHTML = itemPosition.time;
    }
    if (itemMission) {
        console.log(timeMissionReceive);
        timeMissionReceive.innerHTML = itemMission.time || "không có dữ liệu";
        console.log();
        nameMissionReceive.innerHTML =
            itemMission.data?.replace(RECEIVE_MISSION, "") ||
            "không có dữ liệu";
    }
    console.log(itemPosition);
}
