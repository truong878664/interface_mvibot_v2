import { toggerMessage } from "../../../main.js";
import getDataFunction from "../getDataFunction.js";
import saveFunctionItem from "../saveFunction.js";
import resetFootprint from "./resetFootprint.js";

export default function createFootprint() {
    $(".submit-btn-footprint").onclick = (e) => {
        e.preventDefault();
        const { isValid, data } = getDataFunction("footprint");
        if (isValid) {
            saveFunctionItem("footprint", data);
            toggerMessage("success", "save footprint successfully");
            resetFootprint();
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
}
