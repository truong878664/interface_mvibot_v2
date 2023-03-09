import { $, $$ } from "../main.js";

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
    console.log(type);
    handleShowFormFunction(true, type);
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
    $(".hide-form-function-btn").onclick = (e) => {
        handleShowFormFunction(false, tabFunctionActive);
    };
}
