import Node from "../../functionHandle/Node.js";
import Label from "../component/Label.js";
import deleteZone from "../component/deleteZone.js";
import { MissionClass, blockStepWrapper } from "../index.js";

export default function handleDragDrop() {
    let isLeftOrRightDrop;
    let valueStepDrag;
    let addressStepDrag;
    let currentItemDrop;
    const opacityClassWhenStartDrag = "opacity-30";

    const itemOver = (function () {
        const HTMLElement = Node("div").props({
            id: "itemOver",
            className:
                "w-0 h-0 relative after:absolute after:top-0 after:left-0 after:bg-blue-600 data-[type='largeH']:w-full data-[type='small']:after:h-[30px] data-[type='small']:after:w-[2px] data-[type='largeH']:after:w-full data-[type='largeH']:after:h-[2px] data-[type='largeV']:after:w-[2px] data-[type='largeV']:after:h-[110px]",
        });
        return {
            add(data) {
                Object.assign(HTMLElement.dataset, data.dataset);
                return HTMLElement;
            },
        };
    })();

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
            itemDrop.classList.add(opacityClassWhenStartDrag);
            currentItemDrop = itemDrop;
            valueStepDrag = itemDrop.dataset.value;
        } else if (blockDrop) {
            blockDrop?.classList.add(opacityClassWhenStartDrag);
            currentItemDrop = blockDrop;
            valueStepDrag = blockDrop.dataset.value;
        }
        blockStepWrapper.appendChild(deleteZone());
    });
    // END DRAG START
    // OVER
    blockStepWrapper.addEventListener("dragover", (e) => {
        e.preventDefault();
        const itemDrop = e.target.closest(
            "[data-name='step'], [data-data-block], [data-block-wrapper]",
        );

        const isStep = itemDrop?.dataset.name === "step";
        const isBlock = itemDrop?.dataset.dataBlock !== undefined;
        const deleteZone = e.target.closest("#delete-zone");

        if (isStep) {
            const rect = itemDrop.getBoundingClientRect();
            const distanceFromCenter = e.clientX - (rect.x + rect.width / 2);

            if (distanceFromCenter < 0) {
                isLeftOrRightDrop = "left";
                itemDrop.parentElement.insertBefore(
                    itemOver.add({ dataset: { type: "small" } }),
                    itemDrop,
                );
            } else {
                isLeftOrRightDrop = "right";
                itemDrop.parentElement.insertBefore(
                    itemOver.add({ dataset: { type: "small" } }),
                    itemDrop.nextSibling,
                );
            }
            e.preventDefault();
            return;
        } else if (isBlock) {
            removeSticky.hightLineBorder();
            itemDrop.parentElement.classList.add("highline-border");
            itemDrop.insertBefore(
                itemOver.add({ dataset: { type: "small" } }),
                itemDrop.lastElementChild,
            );
            return;
        } else if (itemDrop) {
            removeSticky.hightLineBorder();
            const rect = itemDrop.getBoundingClientRect();
            const isHidden = itemDrop.dataset.showData === "hidden";
            const clientCheck = isHidden ? e.clientX : e.clientY;
            const rectCheck = isHidden
                ? rect.x + rect.width / 2
                : rect.y + rect.height / 2;

            const typeItemOver = isHidden ? "largeV" : "largeH";
            const distanceFromCenter = clientCheck - rectCheck;
            if (distanceFromCenter > 0) {
                itemDrop.parentElement.insertBefore(
                    itemOver.add({ dataset: { type: typeItemOver } }),
                    itemDrop.nextSibling,
                );
                isLeftOrRightDrop = "right";
            } else {
                itemDrop.parentElement.insertBefore(
                    itemOver.add({ dataset: { type: typeItemOver } }),
                    itemDrop,
                );
                isLeftOrRightDrop = "left";
            }
            return;
        } else {
            itemOver.add({ dataset: { type: "none" } }).remove();
            removeSticky.hightLineBorder();
        }
        if (deleteZone) {
            deleteZone.dataset.status = "active";
        } else {
            const deleteZone = blockStepWrapper.querySelector("#delete-zone");
            if (deleteZone) deleteZone.dataset.status = "";
        }
    });
    // END OVER
    // DRAG END
    blockStepWrapper.addEventListener("dragend", (e) => {
        blockStepWrapper.querySelector("#delete-zone").remove();
        currentItemDrop?.classList.remove(opacityClassWhenStartDrag);
    });
    // END DRAG END
}

const removeSticky = {
    hightLineBorder() {
        blockStepWrapper
            .querySelector(".highline-border")
            ?.classList.remove("highline-border");
    },
};
