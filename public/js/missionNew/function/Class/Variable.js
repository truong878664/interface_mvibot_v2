import { toggerMessage } from "../../../main.js";
import Step from "./Step.js";

export default class Variable extends Step {
    constructor(data) {
        super(data);
        this.type = "variable";
        this.data.name = document.querySelector(
            "[name='name_function_variable']"
        );
        this.data.name_variable = document.querySelector(
            "[name='name_variable']"
        );
        this.data.command_action = document.querySelector(
            "[name='command_action']"
        );
        this.data.focus_value = document.querySelector("[name='focus_value']");
    }
    reset() {
        this.data.name.value = "";
        this.data.name_variable.value = "";
        this.data.command_action.value = "new";
        this.data.command_action.dataset.value = "new";
        this.data.focus_value.value = "";
    }
    validate(data) {
        const dataValidated = {
            success: true,
            data,
            message: "Get data success",
            error: null,
        };
        const { name, name_variable, focus_value, command_action } = data;

        const conditionValidateDeleteReset =
            name && (command_action === "delete" || command_action === "reset");
        const conditionValidateOther =
            !name ||
            !name_variable ||
            (command_action !== "new" && !focus_value);
        if (conditionValidateDeleteReset) return dataValidated;
        if (conditionValidateOther) {
            dataValidated.success = false;
            dataValidated.message = `Name, name variable, focus value cannot be empty!`;
            return dataValidated;
        }
        return dataValidated;
    }
    display(data) {
        try {
            for (const key in this.data) {
                this.data[key].value = data[key];
            }
            this.data.command_action.dataset.value = data.command_action;
        } catch (error) {
            toggerMessage("error", "ERR!," + error);
        }
    }
}
