import { htmlDataFunction } from "./index.js";
import { $ } from "../../main.js";
import createHtmlDataFunction from "./action/createHtmlDataFunction.js";
import { FunctionStepClass } from "../index.js";

const renderFunction = async () => {
    const data = await FunctionStepClass.get();
    for (const key in data) {
        createHtmlDataFunction(data[key], key);
    }

    for (const key in htmlDataFunction) {
        if ($(`[data-list-function='${key}'`)) {
            $(`[data-list-function='${key}'`).innerHTML =
                htmlDataFunction[key].join("");
        }
    }
};

export default renderFunction;
