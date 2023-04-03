import activeModule, { saveData } from "./activeModule.js";
import showLight from "./showLight.js";

export default function wakeUp() {
    const option = { type: "wake_up" };
    activeModule(option);
    saveData(option);
    showLight({ ...option, isModule: false, isReset: false });
}
