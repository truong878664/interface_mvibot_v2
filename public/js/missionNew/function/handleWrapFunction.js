import { MissionClass } from "../index.js";
import { toggerMessage } from "../../main.js";
import confirmationForm from "../../functionHandle/confirmationForm.js";
import showFormFunction from "./action/showFormFunction.js";
import { classFunctions } from "./index.js";
import { FunctionStepClass } from "../FunctionStepClass.js";

export default function handleWrapFunction() {
    const functionContainer = document.getElementById("function-container");
    functionContainer.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-button-function-kind]");
        if (!buttonAction) return;
        const functionItem = e.target.closest(".function-item");
        const functionKind = buttonAction?.dataset.buttonFunctionKind;
        const functionType = functionItem?.dataset.functionType;
        const functionId = functionItem?.dataset.id;
        if (!functionType) return;
        const functionClass = classFunctions[functionType];
        switch (functionKind) {
            case "add":
                const valueFunction = functionItem.dataset.value;
                MissionClass.addStep({ step: valueFunction });
                MissionClass.render();
                break;
            case "delete":
                confirmationForm({ callback: handleDeleteFunction });
                async function handleDeleteFunction() {
                    const data = await functionClass.delete(functionId);
                    FunctionStepClass.delete({
                        type: functionType,
                        id: functionId,
                    });
                    toggerMessage(
                        data.deleted ? "success" : "error",
                        data.message
                    );
                    data.deleted && functionItem.remove();
                }
                break;
            case "edit":
                showFormFunction({
                    type: functionType,
                    show: true,
                    method: "update",
                });
                const data = JSON.parse(functionItem.dataset.data);
                functionClass.display(data);
                functionClass.currentIdUpdate = data.id;
                break;
            default:
                console.log("Default button function clicked!", functionKind);
                break;
        }
    });
}
