import confirmationForm from "../functionHandle/confirmationForm.js";
import { loadingHeader } from "../functionHandle/displayLoad.js";
import useDebounce from "../hooks/useDebouche.js";
import Mission from "./Class/Mission.js";
import createTypeMission from "./blockStep/create.js";
import Label from "./component/Label.js";
import Function from "./function/index.js";

export const MissionClass = new Mission();
const blockStepWrapper = document.getElementById("block-step-wrapper");

createTypeMission();
Function();
handleAddStepToBlockStep();
handleDragDrop();

function handleAddStepToBlockStep() {
    blockStepWrapper.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-action-block-step]");
        if (!buttonAction) return;
        const typeAction = buttonAction.dataset.actionBlockStep;
        switch (typeAction) {
            case "add":
                MissionClass.setAddressAdd(buttonAction);
                const activeButton = document.querySelector(
                    '[data-action-block-step="add"].active'
                );
                activeButton?.classList.remove("active");
                buttonAction.classList.add("active");
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
            default:
                console.log(134);
                break;
        }
    });

    function removeSticky() {
        blockStepWrapper.querySelector("[data-name='sticky']")?.remove();
    }
}

function handleDragDrop() {
    let isLeftOrRightDrop;
    let valueStepDrag;
    let addressStepDrag;
    // DROP
    blockStepWrapper.addEventListener("drop", (e) => {
        const itemDrop = e.target.closest("[data-name='step']");
        const blockDrop = e.target.closest("[data-data-block]");
        // MissionClass.render();

        if (itemDrop) {
            const [address, indexStep] =
                MissionClass.getAddressByStep(itemDrop);
            // delete went target drop is step
            const addressDelete = addressStepDrag.address;

            const isDragDropSameBlock = addressDelete === address;
            console.log(isDragDropSameBlock);
            if (isDragDropSameBlock) {
                MissionClass.deleteStep(addressStepDrag);
                MissionClass.addStep({
                    step: valueStepDrag,
                    isDefaultLocation: false,
                    addressIndex: [address, indexStep],
                    side: isLeftOrRightDrop,
                });
            } else {
                MissionClass.addStep({
                    step: valueStepDrag,
                    isDefaultLocation: false,
                    addressIndex: [address, indexStep],
                    side: isLeftOrRightDrop,
                });
                MissionClass.deleteStep(addressStepDrag);
            }
        } else if (blockDrop) {
            const buttonAdd = MissionClass.lastQuerySelector({
                wrapper: blockDrop,
                query: "[data-action-block-step='add']",
            });

            MissionClass.setAddressAdd(buttonAdd);
            MissionClass.addStep({ step: valueStepDrag });

            // delete went target drop is block
            MissionClass.deleteStep(addressStepDrag);
        }

        MissionClass.render();
        removeSticky.hightLineLine();
        removeSticky.hightLineBorder();
    });
    // END DROP
    // DRAG START
    blockStepWrapper.addEventListener("dragstart", (e) => {
        const [address, indexStep] = MissionClass.getAddressByStep(e.target);
        addressStepDrag = { address, indexStep };
        const itemDrop = e.target.closest("[data-name='step']");
        valueStepDrag = itemDrop.dataset.value;
    });
    // END DRAG START
    // OVER
    const line = Label.line();
    blockStepWrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        const itemDrop = e.target.closest("[data-name='step']");
        const itemBlockDrop = e.target.closest("[data-block-wrapper]");
        const blockDrop = e.target.closest("[data-data-block]");

        if (itemDrop) {
            removeSticky.hightLineBorder();
            const offsetX = e.offsetX;
            const targetWidth = itemDrop.offsetWidth;
            const distanceFromCenter = offsetX - targetWidth / 2;

            if (distanceFromCenter < 0) {
                line.style.left = "-3px";
                line.style.right = "auto";
                isLeftOrRightDrop = "left";
            } else {
                isLeftOrRightDrop = "right";
                line.style.right = "-3px";
                line.style.left = "auto";
            }
            itemDrop.appendChild(line);
            e.preventDefault();
            return;
        } else if (blockDrop) {
            removeSticky.hightLineLine();
            removeSticky.hightLineBorder();
            blockDrop.parentElement.classList.add("highline-border");
            return;
        } else if (itemBlockDrop && blockDrop) {
            console.log(123);
        }
    });
    // END OVER
    // DRAG END
    blockStepWrapper.addEventListener("dragend", (e) => {
        removeSticky.hightLineLine();
        removeSticky.hightLineBorder();
    });
    // END DRAG END
}
const removeSticky = {
    hightLineBorder() {
        blockStepWrapper
            .querySelector(".highline-border")
            ?.classList.remove("highline-border");
    },
    hightLineLine() {
        blockStepWrapper
            .querySelectorAll(".highline-line")
            ?.forEach((e) => e.remove());
    },
};
