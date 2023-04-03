import activeModule, { saveData } from "./activeModule.js";
import showLight from "./showLight.js";

export default function stop() {
    const option = { type: "stop" };
    activeModule(option);
    saveData(option);
    showLight({ ...option, isModule: false, isReset: false });
}
