import Step from "./Step.js";

export default class Marker extends Step {
    constructor(data) {
        super(data);
        this.type = "marker";
        const formElement = document.querySelector(".marker-item:not(.hidden)");
        this.data.name = formElement.querySelector('[name="name_marker"]');
        this.data.marker_type = formElement.querySelector('[name="marker_type"]');
        this.data.marker_dir = formElement.querySelector('[name="marker_dir"]');
        this.data.off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
        this.data.off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
        this.data.off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
        this.data.off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
        this.data.off_set_dis = formElement.querySelector('[name="off_set_dis"]');
        this.data.off_set_angle = formElement.querySelector('[name="off_set_angle"]');
        this.data.sx1 = formElement.querySelector('[name="sx1"]');
        this.data.sx2 = formElement.querySelector('[name="sx2"]');
        this.data.sy1 = formElement.querySelector('[name="sy1"]');
        this.data.sy2 = formElement.querySelector('[name="sy2"]');
    }
}