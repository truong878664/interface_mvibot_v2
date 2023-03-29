import { toggerMessage } from "../../../main.js";
import getDataFunction from "../getDataFunction.js";
import saveFunctionItem from "../saveFunction.js";
import resetSound from "./resetSound.js";
import setColorSticker from "./setColorSticker.js";

export default function createSound() {
    $(".submit-btn-sound").onclick = () => {
        const { isValid, data } = getDataFunction("sound");
        if (isValid) {
            saveFunctionItem("sound", data);
            resetSound();
            toggerMessage("success", "Save sound successfully!");
        } else {
            toggerMessage("error", "Please enter all input");
        }
    };
}
