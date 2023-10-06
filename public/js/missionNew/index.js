import { loaded, loading } from "../functionHandle/displayLoad.js";
import sendMission from "../functionHandle/sendMission.js";
import { toggerMessage } from "../main.js";
import Mission from "./Class/Mission.js";
import createTypeMission from "./blockStep/create.js";
import Function from "./function/index.js";
import handleDragDrop from "./handle/handleDragDrop.js";
import typeMission from "./typeMission/index.js";
import subscribeTopic from "../rosModule/subscribeTopic.js";
import getUA from "../functionHandle/getUA.js";
import handleHistory from "./blockStep/history.js";
import { wakeUpStop } from "./configuration/index.js";
import search from "./function/action/search.js";
import handleAddStepToBlockStep from "./function/action/handleAddStepToBlockStep.js";
import test from "./test.js";

export const MissionClass = new Mission();
export const blockStepWrapper = document.getElementById("block-step-wrapper");
export const functionWrapper = document.getElementById("function-container");

createTypeMission();
subscribeMissionChange();

Function();
typeMission();
handleAddStepToBlockStep();
handleDragDrop();
handleSendMission();
handleMoreAction();
handleHistory();
wakeUpStop();
search();
test();

function handleSendMission() {
    const sendBtn = document.querySelector("[data-type-button='send-mission']");
    const closeFormSendMission = document.getElementById("input-send-mission");
    sendBtn.onclick = async (e) => {
        try {
            loading();
            const data = await MissionClass.getDataRobot({});
            if (!data.success) {
                toggerMessage("error", data.message);
                loaded();
                return;
            }
            const nameRobot = document.querySelector(
                "#select-robot-option"
            ).value;
            const typeMission = sendBtn.dataset.typeMission;
            const dataEnd = MissionClass.dataEndToRobot(data);
            sendMission({ nameRobot, data: dataEnd, typeMission });
            closeFormSendMission.checked = false;
            loaded();
        } catch (error) {
            toggerMessage("error", "ERR!, Please try again!");
            console.log(error);
        }
    };
}

function handleMoreAction() {
    const moreActionWrapper = document.getElementById("more-action-wrapper");
    moreActionWrapper.onclick = (e) => {
        const buttonMoreAction = e.target.closest("[data-button-action-more");
        if (!buttonMoreAction) return;
        const typeButton = buttonMoreAction.dataset.buttonActionMore;
        const actions = {
            code() {
                handleCode();
            },
        };
        actions[typeButton]?.();
    };
}

async function handleCode() {
    loading();
    const data = await MissionClass.getDataRobot({ html: true });

    const showMissionForm = document.createElement("div");
    showMissionForm.classList.add(
        "fixed",
        "top-0",
        "z-[51]",
        "left-0",
        "right-0",
        "bottom-0",
        "bg-[rgba(0,0,0,0.2)]",
        "show-mission-form-wrapper",
        "flex",
        "justify-center",
        "items-center"
    );

    const htmlMission = `
                <div class="bg-[#fff] rounded-md flex flex-col text-2xl show-mission-form w-2/3 max-h-[500px] h- relative">
                    <button class="absolute top-2 right-2 p-2 btn copy-mission-btn">
                        <i class="fa-regular fa-copy"></i>
                    </button>
                    <div class="p-4 h-full w-full overflow-y-auto">
                        <div>
                            <span class="font-bold mr-2">Continue:</span>
                            <span>${data.continue}</span>
                        </div>
                        <div>
                            <span class="font-bold mr-2">Wake up:</span>
                            <span>${data.wakeup}</span>
                        </div>
                        <div>
                            <span class="font-bold mr-2">Stop:</span>
                            <span>${data.stop}</span>
                        </div>
                        <div>
                            <span class="font-bold mr-2">Data:</span>
                            <div class="text-justify">${data.data}</div>
                        </div>
                    </div>
                </div>`;

    showMissionForm.innerHTML = htmlMission;
    document.body.appendChild(showMissionForm);
    const formShowMission = $(".show-mission-form-wrapper");
    formShowMission.onclick = (e) => {
        const isOverlay = e.target.closest(".show-mission-form");
        !isOverlay && formShowMission.remove();
    };
    handleCopyMission();
    loaded();
}

function handleCopyMission() {
    const copyMissionBtn = $(".copy-mission-btn");
    copyMissionBtn &&
        (copyMissionBtn.onclick = async (e) => {
            // loading();
            const data = await MissionClass.getDataRobot({});
            const dataEnd = MissionClass.dataEndToRobot(data);
            console.log(dataEnd);
            copyToClipboard(dataEnd);
            // loaded();
        });

    const copyToClipboard = (content) => {
        try {
            if (window.isSecureContext && navigator.clipboard) {
                toggerMessage("success", content);
                navigator.clipboard.writeText(content);
            } else {
                toggerMessage("success", content);
                unsecuredCopyToClipboard(content);
            }
            toggerMessage("success", "Copied!");
        } catch (error) {
            toggerMessage("success", error);
        }
    };
    const unsecuredCopyToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error("Unable to copy to clipboard", err);
        }
        document.body.removeChild(textArea);
    };
}

function subscribeMissionChange() {
    subscribeTopic(
        `change_data_mission/${MissionClass.id}`,
        "std_msgs/String",
        (data, name) => {
            const dataDevice = JSON.parse(data.data);
            if (dataDevice.id !== window.name) {
                MissionClass.get();
                toggerMessage(
                    "success",
                    getUA(dataDevice.name) + " device changed mission!"
                );
            }
        }
    );
}
