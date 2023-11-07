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
import { FunctionStepClass } from "./FunctionStepClass.js";
import Node from "../functionHandle/Node.js";

const idMission = document.getElementById("id-mission");

export const MissionClass = new Mission(idMission.value);
export const blockStepWrapper = document.getElementById("block-step-wrapper");
export const functionWrapper = document.getElementById("function-container");

(async function init() {
    createTypeMission();
    subscribeMissionChange();
    await FunctionStepClass.get();
    await MissionClass.get();
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
})();

function handleSendMission() {
    const sendBtn = document.querySelector("[data-type-button='send-mission']");
    const closeFormSendMission = document.getElementById("input-send-mission");
    sendBtn.onclick = async () => {
        try {
            loading();
            const data = await MissionClass.getDataRobot({});
            if (!data.success) {
                toggerMessage("error", data.message);
                loaded();
                return;
            }
            const nameRobot = document.querySelector(
                "#select-robot-option",
            ).value;
            const typeMission = sendBtn.dataset.typeMission;
            const dataEnd = MissionClass.dataEndToRobot(data);
            console.log(data);
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
            showAllMission() {
                const buttonCurrentHiddenStepList = document.querySelectorAll(
                    "[data-action-block-step='hidden'][data-status='hidden']",
                );
                buttonCurrentHiddenStepList.forEach((button) => {
                    button.click();
                });
            },
            hideAllMission() {
                const buttonCurrentHiddenStepList = document.querySelectorAll(
                    "[data-action-block-step='hidden'][data-status='show']",
                );
                buttonCurrentHiddenStepList.forEach((button) => {
                    button.click();
                });
            },
        };
        actions[typeButton]?.();
    };
}

async function handleCode() {
    loading();
    const data = await MissionClass.getDataRobot({ html: true });
    const onCopy = () => {
        (async () => {
            const data = await MissionClass.getDataRobot({});
            const dataEnd = MissionClass.dataEndToRobot(data);
            copyToClipboard(dataEnd);
        })();

        const copyToClipboard = (content) => {
            try {
                if (window.isSecureContext && navigator.clipboard) {
                    navigator.clipboard.writeText(content);
                } else {
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
    };

    const showMissionForm = Node("div").props({
        onClick: (e) => {
            if (e.target === showMissionForm) showMissionForm.remove();
        },
        className:
            "fixed top-0 z-51 left-0 right-0 bottom-0 bg-black/20 show-mission-form-wrapper flex justify-center items-end md:items-center",
        children: [
            Node("div").props({
                className:
                    "bg-white flex flex-col show-mission-form w-full h-[90%] md:w-[80%] md:h-[80%] md:rounded-md relative",
                children: [
                    Node("button").props({
                        className:
                            "absolute top-2 right-2 p-2 btn copy-mission-btn",
                        onClick: onCopy,
                        children: [
                            Node("i").props({
                                className: "fa-regular fa-copy",
                            }),
                        ],
                    }),
                    Node("div").props({
                        className: "p-4 h-full w-full overflow-y-auto",
                        children: ["continue", "wakeup", "stop", "data"].map(
                            (item) =>
                                Node("div").props({
                                    children: [
                                        Node("span").props({
                                            className: "font-bold mr-2",
                                            children: item + ":",
                                        }),
                                        Node("span").props({
                                            children: data[item],
                                        }),
                                    ],
                                }),
                        ),
                    }),
                ],
            }),
        ],
    });
    document.body.appendChild(showMissionForm);
    loaded();
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
                    getUA(dataDevice.name) + " device changed mission!",
                );
            }
        },
    );
}
