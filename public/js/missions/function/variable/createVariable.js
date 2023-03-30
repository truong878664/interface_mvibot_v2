import { toggerMessage } from "../../../main.js";
import getDataFunction from "../getDataFunction.js";
import saveFunctionItem from "../saveFunction.js";
import resetVariable from "./resetVariable.js";

export default function createVariable() {
    $(".submit-btn-variable").onclick = () => {
        const { isValid, data } = getDataFunction("variable");

        if (isValid) {
            saveFunctionItem("variable", data);
            toggerMessage("success", "Save sound successfully!");
            resetVariable();
        } else {
            toggerMessage("error", "Please enter all input");
        }
    };
}
