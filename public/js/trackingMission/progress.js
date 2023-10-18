import { toggerMessage } from "../main.js";
import Mission from "../missionNew/Class/Mission.js";
import convertTopic from "./convertTopic.js";
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
const checkTabProgress = getNode("#progress-main");
const missionClass = new Mission();

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
    checkProgress();
    robotSelect.addEventListener("change", onChange);
    function onChange(e) {
        const nameRobot = e.target.value;
        (function resetProgress() {
            actionTopic?.unsubscribe();
            variableTopic?.unsubscribe();
            memoryTopic?.unsubscribe();
            showProgress.remove();
            messageComplete.dataset.status = "hidden";
            currentMission.id_mission = "";
            progressMainWrapper.textContent =
                "Select robot to display mission or This robot could not find the data";
            localVariableWrapper.textContent =
                "Select robot to display local variables or This robot could not find the data";
            missionMemoryWrapper.textContent =
                "Select robot to display mission memory or This robot could not find the data";
        })();
        if (!nameRobot) return;
        actionTopic = topic({ name: `/${nameRobot}/mission_action_infor` });
        variableTopic = topic({ name: `/${nameRobot}/local_variable` });
        memoryTopic = topic({ name: `/${nameRobot}/mission_memory` });

        //mission_action_infor
        const actionSubscribe = (data, topic) => {
            if (!data) {
                progressMainWrapper.textContent =
                    "This robot could not find the data";
                return;
            }
            const infoMission = convertTopic.mission_action_infor(data);
            const { id_mission } = infoMission;
            activeStepNow(infoMission);
            showProgress.render(infoMission);
            if (currentMission.id_mission !== id_mission) {
                currentMission.id_mission = id_mission;
                renderMission(infoMission);
            }
        };
        actionTopic.subscribe(actionSubscribe);

        //local_variable
        const variableSubscribe = (data) => {
            if (!data) {
                localVariableWrapper.textContent =
                    "This robot could not find the data";
                return;
            }
            const dataVariable = convertTopic.local_variable(data);
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
        };
        variableTopic.subscribe(variableSubscribe);

        //mission_memory
        const memorySubscribe = (data) => {
            if (!data) {
                missionMemoryWrapper.textContent =
                    "This robot could not find the data";
                return;
            }
            const dataMemory = convertTopic.mission_memory(data);
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
        };
        memoryTopic.subscribe(memorySubscribe);
    }
}
async function renderMission(infoMission) {
    console.log("get mission from database");
    const { id_mission } = infoMission;
    if (!id_mission) return;
    const statusFetch = await missionClass.getDataById(id_mission);
    if (!statusFetch.error) {
        currentMission.mission_shorthand = statusFetch.data.mission_shorthand;
        progressMainWrapper.innerHTML = missionClass.renderHtml({
            data: JSON.parse(currentMission.mission_shorthand),
            handleAble: false,
        });
        activeStepNow(infoMission);
    } else {
        toggerMessage("error", statusFetch.message);
    }
}

function activeStepNow(infoMission) {
    const { total_step, now_step: stepNow } = infoMission;
    if (stepNow >= total_step) messageComplete.dataset.status = "show";
    const styleActive = ["ring-4", "ring-red-500", "step-active"];
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
            <div class="flex gap-6 bg-main/70 rounded-tr-xl backdrop-blur-sm">
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
            <div class="w-full h-4 bg-white/50 backdrop-blur-sm">
                <div class="h-full bg-green-500" style="width:${progress};" ></div>
            </div>

    `;
    },
    remove() {
        infoProgress.innerHTML = "";
    },
};
function checkProgress() {
    const onActive = (e) => {
        if (!e.target.checked) return;
        const stepActive = getNode(".step-active");
        setTimeout(() => {
            stepActive?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }, 500);
    };
    checkTabProgress.addEventListener("change", onActive);
}

export default progress;
