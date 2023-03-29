import { toggerMessage } from "../../../main.js";
import saveFunctionItem from "../saveFunction.js";
import resetVariable from "./resetVariable.js";

export default function createVariable() {
    $(".submit-btn-variable").onclick = () => {
        const name = $(".name_function_variable").value;
        const name_variable = $(".name_variable_input").value;
        const command_action =
            $(".command_action_input").value == "=" ? "equal" : "equal_as";
        const focus_value = $(".focus_value_input").value;

        if (name_variable && focus_value && name) {
            const dataVariable = {
                name,
                time_out: -1,
                mode: "variable",
                command_action,
                name_variable,
                focus_value,
            };

            saveFunctionItem("variable", dataVariable);
            handleSaveSuccessVariable();
            function handleSaveSuccessVariable() {
                toggerMessage("success", "Save sound successfully!");
                resetVariable();
            }
        } else {
            toggerMessage("error", "Please enter all input");
        }
    };
}
