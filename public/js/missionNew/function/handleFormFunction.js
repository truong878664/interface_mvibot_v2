import handleShowFormFunction from "./handle/showFromFunction.js";
import footprint from "./footprint/index.js";
import gpio from "./gpio/index.js";
import gpioModule from "./gpioModule/index.js";
import marker from "./marker/index.js";
import { toggerMessage } from "../../main.js";
import createHtmlFunctionItem from "../component/Function/Function.js";
import showFormFunction from "./action/showFormFunction.js";
import position from "./position/index.js";
import sound from "./sound/index.js";
import variable from "./variable/index.js";
import { classFunctions } from "./index.js";
import { FunctionStepClass, MissionClass } from "../index.js";

export default function handleFormFunction() {
    handleShowFormFunction();
    footprint();
    gpio();
    gpioModule();
    marker();
    sound();
    position();
    variable();
    handleActionFunction();
}

function handleActionFunction() {
    const formFunctionItemWrapper = document.getElementById(
        "function-item-form-wrapper"
    );

    formFunctionItemWrapper.addEventListener("click", async (e) => {
        const buttonAction = e.target.closest("[data-button-function-kind");
        if (!buttonAction) return;
        const functionItem = e.target.closest(".function-item");
        const functionKind = buttonAction?.dataset.buttonFunctionKind;
        const functionId = functionItem?.dataset.id;
        const functionType = buttonAction.dataset.type;
        const functionClass = classFunctions[functionType];
        const actions = {
            async create() {
                const res = await functionClass.save();
                const stepSaved = await res.stepSaved;
                if (res.message.saved) {
                    toggerMessage(res.message.status, res.message.message);
                    showFormFunction({ type: functionType, show: false });
                    const DOMElement = createHtmlFunctionItem.createDOMElement({
                        mode: functionType,
                        ...stepSaved,
                        status: "new",
                    });
                    FunctionStepClass.pushFunctionStepToData({
                        type: functionType,
                        data: stepSaved,
                    });
                    functionClass.addItem(DOMElement);
                } else {
                    toggerMessage("error", res.message);
                }
            },
            update() {
                const id = functionClass.currentIdUpdate;
                const { data: dataGet } = functionClass.get();
                const dataUpdate = { id, ...dataGet, type: functionClass.type };
                (async () => {
                    const stepUpdated = await functionClass.update(dataUpdate);
                    FunctionStepClass.updateItem({
                        type: functionClass.type,
                        data: JSON.parse(JSON.stringify(stepUpdated)),
                    });
                    showFormFunction({
                        type: functionType,
                        show: false,
                    });
                    const DOMElement = createHtmlFunctionItem.createDOMElement({
                        mode: functionType,
                        ...stepUpdated,
                        status: "update",
                    });
                    const wrapperFunction = document.querySelector(
                        `[data-list-function='${functionType}']`
                    );
                    const elementUpdating = wrapperFunction.querySelector(
                        `[data-id='${id}']`
                    );
                    wrapperFunction.replaceChild(DOMElement, elementUpdating);
                    MissionClass.render();
                    functionClass.reset();
                })();
            },
            cancel() {
                showFormFunction({
                    type: functionType,
                    show: false,
                });
                functionClass.reset();
            },
        };

        actions[functionKind]?.();
    });
}
