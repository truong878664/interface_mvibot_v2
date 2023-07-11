import Label from "../component/Label.js";
import { MissionClass } from "../index.js";
import create from "./create.js";
import render from "./render.js";
import Gpio from "./Class/Gpio.js";
import GpioModule from "./Class/GpioModule.js";
import Marker from "./Class/Marker.js";
import Sleep from "./Class/Sleep.js";
import Sound from "./Class/Sound.js";
import Position from "./Class/Position.js";
import Variable from "./Class/Variable.js";
import Footprint from "./Class/Footprint.js";
import { toggerMessage } from "../../main.js";
import confirmationForm from "../../functionHandle/confirmationForm.js";

export const htmlDataFunction = {
    footprint: [],
    gpio: [],
    marker: [],
    sleep: [],
    position: [],
    gpio_module: [],
    variable: [],
    sound: [],
};
export const classFunctions = {
    footprint: Footprint,
    gpio: Gpio,
    gpio_module: GpioModule,
    marker: Marker,
    sleep: Sleep,
    sound: Sound,
    position: Position,
    variable: Variable,
};

export default function Function() {
    render();
    create();
    eventFunctionContainer();
}
function eventFunctionContainer() {
    const functionContainer = document.getElementById("function-container");
    functionContainer.addEventListener("click", (e) => {
        const buttonAction = e.target.closest("[data-button-function-kind]");
        if (!buttonAction) return;
        const functionItem = e.target.closest(".function-item");
        const functionKind = buttonAction?.dataset.buttonFunctionKind;
        const functionType = functionItem?.dataset.functionType;
        const functionId = functionItem?.dataset.id;
        switch (functionKind) {
            case "add":
                const valueFunction = functionItem.dataset.value;
                MissionClass.addStep({ step: valueFunction });
                MissionClass.render();
                break;
            case "delete":
                confirmationForm({ callback: handleDeleteFunction });
                async function handleDeleteFunction() {
                    const FunctionClass = classFunctions[functionType];
                    const functionClass = new FunctionClass();
                    const data = await functionClass.delete(functionId);

                    toggerMessage(
                        data.deleted ? "success" : "error",
                        data.message
                    );
                    data.deleted && functionItem.remove();
                }
                break;
            default:
                console.log("Default button function clicked!", functionKind);
                break;
        }
    });
}
