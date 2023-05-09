import createPose from "../../rosModule/createPose.js";
import displayPoint from "../../rosModule/displayPoint.js";
import displayPose from "../../rosModule/displayPose.js";
import mathYaw from "../../rosModule/mathYaw.js";
import qToYaw from "../../rosModule/qToYawn.js";
import {
    command_action,
    focus_value,
    marker_dir,
    marker_type,
    name_footprint,
    name_gpio,
    name_gpio_function_module,
    name_gpio_module,
    name_marker,
    name_sleep,
    name_sound,
    name_var,
    name_variable,
    off_set_angle,
    off_set_dis,
    off_set_x1,
    off_set_x2,
    off_set_y1,
    off_set_y2,
    setTabMarkerActive,
    sx1,
    sx2,
    sy1,
    sy2,
    time_out_gpio,
    time_out_gpio_module,
    time_sleep,
    x1_footprint,
    x2_footprint,
    y1_footprint,
    y2_footprint,
} from "./getDataFunction.js";

import { dataGpio } from "./gpio/gpio.js";
import { setLightGpio } from "./gpio/setLightGpio.js";
import createMapPosition from "./position/createPosition.js";

export let currentIdUpdate;
export let oldName;
export default function showDataFunction(typeFunction, valueFunction) {
    currentIdUpdate = valueFunction.id;
    oldName = valueFunction.name;
    switch (typeFunction) {
        case "footprint":
            $(".footprint-function-btn").click();

            x1_footprint.value = valueFunction.x1;
            x2_footprint.value = valueFunction.x2;
            y1_footprint.value = valueFunction.y1;
            y2_footprint.value = valueFunction.y2;
            name_footprint.value = valueFunction.name;

            break;
        case "gpio":
            $(".gpio-function-btn").click();

            name_gpio.value = valueFunction.name;
            time_out_gpio.value = valueFunction.time_out;

            for (const item in dataGpio) {
                dataGpio[item] = valueFunction[item]?.split(",") || [];
            }

            setLightGpio();

            break;
        case "gpio_module":
            $(".gpio-module-function-btn").click();

            name_gpio_function_module.value = valueFunction.name;
            name_gpio_module.value = valueFunction.name_gpio_module;
            time_out_gpio_module.value = valueFunction.time_out;

            for (const item in dataGpio) {
                dataGpio[item] = valueFunction[item]?.split(",") || [];
            }

            setLightGpio();

            break;
        case "marker":
            $(".marker-function-btn").click();
            $(`.${valueFunction.marker_type}-btn`).click();
            setTabMarkerActive();

            name_marker ? (name_marker.value = valueFunction.name) : "";
            marker_type ? (marker_type.value = valueFunction.marker_type) : "";
            marker_dir ? (marker_dir.value = valueFunction.marker_dir) : "";
            off_set_x1 ? (off_set_x1.value = valueFunction.off_set_x1) : "";
            off_set_x2 ? (off_set_x2.value = valueFunction.off_set_x2) : "";
            off_set_y1 ? (off_set_y1.value = valueFunction.off_set_y1) : "";
            off_set_y2 ? (off_set_y2.value = valueFunction.off_set_y2) : "";
            off_set_dis ? (off_set_dis.value = valueFunction.off_set_dis) : "";
            off_set_angle
                ? (off_set_angle.value = valueFunction.off_set_angle)
                : "";
            sx1 ? (sx1.value = valueFunction.sx1) : "";
            sx2 ? (sx2.value = valueFunction.sx2) : "";
            sy1 ? (sy1.value = valueFunction.sy1) : "";
            sy2 ? (sy2.value = valueFunction.sy2) : "";

            break;
        case "sleep":
            $(".sleep-function-btn").click();

            name_sleep.value = valueFunction.name;
            time_sleep.value = valueFunction.time_sleep;

            break;

        case "variable":
            $(".variable-function-btn").click();

            name_variable.value = valueFunction.name;
            name_var.value = valueFunction.name_variable;
            command_action.value =
                valueFunction.command_action == "equal" ? "=" : "==";

            focus_value.value = valueFunction.focus_value;
            if (!isNaN(Number(valueFunction.focus_value))) {
                focus_value.removeAttribute("readonly");
            }

            break;

        case "sound":
            $(".sound-function-btn").click();
            $(".sound-item.active")?.classList.remove("active");

            name_sound.value = valueFunction.name;

            $(
                `[data-number-sound='${valueFunction.music_mode}']`
            ).classList.add("active");

            break;

        case "position":
            $(".point-function-btn").click();
            $(".create-point-btn").textContent = "Update";
            const {
                x,
                y,
                z,
                w,
                name,
                time_out,
                mode_position,
                color_position,
                mode_child,
            } = valueFunction;

            const { viewer, tfClient } = createMapPosition(x, y, z, w);

            createPose(viewer, tfClient, color_position);

            const yaw = qToYaw(z, w);
            const q = mathYaw((Number(yaw) / 180) * Math.PI);

            displayPoint(x, y);
            displayPose(x, y, q.z, q.w);

            showControlPosition(x, y, z, w);
            showInfoPosition(
                name,
                time_out,
                mode_position,
                color_position,
                mode_child
            );

            function showControlPosition(x, y, z, w) {
                const yaw = qToYaw(z, w);
                $("#inx").value = x;
                $("#position-x").value = x;
                $("#iny").value = y;
                $("#position-y").value = y;
                $(".number-rotate-z").value = yaw;
                $("#rotate-z").value = yaw;
            }

            function showInfoPosition(
                name,
                time_out,
                mode_position,
                color_position,
                mode_child
            ) {
                $("[name=name_position]").value = name;
                $("[name=color_position]").value = color_position;

                if (
                    mode_position === "normal" ||
                    mode_position === "line_follow"
                ) {
                    $("[name=mode_position]").value = mode_position;
                } else {
                    $("[name=mode_position]").value = "other";
                    $("[name=mode_position_other]").dataset.modePosition =
                        "other";
                    $("[name=mode_position_other]").value = mode_position;
                    console.log($("[name=mode_position]").value);
                }
                $("[name=time_out]").value = time_out;
                $("[name=mode_child]").value = mode_child;
            }
            break;
    }
}
