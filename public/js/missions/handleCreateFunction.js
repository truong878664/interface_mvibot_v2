import { $, $$ } from "../main.js";
import { createMapPosition } from "./function/point.js";

let tabFunctionActive;

handleHideFormFunction();

export default function handleCreateFunction() {
    const createFunctionBtns = $$(".create-function-btn");
    createFunctionBtns.forEach((element) => {
        element.addEventListener("click", createFunction);
    });
}

function createFunction(e) {
    const type = e.target.dataset.type;
    handleShowFormFunction(true, type);
    type === "position" && createMapPosition();
}

export function handleShowFormFunction(isShow, typeFunction) {
    $(".function-item-form-wrapper")?.classList.toggle("hidden", !isShow);
    $(`.function-mission-tab[data-type=${typeFunction}`)?.classList.toggle(
        "hidden",
        !isShow
    );

    isShow && (tabFunctionActive = typeFunction);
}

function handleHideFormFunction() {
    $(".function-item-form-wrapper").onclick = function (e) {
        if (e.target !== this) return;
        handleShowFormFunction(false, tabFunctionActive);
    };
}