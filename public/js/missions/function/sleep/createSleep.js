import { toggerMessage } from "../../../main.js";
import getDataFunction from "../getDataFunction.js";
import saveFunctionItem from "../saveFunction.js";

export default function createSleep() {
    $(".submit-btn-sleep").onclick = (e) => {
        e.preventDefault();
        const { isValid, data } = getDataFunction("sleep");
        if (isValid) {
            saveFunctionItem("sleep", data);
            toggerMessage("success", `save sleep successfully`);
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
}
