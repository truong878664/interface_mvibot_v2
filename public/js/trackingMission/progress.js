import { toggerMessage } from "../main.js";
import Mission from "../missionNew/Class/Mission.js";
import pub from "./pub.js";
import topic from "./subscribeTopic.js";

const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);
const robotSelect = getNode("#robot-navigation");
const localVariableWrapper = getNode("#local-variable-wrapper");
const progressMainWrapper = getNode("#progress-main-wrapper");
const missionMemoryWrapper = getNode("#mission-memory-wrapper");
const infoProgress = getNode("#info-progress");
const messageComplete = getNode("#completed-mission");
const missionClass = new Mission();

const splitIndex = (string, index) => {
    return [string.slice(0, index), string.slice(index)];
};
const splitTwoChar = (string, first, second) => {
    const result = [];
    let indexFirst;
    let indexSecond;
    while (true) {
        indexFirst = string.indexOf(first, indexFirst + 1);
        indexSecond = string.indexOf(second, indexSecond + 1);
        if (indexFirst === -1 && indexFirst === -1) break;
        result.push(string.slice(indexFirst + 1, indexSecond));
    }
    return result;
};

const convert = {
    mission_action_infor(data) {
        const dataMission = splitTwoChar(data, "(", ")");
        const dataMissionObject = {};
        dataMission.map((item) => {
            const [key, value] = item.split(":");
            dataMissionObject[key] = isNaN(Number(value))
                ? value
                : Number(value);
            return dataMissionObject;
        });
        return dataMissionObject;
    },
    local_variable(data) {
        const dataMission = splitTwoChar(data, "(", ")");
        const dataMissionObject = {};
        dataMission.map((item) => {
            const [key, value] = item.split(":");
            dataMissionObject[key] = value;
            return dataMissionObject;
        });
        return dataMissionObject;
    },
    mission_memory(data) {
        const dataMemory = data.split("/").filter((item) => item);
        const dataMissionObject = {};
        dataMemory.map((item) => {
            const [key, value] = item.split(":");
            dataMissionObject[key] = value;
            return dataMissionObject;
        });
        return dataMissionObject;
    },
};
let currentMission = {
    name_mission: "",
    id_mission: "",
    mission_shorthand: "",
};

function progress() {
    // pub();
    let actionTopic;
    let variableTopic;
    let memoryTopic;

    robotSelect.addEventListener("change", (e) => {
        const nameRobot = e.target.value;
        showProgress.remove();
        messageComplete.dataset.status = "hidden";
        currentMission.name_mission = "";

        actionTopic?.unsubscribe();
        variableTopic?.unsubscribe();
        memoryTopic?.unsubscribe();

        progressMainWrapper.textContent =
            "Select robot to display mission or This robot could not find the data";
        localVariableWrapper.textContent =
            "Select robot to display local variables or This robot could not find the data";
        missionMemoryWrapper.textContent =
            "Select robot to display mission memory or This robot could not find the data";
        if (!nameRobot) {
            return;
        }

        //mission_action_infor
        actionTopic = topic({ name: `/${nameRobot}/mission_action_infor` });
        actionTopic.subscribe((data, topic) => {
            if (!data) {
                progressMainWrapper.textContent =
                    "This robot could not find the data";
                return;
            }
            const infoMission = convert.mission_action_infor(data);
            const { name_mission } = infoMission;
            activeStepNow(infoMission);
            showProgress.render(infoMission);
            if (currentMission.name_mission !== name_mission) {
                currentMission.name_mission = name_mission;
                renderMission();
            }
        });

        //local_variable
        variableTopic = topic({ name: `/${nameRobot}/local_variable` });
        variableTopic.subscribe((data) => {
            if (!data) {
                localVariableWrapper.textContent =
                    "This robot could not find the data";
                return;
            }
            const dataVariable = convert.local_variable(data);
            const html = [];
            Object.keys(dataVariable).map((key) => {
                html.push(`
                    <div class="mr-4">
                        <span class="text-xs"><i class="fa-solid fa-circle"></i></span>
                        <span>${key}:</span>
                        <span class="font-bold">${dataVariable[key]}</span>
                    </div>
                    `);
                return html;
            });
            localVariableWrapper.innerHTML = html.join("");
        });

        //mission_memory
        memoryTopic = topic({ name: `/${nameRobot}/mission_memory` });
        memoryTopic.subscribe((data) => {
            if (!data) {
                missionMemoryWrapper.textContent =
                    "This robot could not find the data";
                return;
            }
            const dataMemory = convert.mission_memory(data);
            const html = [];
            Object.keys(dataMemory).map((key) => {
                html.push(`
                    <div class="mr-4">
                        <span class="text-xs"><i class="fa-solid fa-circle"></i></span>
                        <span>${key}:</span>
                        <span class="font-bold">${
                            dataMemory[key] ||
                            `<span class="text-red-400">no value</span>`
                        }</span>
                    </div>
                    `);
                return html;
            });
            missionMemoryWrapper.innerHTML = html.join("");
        });
    });
}

async function renderMission() {
    console.log("get mission from database");
    const statusFetch = await missionClass.getDataByName(
        currentMission.name_mission
    );
    if (!statusFetch.error) {
        currentMission.mission_shorthand = statusFetch.data.mission_shorthand;
        progressMainWrapper.innerHTML = missionClass.renderHtml({
            data: JSON.parse(currentMission.mission_shorthand),
            handleAble: false,
        });
    } else {
        toggerMessage("error", statusFetch.message);
    }
}

function activeStepNow(infoMission) {
    const { total_step, now_step: stepNow } = infoMission;
    if (stepNow >= total_step) {
        messageComplete.dataset.status = "show";
    }
    const styleActive = ["ring-4", "ring-red-500"];
    const stepList = getNodeList("[data-name='step']");
    const currentActiveStyle = getNode(
        "[data-name='step']." + styleActive.join(".")
    );
    currentActiveStyle?.classList.remove(...styleActive);

    const stepActive = stepList[stepNow - 1];
    if (stepActive) {
        stepActive.classList.add(...styleActive);
        stepActive.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
        });
    }
}

const showProgress = {
    render(infoMission) {
        const { name_mission, now_step, total_step } = infoMission;
        const progress = isNaN(now_step / total_step)
            ? "no value"
            : now_step / total_step >= 1
            ? "100%"
            : ((now_step / total_step) * 100).toFixed(1) + "%";
        infoProgress.innerHTML = `
            <div class="flex gap-6 bg-main/80 rounded-tr-xl">
            <div class="flex gap-3 text-white ml-4">
                <span>name mission:</span>
                <span class="font-bold text-red-500">${
                    name_mission || "no value"
                }</span>
            </div>
            <div class="flex gap-3 text-white">
                <span>total step: </span>
                <span class="font-bold text-red-500">${
                    total_step || "no value"
                }</span>
            </div>
            <div class="flex gap-3 text-white">
                <span>step now:</span>
                <span class="font-bold text-red-500"> ${
                    now_step || "no value"
                }</span>
            </div>
            <div class="flex gap-3 text-white">
                <span>mission progress:</span>
                <span class="font-bold text-red-500">
                    ${progress}
                </span>
            </div>
            </div>    
            <div class="w-full h-4 bg-white">
                <div class="h-full bg-green-500" style="width:${progress};" ></div>
            </div>

    `;
    },
    remove() {
        infoProgress.innerHTML = "";
    },
};
export default progress;
