import createNameVariable, { updateVar } from "./createNameVariable.js";
import createVariable from "./createVariable.js";

export default function variable() {
    updateVar()
    createNameVariable();
    createVariable();

    const typeVar = ["name_variable", "command_action", "focus_value"];
    typeVar.forEach((item) => {
        $(`.${item}_btn`).onclick = () => {
            $(`.item-var-ul:not(.hidden):not(.${item}_ul)`)?.classList.add(
                "hidden"
            );
            $(`.${item}_ul`).classList.toggle("hidden");
        };
    });
}
