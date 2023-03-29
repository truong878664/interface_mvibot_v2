import { dataGpio } from "./gpio/gpio.js";
export const name_gpio = $(".name_gpio");
export const time_out_gpio = $(".time_out_gpio");

export const name_gpio_function_module = $(".name_function_gpio_module");
export const time_out_gpio_module = $(".time_out_gpio_module");
export const name_gpio_module = $(".name_gpio_module");

export const x1_footprint = $('[name="x1_footprint"]');
export const x2_footprint = $('[name="x2_footprint"]');
export const y1_footprint = $('[name="y1_footprint"]');
export const y2_footprint = $('[name="y2_footprint"]');
export const name_footprint = $('[name="name_footprint"]');

export let formElement = $(".marker-item:not(.hidden)");

export let name_marker = formElement.querySelector('[name="name_marker"]');
export let marker_type = formElement.querySelector('[name="marker_type"]');
export let marker_dir = formElement.querySelector('[name="marker_dir"]');
export let off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
export let off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
export let off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
export let off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
export let off_set_dis = formElement.querySelector('[name="off_set_dis"]');
export let off_set_angle = formElement.querySelector('[name="off_set_angle"]');
export let sx1 = formElement.querySelector('[name="sx1"]');
export let sx2 = formElement.querySelector('[name="sx2"]');
export let sy1 = formElement.querySelector('[name="sy1"]');
export let sy2 = formElement.querySelector('[name="sy2"]');

export const name_sleep = $('[name="name_sleep"]');
export const time_sleep = $('[name="time_sleep"]');

export const mode_position_other = $("[name=mode_position_other]");
export const name_position = $('[name="name_position"]');
export const x = $('[name="x"]');
export const y = $('[name="y"]');
export const z = $('[name="z"]');
export const w = $('[name="w"]');
export const time_out_position = $('[name="time_out"]');
export const color_position = $('[name="color_position"]');
export const mode_position = $('[name="mode_position"]');
export const mode_child = $('[name="mode_child"]');
export const map = $(".name-map-active");

let mode_position_value;

export default function getDataFunction(typeFunction) {
    let isValid, data;
    switch (typeFunction) {
        case "gpio":
            isValid =
                name_gpio.value &&
                time_out_gpio.value &&
                (dataGpio.out_set.length ||
                    dataGpio.out_reset.length ||
                    dataGpio.in_on.length ||
                    dataGpio.in_off.length ||
                    dataGpio.in_pullup.length ||
                    dataGpio.in_pulldown.length);
            data = {
                type: "gpio",
                name_type: name_gpio.value,
                time_out: time_out_gpio.value * 1,
                out_set: dataGpio.out_set.join(","),
                out_reset: dataGpio.out_reset.join(","),
                in_on: dataGpio.in_on.join(","),
                in_off: dataGpio.in_off.join(","),
                in_pullup: dataGpio.in_pullup.join(","),
                in_pulldown: dataGpio.in_pulldown.join(","),
            };
            break;
        case "gpio_module":
            isValid =
                name_gpio_function_module.value &&
                time_out_gpio_module.value &&
                name_gpio_module.value &&
                (dataGpio.out_set.length ||
                    dataGpio.out_reset.length ||
                    dataGpio.in_on.length ||
                    dataGpio.in_off.length ||
                    dataGpio.in_pullup.length ||
                    dataGpio.in_pulldown.length);
            data = {
                type: "gpio_module",
                name_type: name_gpio_function_module.value,
                name_gpio_module: name_gpio_module.value,
                time_out: time_out_gpio_module.value * 1,
                out_set: dataGpio.out_set.join(","),
                out_reset: dataGpio.out_reset.join(","),
                in_on: dataGpio.in_on.join(","),
                in_off: dataGpio.in_off.join(","),
                in_pullup: dataGpio.in_pullup.join(","),
                in_pulldown: dataGpio.in_pulldown.join(","),
            };
            break;
        case "footprint":
            isValid =
                x1_footprint.value &&
                x2_footprint.value &&
                y1_footprint.value &&
                y2_footprint.value &&
                name_footprint.value;
            data = {
                x1: Number(x1_footprint.value),
                x2: Number(x2_footprint.value),
                y1: Number(y1_footprint.value),
                y2: Number(y2_footprint.value),
                name_type: name_footprint.value,
            };
            break;
        case "marker":
            formElement = $(".marker-item:not(.hidden)");
            name_marker = formElement.querySelector('[name="name_marker"]');
            marker_type = formElement.querySelector('[name="marker_type"]');
            marker_dir = formElement.querySelector('[name="marker_dir"]');
            off_set_x1 = formElement.querySelector('[name="off_set_x1"]');
            off_set_x2 = formElement.querySelector('[name="off_set_x2"]');
            off_set_y1 = formElement.querySelector('[name="off_set_y1"]');
            off_set_y2 = formElement.querySelector('[name="off_set_y2"]');
            off_set_dis = formElement.querySelector('[name="off_set_dis"]');
            off_set_angle = formElement.querySelector('[name="off_set_angle"]');
            sx1 = formElement.querySelector('[name="sx1"]');
            sx2 = formElement.querySelector('[name="sx2"]');
            sy1 = formElement.querySelector('[name="sy1"]');
            sy2 = formElement.querySelector('[name="sy2"]');

            isValid =
                name_marker.value &&
                (off_set_x1 ? off_set_x1.value : true) &&
                (off_set_x2 ? off_set_x2.value : true) &&
                (off_set_y1 ? off_set_y1.value : true) &&
                (off_set_y2 ? off_set_y2.value : true) &&
                (off_set_dis ? off_set_dis.value : true) &&
                (off_set_angle ? off_set_angle.value : true);

            data = {
                type: "marker",
                name_type: name_marker?.value,
                marker_type: marker_type.value,
                marker_dir: marker_dir?.value,
                off_set_x1: off_set_x1?.value,
                off_set_x2: off_set_x2?.value,
                off_set_y1: off_set_y1?.value,
                off_set_y2: off_set_y2?.value,
                off_set_dis: off_set_dis?.value,
                off_set_angle: off_set_angle?.value,
                sx1: sx1?.value,
                sx2: sx2?.value,
                sy1: sy1?.value,
                sy2: sy2?.value,
            };
            break;
        case "sleep":
            isValid = name_sleep.value && time_sleep.value;

            data = {
                type: "sleep",
                time_sleep: time_sleep.value,
                name_type: name_sleep.value,
            };
            break;
        case "position":

            $('[name="mode_position"]').onchange = (e) => {
                const valueMode = e.target.value;
                const isOther = valueMode === "other";
                mode_position_other.dataset.modePosition = isOther
                    ? "other"
                    : "";
            };

            if (mode_position.value === "other") {
                mode_position_value = mode_position_other.value;
            } else {
                mode_position_value = mode_position.value;
            }

            isValid =
                name_position.value &&
                x.value &&
                y.value &&
                z.value &&
                w.value &&
                time_out_position.value &&
                color_position.value &&
                mode_position_value &&
                mode_child.value;
            data = {
                name: name_position.value,
                x: x.value,
                y: y.value,
                z: z.value,
                w: w.value,
                time_out: time_out_position.value,
                color_position: color_position.value,
                mode_position: mode_position_value,
                mode_child: mode_child.value,
                map: map.innerText,
                mode: "position",
            };
            break;
        default:
            break;
    }
    return { isValid: !!isValid, data };
}
