import createHtmlFunctionItem from "../../component/Function/Function.js";
import { htmlDataFunction } from "../index.js";

export default function createHtmlDataFunction(data, type) {
    if (htmlDataFunction[type]) {
        htmlDataFunction[type].length = 0;
    }

    data.map((item, index) => {
        htmlDataFunction[type].push(createHtmlFunctionItem.create(item));
    });
}
