import Label from "../component/Label.js";
import { MissionClass, blockStepWrapper } from "../index.js";

export default function handleDragDrop() {
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
        const blockDrop = e.target.closest("[data-block-wrapper]")
        if(itemDrop) {
            valueStepDrag = itemDrop.dataset.value;
        } else if(blockDrop) {
            valueStepDrag = blockDrop.dataset.value
        }
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
