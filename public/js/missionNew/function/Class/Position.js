import Step from "./Step.js";

export default class Position extends Step {
    constructor(data) {
        super(data);
        this.type = "position";
        this.data.mode_position = document.querySelector(
            "[name=mode_position_other]"
        );
        this.data.name = document.querySelector('[name="name_position"]');
        this.data.x = document.querySelector('[name="x"]');
        this.data.y = document.querySelector('[name="y"]');
        this.data.z = document.querySelector('[name="z"]');
        this.data.w = document.querySelector('[name="w"]');
        this.data.time_out = document.querySelector('[name="time_out"]');
        this.data.color_position = document.querySelector(
            '[name="color_position"]'
        );
        this.data.mode_position = document.querySelector(
            '[name="mode_position"]'
        );
        this.data.mode_child = document.querySelector('[name="mode_child"]');
        this.data.map = document.querySelector("#map-active-input");
    }

    get() {
        const name = this.data.name.value;
        const x = this.data.x.value;
        const y = this.data.y.value;
        const z = this.data.z.value;
        const w = this.data.w.value;
        const time_out = this.data.time_out.value;
        const color_position = this.data.color_position.value;
        const mode_position = this.data.mode_position.value;
        const mode_child = this.data.mode_child.value;
        const map = this.data.map.value;
        const data = {
            name,
            x,
            y,
            z,
            w,
            time_out,
            map,
            color_position,
            mode_position,
            mode_child,
        };
        this.reset();
        return data;
    }
    reset() {
        this.data.name.value = "";
        this.data.time_out.value = -1;
        this.data.color_position.value = "#EA047E";
        this.data.mode_position.value = "normal";
        this.data.mode_child.value = -1;

        document.querySelector(".number-position-x").value = 0;
        document.querySelector(".number-position-y").value = 0;
        document.querySelector(".number-rotate-z").value = 0;
        document.querySelector("#position-x").value = 0;
        document.querySelector("#position-y").value = 0;
        document.querySelector("#rotate-z").value = 0;
        document.querySelector("#create-point-checkbox").checked = false;
        document.querySelector("#inx").value = 0;
        document.querySelector("#iny").value = 0;
        document.querySelector("#position-x").value = 0;
        document.querySelector("#position-y").value = 0;
    }
}
