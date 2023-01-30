import { $, $$ } from "../../main.js";
import dbDelete from "../functionHandle/dbDelete.js";
import translatesStepsMission from "../functionHandle/translatesStepsMission.js";
import { currentMission, renderBlockStep } from "../handleStepMission.js";
import { htmlDataFunction } from "../handleTypeMission.js";

export default function handleDeleteFunctionType() {
    $$(".delete-function-item-btn").forEach((element) => {
        element.onclick = (e) => {
            dbDelete(e.target, () => deleteItem(e));
        };
    });
}

function deleteItem(e) {
    const functionItem = e.target.closest(".type-mission-function-item");
    const typeFunction = functionItem.getAttribute("function-type");
    const idFunction = functionItem.getAttribute("function-id");
    const fullNameFunction = functionItem.querySelector(
        ".value-type-mission-function-item"
    ).value;

    functionItem
        .closest(".detail-type-mission-function")
        .classList.contains("detail-type-mission-function-normal") &&
        Array.from($(".detail-type-mission-function-normal").childNodes).find(
            (node, index) => {
                if (node.isEqualNode(functionItem)) {
                    htmlDataFunction[typeFunction].splice(index, 1);
                }
            }
        );

    functionItem
        .closest(".detail-type-mission-function")
        .classList.contains("detail-type-mission-function-ifelse") &&
        Array.from($(".detail-type-mission-function-ifelse").childNodes).find(
            (node, index) => {
                if (node.isEqualNode(functionItem)) {
                    htmlDataFunction[typeFunction].splice(index, 1);
                }
            }
        );

    fetch(`/api/${typeFunction}/${idFunction}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            $$(
                `.type-mission-function-item[function-id='${idFunction}'][function-type=${typeFunction}]`
            ).forEach((element) => {
                element.remove();
            });
            console.log(data);
            translatesStepsMission(currentMission);
            renderBlockStep();
        });
}
