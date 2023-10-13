import Step from "./Step.js";

export default class Sleep extends Step {
    constructor(data) {
        super(data);
        this.type = "sleep";
        const form = document.getElementById("function-item-form-wrapper");
        this.data.name = form?.querySelector('[name="name_sleep"]');
        this.data.time_sleep = form?.querySelector('[name="time_sleep"]');
    }
}
