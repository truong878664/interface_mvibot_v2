import { htmlDataFunction } from "./index.js";
import { $ } from "../../main.js";
import createHtmlDataFunction from "./action/createHtmlDataFunction.js";
import { FunctionStepClass } from "../FunctionStepClass.js";

const renderFunction = () => {
    const data = FunctionStepClass.data;
    for (const key in data) {
        createHtmlDataFunction(data[key], key);
    }

    for (const key in htmlDataFunction) {
        const dataListFunction = document.querySelector(
            `[data-list-function='${key}'`,
        );
        if (dataListFunction) {
            dataListFunction.innerHTML = htmlDataFunction[key].join("");
        }
    }
};

export default renderFunction;
