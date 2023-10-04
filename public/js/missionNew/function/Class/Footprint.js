import Step from "./Step.js";
export default class Footprint extends Step {
    constructor(data) {
        super(data);
        this.type = "footprint";
        const form = document.getElementById("function-item-form-wrapper");
        this.data.x1 = form.querySelector('[name="x1_footprint"]');
        this.data.x2 = form.querySelector('[name="x2_footprint"]');
        this.data.y1 = form.querySelector('[name="y1_footprint"]');
        this.data.y2 = form.querySelector('[name="y2_footprint"]');
        this.data.name = form.querySelector('[name="name_footprint"]');
    }

    default() {
        this.data.x1.value = -0.41;
        this.data.x2.value = 0.41;
        this.data.y1.value = -0.345;
        this.data.y2.value = 0.345;
    }
}
