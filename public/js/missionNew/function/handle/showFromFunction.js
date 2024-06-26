import showFormFunction from "../action/showFormFunction.js";
import { classFunctions } from "../index.js";
import render3DMap from "../position/handle/render.js";

export default function handleShowFormFunction() {
    const functionContainer = document.getElementById("function-container");
    functionContainer.addEventListener("click", (e) => {
        const newFunctionBtn = e.target.closest(
            "[data-button-function-kind='new']",
        );
        const isButtonDismiss = e.target.closest(
            "[data-button-function-kind='dismiss']",
        );

        if (isButtonDismiss) {
            showFormFunction({
                show: false,
            });
        }
        if (!newFunctionBtn) return;
        const typeFunction = newFunctionBtn.dataset.typeMission;
        showFormFunction({
            type: typeFunction,
            show: true,
        });
        if (typeFunction === "position") {
            render3DMap();
        }
    });

    function HideFormFunction() {
        const functionFormWrapper = document.getElementById(
            "function-item-form-wrapper",
        );
        functionFormWrapper.onclick = function (e) {
            const isFunctionItem = e.target.closest(".function-form-item");
            if (isFunctionItem) return;
            showFormFunction({
                show: false,
            });
        };
    }
}
