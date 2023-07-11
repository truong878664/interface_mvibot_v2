import confirmationForm from "../functionHandle/confirmationForm.js";
import {
    loaded,
    loading,
    loadingHeader,
} from "../functionHandle/displayLoad.js";
import sendMission from "../functionHandle/sendMission.js";
import useDebounce from "../hooks/useDebouche.js";
import { toggerMessage } from "../main.js";
import Mission from "./Class/Mission.js";
import createTypeMission from "./blockStep/create.js";
import Label from "./component/Label.js";
import Function from "./function/index.js";
import handleDragDrop from "./handle/handleDragDrop.js";

export const MissionClass = new Mission();
export const blockStepWrapper = document.getElementById("block-step-wrapper");
const functionWrapper = document.getElementById("function-container");

createTypeMission();
Function();
handleAddStepToBlockStep();
handleDragDrop();
handleSendMission();
handleMoreAction();

function handleAddStepToBlockStep() {
    blockStepWrapper.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-action-block-step]");
        const stepWrapper = document.getElementById("step-wrapper");
        if (!buttonAction) return;
        const typeAction = buttonAction.dataset.actionBlockStep;
        let functionHighline;
        let timeOutDeleteHighline;

        switch (typeAction) {
            case "add":
                MissionClass.setAddressAdd(buttonAction);
                if (buttonAction.classList.contains("active")) {
                    stepWrapper.checked = false;
                    buttonAction.classList.remove("active");
                    MissionClass.resetCurrentAddAddress();
                    return;
                }
                const activeButton = document.querySelector(
                    '[data-action-block-step="add"].active'
                );
                activeButton?.classList.remove("active");
                buttonAction.classList.add("active");
                stepWrapper.checked = true;

                break;
            case "delete":
                const handleDelete = () => {
                    loadingHeader(true);
                    const [address, indexStep] =
                        MissionClass.getAddressByStep(buttonAction);
                    MissionClass.deleteStep({ address, indexStep });
                    MissionClass.render();
                    useDebounce({
                        cb: MissionClass.save.bind(MissionClass),
                        delay: 1000,
                    });
                };
                confirmationForm({ callback: handleDelete });
                break;
            case "duplicate":
                // MissionClass.setAddressAdd(buttonAction);
                const [address, indexStep] =
                    MissionClass.getAddressByStep(buttonAction);
                let valueStepDuplicate;
                const isStep = buttonAction.closest("[data-name='step']");
                const isBlock = buttonAction.closest("[data-name='block']");
                if (isStep) {
                    valueStepDuplicate = isStep.dataset.value;
                } else if (isBlock) {
                    valueStepDuplicate = isBlock.dataset.value;
                }
                MissionClass.addStep({
                    step: valueStepDuplicate,
                    isDefaultLocation: false,
                    addressIndex: [address, indexStep],
                });
                MissionClass.render();
                break;
            case "step":
                const isSticky = buttonAction.querySelector(
                    "[data-name='sticky']"
                );
                if (isSticky) {
                    isSticky.remove();
                } else {
                    removeSticky();
                    const currentStickyShow = blockStepWrapper.querySelector(
                        "[data-sticky='show']"
                    );
                    if (currentStickyShow) {
                        currentStickyShow.dataset.sticky = "hidden";
                    }

                    const sticky = Label.sticky;
                    const div = document.createElement("div");
                    div.innerHTML = sticky;
                    buttonAction.dataset.sticky = "show";
                    buttonAction.appendChild(div.firstElementChild);
                }
                break;
            case "hidden":
                const blockWrapper = buttonAction.closest(
                    "[data-block-wrapper]"
                );
                const currentStatusShow = blockWrapper.dataset.showData;
                const statusChange =
                    currentStatusShow === "show" ? "hidden" : "show";
                blockWrapper.dataset.showData = statusChange;
                buttonAction.dataset.status = statusChange;
                break;
            case "detail":
                const currentStep = buttonAction.closest("[data-name='step']");
                const valueStep = currentStep.dataset.value;
                const typeStep = currentStep.dataset.type;
                if (typeStep === "break") return;
                functionWrapper.querySelector("#" + typeStep).checked = true;
                stepWrapper.checked = true;
                const functionActive = functionWrapper.querySelector(
                    `[data-value='${valueStep}'`
                );
                functionActive?.classList.add("highline");
                functionActive?.scrollIntoView({ behavior: "smooth" });
                clearTimeout(timeOutDeleteHighline);
                functionHighline?.classList.remove("highline");
                functionHighline = document.querySelector(
                    "[data-function-type].highline"
                );
                timeOutDeleteHighline = setTimeout(() => {
                    functionHighline?.classList.remove("highline");
                }, 4000);

                break;
            default:
                console.log(134);
                break;
        }
    });

    function removeSticky() {
        blockStepWrapper.querySelector("[data-name='sticky']")?.remove();
    }
}

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
            console.log(data);
            sendMission({ nameRobot, data: data.data, typeMission });
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
        switch (typeButton) {
            case "code":
                handleCode();
                break;

            default:
                break;
        }
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
                            <span class="font-bold mr-2">Wake up:</span>
                            <span>null</span>
                        </div>
                        <div>
                            <span class="font-bold mr-2">Stop:</span>
                            <span>null</span>
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
            console.log(data);
            copyToClipboard(data.data);
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
