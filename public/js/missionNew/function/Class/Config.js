import Step from "./Step.js";

export default class Config extends Step {
    constructor(data) {
        super(data);
        this.type = "config";
        const getNode = document.querySelector.bind(document);
        const form = getNode("#function-item-form-wrapper");
        this.data.name = getNode.call(form, '[name="name_config"]');
        const configList = [
            "footprint_padding",
            "max_vel_x",
            "min_vel_x",
            "acc_lim_x",
            "max_vel_theta",
            "acc_lim_theta",
            "inflation_radius",
        ];
        configList.forEach((config) => {
            this.data[config] = getNode.call(form, `[name="${config}"]`);
        });
    }

    get() {
        const data = {};
        for (const key in this.data) {
            const value = this.data[key]?.value || "none";
            data[key] = value;
        }
        const dataValidated = this.validate(data);
        dataValidated.success && this.reset();
        return dataValidated;
    }

    reset() {
        const { name, ...rest } = this.data;
        name.value = "";
        for (const key in rest) {
            this.data[key].value = "";
        }
    }
}
