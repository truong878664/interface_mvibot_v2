import { handleShowFormFunction } from "../handleCreateFunction.js";
import resetGpio from "./gpio/resetGpio.js";
import resetPosition from "./position/resetPosition.js";
import { currentIdUpdate } from "./showDataFunction.js";
import updateDataFunction from "./updateDataFunction.js";
import resetVariable from "./variable/resetVariable.js";

export default function handleUpdateStep(type) {
    let updateBtnWrapper;

    updateBtnWrapper = $(`.${type}-update-btn-wrapper`);
    updateBtnWrapper.classList.remove("hidden");
    $(`.submit-btn-${type}`).classList.add("hidden");

    updateBtnWrapper.querySelector(`.${type}-update-cancel`).onclick = (e) => {
        e.preventDefault();
        handleResetData();
        $(`.submit-btn-${type}`).classList.remove("hidden");
        handleShowFormFunction(false, type);
    };

    updateBtnWrapper.querySelector(`.${type}-update-btn`).onclick = (e) => {
        e.preventDefault();
        updateDataFunction(type) && handleResetData();

        $(`.submit-btn-${type}`).classList.remove("hidden");
        handleShowFormFunction(false, type);
    };

    function handleResetData() {
        updateBtnWrapper.classList.add("hidden");
        $$(".input-reset").forEach((element) => {
            element.value = "";
        });

        $$(".offset-s-001").forEach((element) => {
            element.value = 0.01;
            currentIdUpdate;
        });

        (type === "gpio" || type == "gpio_module") && resetGpio();

        type === "variable" && resetVariable();
        type === "position" && resetPosition();
    }
}
