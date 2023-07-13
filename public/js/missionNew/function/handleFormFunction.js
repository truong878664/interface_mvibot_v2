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

                    functionClass.addItem(DOMElement);
                } else {
                    toggerMessage("error", "had error");
                }
            },
            update() {
                const id = functionClass.currentIdUpdate;
                const dataGet = functionClass.get();
                console.log(dataGet);
                const dataUpdate = { id, ...dataGet, type: functionClass.type };
                (async () => {
                    const stepUpdated = await functionClass.update(dataUpdate);
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
