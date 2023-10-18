import Step from "./Step.js";

export default class Marker extends Step {
    constructor(data) {
        super(data);
        this.type = "marker";
    }

    get() {
        this.updateElementMarker();
        const data = {};

        for (const key in this.data) {
            const typeData = this.data[key]?.dataset.type || "string";
            const value = this.data[key]?.value || null;
            data[key] =
                typeData === "number"
                    ? isNaN(Number(value))
                        ? 0
                        : Number(value)
                    : value;
        }
        const dataValidated = this.validate(data);
        dataValidated.success && this.reset();
        return dataValidated;
    }

    validate(data) {
        const dataValidated = {
            success: true,
            data,
            message: "Get data success",
            error: null,
        };
        const { name, time_out, off_set_angle, off_set_dis } = data;

        data.off_set_angle =
            off_set_angle === null
                ? null
                : isNaN(Number(off_set_angle))
                ? 0
                : off_set_angle;

        dataValidated.data.name = name?.replaceAll("?", "").replaceAll("!", "");

        if (isNaN(Number(time_out))) {
            dataValidated.success = false;
            dataValidated.message = `Time out have to number!`;
            return dataValidated;
        }
        if (!name || !time_out) {
            dataValidated.success = false;
            dataValidated.message = `Name or time out cannot be empty!`;
            return dataValidated;
        }
        return dataValidated;
    }

    display(data) {
        const { marker_type, mode, id, status, ...filed } = data;
        document.querySelector(`.marker-btn.${marker_type}-btn`).click();
        this.updateElementMarker(marker_type);
        for (const key in filed) {
            if (filed[key]) {
                this.data[key].value = filed[key] || 0;
            }
        }
    }

    updateElementMarker(type = "") {
        let formElement;
        if (type) {
            formElement = document.querySelector(
                `.marker-item[data-type-marker='${type}']`
            );
        } else {
            formElement = document.querySelector(`.marker-item:not(.hidden)`);
        }
        this.data.name = formElement.querySelector('[name="name_marker"]');
        this.data.marker_type = formElement.querySelector(
            '[name="marker_type"]'
        );
        this.data.marker_dir = formElement.querySelector('[name="marker_dir"]');
        this.data.off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
        this.data.off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
        this.data.off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
        this.data.off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
        this.data.off_set_dis = formElement.querySelector(
            '[name="off_set_dis"]'
        );
        this.data.off_set_angle = formElement.querySelector(
            '[name="off_set_angle"]'
        );
        this.data.time_out = formElement.querySelector('[name="time_out"]');
        this.data.sx1 = formElement.querySelector('[name="sx1"]');
        this.data.sx2 = formElement.querySelector('[name="sx2"]');
        this.data.sy1 = formElement.querySelector('[name="sy1"]');
        this.data.sy2 = formElement.querySelector('[name="sy2"]');
    }
    reset() {
        this.updateElementMarker();
        const { marker_type, time_out, sx1, sx2, sy1, sy2, ...filed } =
            this.data;
        sx1.value = 0.01;
        sx2.value = 0.01;
        sy1.value = 0.01;
        sy2.value = 0.01;
        time_out.value = -1;

        for (const key in filed) {
            if (this.data[key]) {
                this.data[key].value = key === "marker_dir" ? "front_ward" : "";
            }
        }
    }
}
