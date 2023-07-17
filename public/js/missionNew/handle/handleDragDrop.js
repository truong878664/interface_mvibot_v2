import Label from "../component/Label.js";
import { MissionClass, blockStepWrapper } from "../index.js";

export default function handleDragDrop() {
    let isLeftOrRightDrop;
    let valueStepDrag;
    let addressStepDrag;
    // DROP
    blockStepWrapper.addEventListener("drop", (e) => {
        const itemDrop = e.target.closest(
            "[data-name='step'],[data-data-block], [data-block-wrapper]"
        );

        const isStep = itemDrop?.dataset.name === "step";
        const isBlock = itemDrop?.dataset.dataBlock !== undefined;

        const { address: addressFrom, indexStep: indexStepFrom } =
            addressStepDrag;

        if (isBlock) {
            const buttonAdd = MissionClass.lastQuerySelector({
                wrapper: itemDrop,
                query: "[data-action-block-step='add']",
            });
            MissionClass.setAddressAdd(buttonAdd);
            MissionClass.move({
                fromIndex: indexStepFrom,
                addressFrom,
                isBlock: true,
            });
            return;
        } else {
            const [addressTo, indexStepTo] =
                MissionClass.getAddressByStep(itemDrop);

            const optionMove = {
                fromIndex: indexStepFrom,
                toIndex: indexStepTo,
                addressFrom,
                addressTo,
                sideToAdd: isLeftOrRightDrop,
            };
            MissionClass.move(optionMove);
            return;
        }
    });
    // END DROP
    // DRAG START
    blockStepWrapper.addEventListener("dragstart", (e) => {
        const [address, indexStep] = MissionClass.getAddressByStep(e.target);
        addressStepDrag = { address, indexStep };
        const itemDrop = e.target.closest("[data-name='step']");
        const blockDrop = e.target.closest("[data-block-wrapper]");
        if (itemDrop) {
            valueStepDrag = itemDrop.dataset.value;
        } else if (blockDrop) {
            valueStepDrag = blockDrop.dataset.value;
        }
    });
    // END DRAG START
    // OVER
    const line = Label.line();
    const lineLarge = Label.lineLarge();
    blockStepWrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        const itemDrop = e.target.closest(
            "[data-name='step'],[data-data-block], [data-block-wrapper]"
        );

        const isStep = itemDrop?.dataset.name === "step";
        const isBlock = itemDrop?.dataset.dataBlock !== undefined;
      
        if (isStep) {
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
        } else if (isBlock) {
            removeSticky.hightLineLine();
            removeSticky.hightLineBorder();
            itemDrop.parentElement.classList.add("highline-border");
            return;
        } else if (itemDrop) {
            removeSticky.hightLineBorder();

            const offsetY = e.offsetY;
            const targetHeight = itemDrop.offsetHeight;
            const distanceFromCenter = offsetY - targetHeight / 2;

            if (distanceFromCenter < 0) {
                lineLarge.style.top = "-3px";
                lineLarge.style.bottom = "auto";
                isLeftOrRightDrop = "left";
            } else {
                isLeftOrRightDrop = "right";
                lineLarge.style.bottom = "-3px";
                lineLarge.style.top = "auto";
            }
            itemDrop.appendChild(lineLarge);
        } else {
            removeSticky.hightLineLine();
            removeSticky.hightLineBorder();
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
