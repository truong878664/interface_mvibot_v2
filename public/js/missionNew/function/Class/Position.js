import render3DMap from "../position/handle/render.js";
import Step from "./Step.js";

export default class Position extends Step {
    constructor(data) {
        super(data);
        this.type = "position";
        const form = document.querySelector("#function-item-form-wrapper [data-type='position']");
        this.data.mode_position = form.querySelector("[name=mode_position_other]");
        this.data.name = form.querySelector('[name="name_position"]');
        this.data.x = form.querySelector('[name="x"]');
        this.data.y = form.querySelector('[name="y"]');
        this.data.z = form.querySelector('[name="z"]');
        this.data.w = form.querySelector('[name="w"]');
        this.data.time_out = form.querySelector('[name="time_out"]');
        this.data.color_position = form.querySelector('[name="color_position"]');
        this.data.mode_position = form.querySelector('[name="mode_position"]');
        this.data.mode_child = form.querySelector('[name="mode_child"]');
        this.data.map = form.querySelector("#map-active-input");
    }

    get() {
        try {
            const data = {}
            for (const key in this.data) {
                data[key] = this.data[key].value
            }
            const dataValidated = this.validate(data);
            dataValidated.success && this.reset();
            return dataValidated;    
        } catch (error) {
            console.log(error);
            return data = {}
        }
    }
    reset() {
        this.data.name.value = "";
        this.data.time_out.value = "-1";
        this.data.color_position.value = "#EA047E";
        this.data.mode_position.value = "normal";
        this.data.mode_child.value = -1;

        document.querySelector("#create-point-checkbox").checked = false;
        const queryReset = [
            ".number-position-x",
            ".number-position-y",
            ".number-rotate-z",
            "#position-x",
            "#position-y",
            "#rotate-z",
            "#inx",
            "#iny",
            "#position-x",
            "#position-y",
        ];
        queryReset.forEach(element => {
            document.querySelector(element).value = 0
        });
    }
    display(data) {
        const {x ,y ,z ,w ,name ,mode_child ,mode_position ,time_out ,color_position,} = data;
        render3DMap(x, y, z, w, color_position);
        this.data.name.value = name;
        this.data.color_position.value = color_position;
        this.data.mode_child.value = mode_child;
        this.data.mode_position.value = mode_position;
        this.data.time_out.value = time_out;
    }
}
