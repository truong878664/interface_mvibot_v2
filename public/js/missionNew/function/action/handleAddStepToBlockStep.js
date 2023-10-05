import { MissionClass, blockStepWrapper } from "../../index.js";

export default function handleAddStepToBlockStep() {
    blockStepWrapper.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-action-block-step]");
        const stepWrapper = document.getElementById("step-wrapper");
        if (!buttonAction) return;
        const typeAction = buttonAction.dataset.actionBlockStep;
        let functionHighline;
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
                const activeButton = document.querySelector(
                    '[data-action-block-step="add"].active'
                );
                activeButton?.classList.remove("active");
                buttonAction.classList.add("active");
                stepWrapper.checked = true;
            },
            delete() {
                const handleDelete = () => {
                    loadingHeader(true);
                    const [address, indexStep] =
                        MissionClass.getAddressByStep(buttonAction);
                    MissionClass.deleteStep({ address, indexStep });
                    MissionClass.render();
                };
                confirmationForm({ callback: handleDelete });
            },
            duplicate() {
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
            },
            step() {
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
            },
            hidden() {
                const currentStatusShow = blockWrapper.dataset.showData;
                const statusChange =
                    currentStatusShow === "show" ? "hidden" : "show";
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
                functionWrapper.querySelector("#" + typeStep).checked = true;
                stepWrapper.checked = true;
                const functionActive = functionWrapper.querySelector(
                    `[data-function-type='${type}'][data-id='${id}']`
                );
                if (!functionActive) {
                    toggerMessage(
                        "error",
                        "This element was not found or deleted!"
                    );
                    return;
                }

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
            },
            save() {
                const data = blockWrapper.dataset.value;
                const typeBlock = blockWrapper.dataset.blockWrapper;
                const { x, y } = buttonAction.getBoundingClientRect();
                const div = document.createElement("div");
                div.innerHTML = Label.formName({ x, y });
                const formName = div.firstElementChild;
                const enterBtn = formName.querySelector(".enter-btn");
                const input = formName.querySelector("[name]");
                requestAnimationFrame(() => input.focus());

                enterBtn.onclick = async (e) => {
                    const name = formName.querySelector("[name='name']").value;
                    const dataTranslate = JSON.parse(data);
                    dataTranslate.name = name;
                    const dataSaveBlockMission = {
                        name,
                        type: typeBlock,
                        data: JSON.stringify(dataTranslate),
                        type_mission: MissionClass.typeMission,
                    };
                    const typeMission = new TypeMission();
                    const message = await typeMission.save(
                        dataSaveBlockMission
                    );
                    console.log(message);
                    formName.remove();

                    message.saved && typeMission.render();
                    toggerMessage(
                        message.saved ? "success" : "error",
                        message.message
                    );
                };
                blockStepWrapper.appendChild(formName);
            },
        };

        actions[typeAction]?.();
    });

    function removeSticky() {
        blockStepWrapper.querySelector("[data-name='sticky']")?.remove();
    }
}
