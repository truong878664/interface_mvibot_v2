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
        this.data.command_action = document.querySelector("[name='command_action']");
        this.data.focus_value = document.querySelector("[name='focus_value']");
    }
    reset() {
        this.data.name.value = "";
        this.data.name_variable.value = "";
        this.data.command_action.value = "new";
        this.data.command_action.dataset.value = "new";
        this.data.focus_value.value = "";
    }
}
