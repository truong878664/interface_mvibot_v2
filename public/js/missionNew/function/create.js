import handleShowFormFunction from "./handle/showFromFunction.js";
import footprint from "./footprint/index.js";
import gpio from "./gpio/index.js";
import gpioModule from "./gpioModule/index.js";
import marker from "./marker/index.js";
import Footprint from "./Class/Footprint.js";
import { toggerMessage } from "../../main.js";
import createHtmlFunctionItem from "../component/Function/Function.js";
import showFormFunction from "./action/showFormFunction.js";
import Gpio from "./Class/Gpio.js";
import GpioModule from "./Class/GpioModule.js";
import Marker from "./Class/Marker.js";
import Sleep from "./Class/Sleep.js";
import sound from "./sound/index.js";
import Sound from "./Class/Sound.js";
import position from "./position/index.js";
import Position from "./Class/Position.js";
import Variable from "./Class/Variable.js";
import variable from "./variable/index.js";

export default function create() {
    handleShowFormFunction();
    footprint();
    gpio();
    gpioModule();
    marker();
    sound();
    position();
    variable()
    handleCreateFunction();
}

function handleCreateFunction() {
    const formFunctionItemWrapper = document.getElementById(
        "function-item-form-wrapper"
    );

    const classFunctions = {
        footprint: Footprint,
        gpio: Gpio,
        gpio_module: GpioModule,
        marker: Marker,
        sleep: Sleep,
        sound: Sound,
        position: Position,
        variable: Variable,
    };

    formFunctionItemWrapper.addEventListener("click", async (e) => {
        const createBtn = e.target.closest(".create-step-btn");
        if (!createBtn) return;
        const typeFunction = createBtn.dataset.typeMission;
        const FunctionClass = classFunctions[typeFunction];
        const functionClass = new FunctionClass();
        const res = await functionClass.save();
        const stepSaved = await res.stepSaved;
        if (res.message.saved) {
            toggerMessage(res.message.status, res.message.message);
            showFormFunction({ type: typeFunction, show: false });
            const DOMElement = createHtmlFunctionItem.createDOMElement({
                mode: typeFunction,
                ...stepSaved,
            });
            functionClass.addItem(DOMElement);
        } else {
            toggerMessage('error', 'had error')
        }
    });
}
