import { htmlDataFunction } from "./index.js";
import { $ } from "../../main.js";
import createHtmlDataFunction from "./action/createHtmlDataFunction.js";

const renderFunction = async () => {
    const res = await fetch(`/api/function`);
    const data = await res.json();
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
