import confirmationForm from "../../../functionHandle/confirmationForm.js";
import { loadingHeader } from "../../../functionHandle/displayLoad.js";
import { toggerMessage } from "../../../main.js";
import TypeMission from "../../Class/TypeMission.js";
import Label from "../../component/Label.js";
import syncTypeMission from "../../handle/syncTypeMission.js";
import {
    MissionClass,
    blockStepWrapper,
    functionWrapper,
} from "../../index.js";
import { typeMissionClass } from "../../typeMission/index.js";

const getNode = document.querySelector.bind(document);
const getNodeList = document.querySelectorAll.bind(document);
export default function handleAddStepToBlockStep() {
    blockStepWrapper.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-action-block-step]");
        const stepWrapper = document.getElementById("step-wrapper");
        if (!buttonAction) return;
        const typeAction = buttonAction.dataset.actionBlockStep;
        let functionHighline;
        let typeMissionHighline;
        let timeOutDeleteHighline;

        const blockWrapper = buttonAction.closest("[data-block-wrapper]");
        const actions = {
            add() {
                MissionClass.setAddressAdd(buttonAction);
                if (buttonAction.classList.contains("active")) {
                    stepWrapper.checked = false;
                    buttonAction.classList.remove("active");
                    MissionClass.resetCurrentAddAddress();
                    return;
                }
                const activeButton = getNode(
                    '[data-action-block-step="add"].active',
                );
                activeButton?.classList.remove("active");
                buttonAction.classList.add("active");
                stepWrapper.checked = true;
            },
            delete() {
                const handleDelete = () => {
                    loadingHeader(true);
                    console.log(buttonAction);
                    const [address, indexStep] =
                        MissionClass.getAddressByStep(buttonAction);
                    MissionClass.deleteStep({ address, indexStep });
                    MissionClass.render();
                };
                confirmationForm({ callback: handleDelete });
            },
            duplicate() {
                const [address, indexStep] =
                    MissionClass.getAddressByStep(buttonAction);
                let valueStepDuplicate;
                const isStep = buttonAction.closest("[data-name='step']");
                const isBlock = buttonAction.closest("[data-name='block']");
                if (isStep) {
                    valueStepDuplicate = isStep.dataset.value;
                } else if (isBlock) {
                    const valueTypeMission = JSON.parse(isBlock.dataset.value);
                    valueTypeMission.id = null;
                    valueTypeMission.name = null;
                    valueStepDuplicate = JSON.stringify(valueTypeMission);
                }
                MissionClass.addStep({
                    step: valueStepDuplicate,
                    isDefaultLocation: false,
                    addressIndex: [address, indexStep],
                });
                MissionClass.render();
            },
            step() {
                const isSticky = buttonAction.querySelector(
                    "[data-name='sticky']",
                );
                if (isSticky) {
                    isSticky.remove();
                } else {
                    removeSticky();
                    const currentStickyShow = blockStepWrapper.querySelector(
                        "[data-sticky='show']",
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
            },
            hidden() {
                const [address, indexStep] =
                    MissionClass.getAddressByStep(buttonAction);

                const currentStatusShow =
                    blockWrapper.dataset.showData === "show";

                MissionClass.addStyle({
                    address,
                    indexStep,
                    style: { hidden: currentStatusShow ? true : false },
                });
                const statusChange = currentStatusShow ? "hidden" : "show";
                blockWrapper.dataset.showData = statusChange;
                buttonAction.dataset.status = statusChange;
            },
            detail() {
                const functionTab = document.getElementById("tab-function");
                const currentStep = buttonAction.closest("[data-name='step']");
                const valueStep = currentStep.dataset.value;
                const typeStep = currentStep.dataset.type;
                const [type, name, id] = valueStep.split("#");
                if (typeStep === "break") return;
                functionTab.checked = true;
                const functionWrapperDetail = functionWrapper.querySelector(
                    "#" + typeStep,
                );
                if (functionWrapperDetail) functionWrapperDetail.checked = true;
                stepWrapper.checked = true;
                const functionActive = functionWrapper.querySelector(
                    `[data-function-type='${type}'][data-id='${id}']`,
                );
                if (!functionActive) {
                    toggerMessage(
                        "error",
                        "This element was not found or deleted!",
                    );
                    return;
                }

                functionActive?.classList.add("highline");
                functionActive?.scrollIntoView({ behavior: "smooth" });
                clearTimeout(timeOutDeleteHighline);
                functionHighline?.classList.remove("highline");
                functionHighline = getNode("[data-function-type].highline");
                timeOutDeleteHighline = setTimeout(() => {
                    functionHighline?.classList.remove("highline");
                }, 4000);
            },
            save() {
                const data = blockWrapper.dataset.value;
                const typeBlock = blockWrapper.dataset.blockWrapper;
                const { x, y } = buttonAction.getBoundingClientRect();
                const { inputForm, buttonSubmit, formElement } = Label.form({
                    x,
                    y,
                });
                requestAnimationFrame(() => inputForm.focus());

                buttonSubmit.onclick = async (e) => {
                    const name = inputForm.value;
                    const dataTranslate = JSON.parse(data);
                    dataTranslate.id = null;
                    dataTranslate.name = name;
                    const dataSaveBlockMission = {
                        name,
                        type: typeBlock,
                        data: JSON.stringify(dataTranslate),
                        type_mission: MissionClass.typeMission,
                    };
                    const typeMission = new TypeMission();
                    const message =
                        await typeMission.save(dataSaveBlockMission);

                    const [address, indexStep] =
                        MissionClass.getAddressByStep(buttonAction);

                    MissionClass.update({
                        address,
                        indexStep,
                        data: {
                            id: message.id,
                            name: message.name,
                        },
                    });

                    formElement.remove();
                    MissionClass.save();
                    message.saved && typeMission.render();
                    toggerMessage(
                        message.saved ? "success" : "error",
                        message.message,
                    );
                };
            },
            update() {
                const handle = async () => {
                    const blockTypeMission = buttonAction.closest(
                        "[data-block-wrapper]",
                    );
                    const idTypeMission = blockTypeMission.dataset.id;
                    const valueNewTypeMission = JSON.parse(
                        blockTypeMission.dataset.value,
                    );

                    const message = await typeMissionClass.update({
                        id: idTypeMission,
                        data: valueNewTypeMission,
                    });
                    syncTypeMission(valueNewTypeMission);
                    toggerMessage(
                        message.error ? "error" : "success",
                        message.message,
                    );
                };
                confirmationForm({
                    message: "Do you want to update?",
                    callback: handle,
                });
            },
            detailTypeMission() {
                const idTypeMission = blockWrapper.dataset.id;
                const typeMission = blockWrapper.dataset.blockWrapper;
                const typeMissionTab =
                    document.getElementById("tab-type-mission");
                const listTypeMissionWrapper = document.querySelector(
                    "#list-type-mission-wrapper",
                );

                const dataListTypeMissionWrapper =
                    listTypeMissionWrapper.querySelector(
                        `[data-list-type-mission='${typeMission}']`,
                    );
                stepWrapper.checked = true;
                typeMissionTab.checked = true;
                document.querySelector(`input#${typeMission}`).checked = true;
                const foundedTypeMission =
                    dataListTypeMissionWrapper.querySelector(
                        `[data-id='${idTypeMission}']`,
                    );

                foundedTypeMission?.classList.add("highline-type-mission");
                foundedTypeMission?.scrollIntoView({ behavior: "smooth" });
                clearTimeout(timeOutDeleteHighline);
                typeMissionHighline?.classList.remove("highline");
                typeMissionHighline = getNode(
                    "[data-name='item-type-mission'].highline-type-mission",
                );
                timeOutDeleteHighline = setTimeout(() => {
                    typeMissionHighline?.classList.remove(
                        "highline-type-mission",
                    );
                }, 4000);
            },
            unLinkTypeMission() {
                const handle = () => {
                    const [address, indexStep] =
                        MissionClass.getAddressByStep(buttonAction);
                    MissionClass.update({
                        address,
                        indexStep,
                        data: { id: null, name: null },
                    });
                    MissionClass.save();
                };
                confirmationForm({
                    message: "Do you want to unlink type mission?",
                    callback: handle,
                });
            },
        };

        actions[typeAction]?.();
    });

    function removeSticky() {
        blockStepWrapper.querySelector("[data-name='sticky']")?.remove();
    }
}
