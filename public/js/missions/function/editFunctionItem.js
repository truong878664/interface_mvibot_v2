import { $$ } from "../../main.js";

import { handleShowFormFunction } from "../handleCreateFunction.js";
import handleUpdateStep from "./handleUpdate.js";
import showDataFunction from "./showDataFunction.js";

export default function handleEditFunctionType() {
    const editFunctionItemBtns = $$(".edit-function-item-btn");
    editFunctionItemBtns.forEach((element) => {
        element.onclick = (e) => {
            const functionItem = e.target.closest(
                ".type-mission-function-item"
            );

            const typeFunction = functionItem.getAttribute("function-type");
            const valueFunction = JSON.parse(
                functionItem.querySelector(".value-function-item").value
            );

            handleShowFormFunction(true, typeFunction);
            showDataFunction(typeFunction, valueFunction);
            handleUpdateStep(typeFunction);
        };
    });
}
