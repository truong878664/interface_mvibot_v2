import { toggerMessage } from "../../../main.js";
import getDataFunction, { marker_type } from "../getDataFunction.js";
import saveFunctionItem from "../saveFunction.js";
import resetMarker from "./resetMarker.js";

export default function createMarker() {
    $(".submit-btn-marker").onclick = (e) => {
        const { isValid, data } = getDataFunction("marker");
        if (isValid) {
            saveFunctionItem("marker", data);
            toggerMessage("success", `save ${marker_type.value} successfully`);
            resetMarker()
        } else {
            toggerMessage("error", "Please enter all inputs");
        }
    };
}
