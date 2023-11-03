import Label from "../component/Label.js";
import deleteZone from "../component/deleteZone.js";
import { MissionClass, blockStepWrapper } from "../index.js";

export default function handleDragDrop() {
    let isLeftOrRightDrop;
    let valueStepDrag;
    let addressStepDrag;
    // DROP
    blockStepWrapper.addEventListener("drop", (e) => {
        const itemDrop = e.target.closest(
            "[data-name='step'],[data-data-block], [data-block-wrapper]",
        );
        const deleteZone = e.target.closest("#delete-zone");

        const isStep = itemDrop?.dataset.name === "step";
        const isBlock = itemDrop?.dataset.dataBlock !== undefined;

        const { address: addressFrom, indexStep: indexStepFrom } =
            addressStepDrag;

        if (deleteZone) {
            MissionClass.deleteStep({
                address: addressFrom,
                indexStep: indexStepFrom,
            });
            MissionClass.render();
        } else if (isBlock) {
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
        blockStepWrapper.appendChild(deleteZone());
    });
    // END DRAG START
    // OVER
    const line = Label.line();
    const lineLargeY = Label.lineLargeY();
    const lineLargeX = Label.lineLargeX();
    blockStepWrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        const itemDrop = e.target.closest(
            "[data-name='step'],[data-data-block], [data-block-wrapper]",
        );

        const isStep = itemDrop?.dataset.name === "step";
        const isBlock = itemDrop?.dataset.dataBlock !== undefined;
        const deleteZone = e.target.closest("#delete-zone");

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

            const isHidden = itemDrop.dataset.showData === "hidden";
            const lineLarge = isHidden ? lineLargeX : lineLargeY;
            const typeSide = isHidden ? "x" : "y";
            const valueSideLineLarge = {
                x: ["left", "right"],
                y: ["top", "bottom"],
            };
            if (distanceFromCenter < 0) {
                lineLarge.style[valueSideLineLarge[typeSide][0]] = "-3px";
                lineLarge.style[valueSideLineLarge[typeSide][1]] = "auto";
                isLeftOrRightDrop = "left";
            } else {
                lineLarge.style[valueSideLineLarge[typeSide][1]] = "-3px";
                lineLarge.style[valueSideLineLarge[typeSide][0]] = "auto";
                isLeftOrRightDrop = "right";
            }
            itemDrop.appendChild(lineLarge);
        } else {
            removeSticky.hightLineLine();
            removeSticky.hightLineBorder();
        }
        if (deleteZone) {
            deleteZone.dataset.status = "active";
        } else {
            blockStepWrapper.querySelector("#delete-zone").dataset.status = "";
        }
    });
    // END OVER
    // DRAG END
    blockStepWrapper.addEventListener("dragend", (e) => {
        removeSticky.hightLineLine();
        removeSticky.hightLineBorder();
        blockStepWrapper.querySelector("#delete-zone").remove();
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
